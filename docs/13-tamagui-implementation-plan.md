# Tamagui Implementation Plan

## Executive Summary

This document outlines the complete implementation plan for integrating **Tamagui** as the UI framework for gift-horse, including:
- Setup and configuration
- Design system token creation (based on `12-design-philosophy.md`)
- Migration strategy for all existing UI components
- Performance optimization guidelines

**Rationale**: Tamagui is selected as the optimal UI framework for implementing a custom design system in a React Native/Expo app, providing compile-time optimization, native-thread animations, and a unified codebase for iOS and Android.

---

## Current State Analysis

### Existing Styling Setup

**Status**: ✅ Clean slate - No conflicts detected

After analyzing the codebase:
- **No existing UI frameworks** (no React Native Paper, NativeBase, etc.)
- **No utility libraries** (no Tailwind, NativeWind, etc.)
- **Current approach**: Plain React Native `StyleSheet` API
- **Animation libraries**: Already installed and ready:
  - `react-native-reanimated` (v4.1.1)
  - `react-native-gesture-handler` (v2.28.0)

**Recommendation**: ✅ **Proceed with Tamagui installation** - No removal of existing libraries required. Tamagui will complement the existing animation stack.

### Screens Requiring Migration

The following screens currently use inline `StyleSheet` and will need migration to Tamagui:

**Authentication Flow (3 screens)**:
- `app/auth/login.tsx` - Login form
- `app/auth/signup.tsx` - Registration form
- `app/onboarding.tsx` - Onboarding carousel

**Main Application (6+ screens)**:
- `app/(tabs)/index.tsx` - Home/Add gift screen
- `app/(tabs)/recipients.tsx` - Recipients list
- `app/(tabs)/unassigned.tsx` - Unassigned ideas
- `app/recipients/new.tsx` - New recipient form
- `app/recipients/[id].tsx` - Recipient detail view
- `app/(tabs)/_layout.tsx` - Tab navigation layout
- `app/_layout.tsx` - Root layout

**Total**: ~10-12 screens requiring migration

---

## Design System Definition

The following design tokens are extracted from `docs/12-design-philosophy.md` and will be implemented as Tamagui tokens.

### 1. Typography System

Based on the type scale defined in the design philosophy:

```typescript
// Typography tokens
const typography = {
  // Font families
  heading: 'System', // SF Pro (iOS) / Roboto (Android)
  body: 'System',
  
  // Font sizes (from design philosophy)
  display: 34,  // Hero moments
  h1: 28,       // Screen titles
  h2: 22,       // Section titles
  h3: 20,       // Card titles
  body: 17,     // Main text
  bodyEmphasis: 17, // Emphasized text (with semibold)
  caption: 15,  // Supporting text
  small: 13,    // Metadata
  button: 17,   // Button labels
  tabBar: 10,   // Navigation labels
  
  // Font weights
  weights: {
    regular: '400',
    semibold: '600',
    bold: '700',
  }
}
```

**Note**: System fonts provide automatic platform optimization and zero loading time.

### 2. Spacing Scale (8pt Grid)

From design philosophy section "Spacing & Layout":

```typescript
const space = {
  xs: 4,    // Tight spacing within components
  sm: 8,    // Related elements
  md: 16,   // Standard spacing (most common)
  lg: 24,   // Section spacing
  xl: 32,   // Major section breaks
  xxl: 48,  // Screen-level spacing
}
```

### 3. Color System

Based on requirements for branded custom design with dark mode support:

```typescript
const colors = {
  // Primary/Accent (brand color)
  primary50: '#E5F2FF',
  primary100: '#B3DBFF',
  primary200: '#80C4FF',
  primary300: '#4DADFF',
  primary400: '#1A96FF',
  primary500: '#007AFF',  // Base (iOS blue as starting point)
  primary600: '#0062CC',
  primary700: '#004999',
  primary800: '#003166',
  primary900: '#001933',
  
  // Neutrals (grays) - 70-80% of UI
  neutral50: '#F9FAFB',
  neutral100: '#F3F4F6',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral800: '#1F2937',
  neutral900: '#111827',
  
  // Semantic colors
  success: '#34C759',  // iOS green
  error: '#FF3B30',    // iOS red
  warning: '#FF9500',  // iOS orange
  info: '#007AFF',     // iOS blue
  
  // Semantic usage (light mode defaults)
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  border: '#E5E7EB',
  borderActive: '#007AFF',
  
  // Dark mode variants (will be configured in theme)
  backgroundDark: '#121212',        // Near-black (not pure black)
  backgroundSecondaryDark: '#1E1E1E',
  backgroundTertiaryDark: '#2A2A2A',
  
  textPrimaryDark: '#F9FAFB',
  textSecondaryDark: '#9CA3AF',
  textTertiaryDark: '#6B7280',
  
  borderDark: '#374151',
  borderActiveDark: '#4DADFF',
}
```

**Color Usage Philosophy** (from design doc):
- Primary: 10-20% of UI
- Neutrals: 70-80% of UI
- Semantic: Only for status/states
- All colors must meet WCAG AA contrast (4.5:1 minimum)

### 4. Radii (Corner Radius)

From design philosophy:

```typescript
const radii = {
  none: 0,
  sm: 8,     // Buttons
  md: 12,    // Cards (lower range)
  lg: 16,    // Cards (upper range)
  full: 9999, // Circular (avatars)
}
```

### 5. Animation Tokens

From design philosophy "Animation & Motion":

```typescript
const animations = {
  // Durations (in milliseconds)
  instant: 150,      // Button press
  fast: 200,         // Toggle, checkbox
  normal: 300,       // State changes (default)
  transition: 350,   // Screen navigation
  max: 500,          // Never exceed
  
  // Spring configurations (for Reanimated)
  springs: {
    gentle: {
      damping: 20,
      stiffness: 90,
    },
    snappy: {
      damping: 15,
      stiffness: 200,
    },
    bouncy: {
      damping: 10,
      stiffness: 150,
    },
  },
}
```

### 6. Shadows/Elevation

From design philosophy:

```typescript
const shadows = {
  low: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  high: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
}
```

### 7. Touch Targets

From design philosophy (will be used for minimum component sizes):

```typescript
const touchTargets = {
  minimum: 44,      // iOS HIG standard
  comfortable: 48,  // Recommended
  generous: 56,     // Primary actions
}
```

---

## Implementation Plan

### Phase 1: Installation & Configuration

**Estimated Time**: 2-3 hours

#### Step 1.1: Install Tamagui Core Packages

```bash
npm install tamagui @tamagui/config @tamagui/core
npm install --save-dev @tamagui/babel-plugin
```

#### Step 1.2: Install Tamagui UI Components

```bash
npm install @tamagui/button @tamagui/text @tamagui/card @tamagui/input @tamagui/stacks
```

#### Step 1.3: Configure Babel

Update `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
        }
      ],
      // ... existing plugins
    ],
  };
};
```

#### Step 1.4: Create Tamagui Configuration File

**File**: `tamagui.config.ts` (create at project root)

This file will contain all the design tokens defined above, structured as Tamagui configuration. See detailed configuration in Appendix A.

#### Step 1.5: Create TamaguiProvider Wrapper

**File**: `providers/TamaguiProvider.tsx` (create new)

```typescript
import { TamaguiProvider as TamaguiProviderBase } from 'tamagui';
import config from '../tamagui.config';

export function TamaguiProvider({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProviderBase config={config} defaultTheme="light">
      {children}
    </TamaguiProviderBase>
  );
}
```

#### Step 1.6: Integrate Provider into App Root

Update `app/_layout.tsx` to wrap the app with `TamaguiProvider`.

**Expected Outcome**: Tamagui fully configured and ready to use throughout the app.

---

### Phase 2: Create Design System Components

**Estimated Time**: 4-6 hours

Create reusable, branded component primitives that match the design philosophy. These components will be used across all screens.

#### Step 2.1: Create Component Library Structure

**Directory Structure**:
```
components/
├── design-system/
│   ├── Button.tsx          // Primary, secondary, destructive variants
│   ├── Card.tsx            // Gift/recipient cards with elevation
│   ├── Input.tsx           // Form inputs with validation states
│   ├── Text.tsx            // Typography variants (h1, h2, body, etc.)
│   ├── Avatar.tsx          // Emoji/initials display
│   ├── EmptyState.tsx      // Empty state pattern
│   ├── ScreenHeader.tsx    // Consistent screen headers
│   ├── TouchableCard.tsx   // Interactive card with haptics
│   └── index.ts            // Barrel export
```

#### Step 2.2: Implement Core Components

Each component should:
- Use Tamagui styled API
- Reference design tokens from config
- Include dark mode support
- Follow touch target minimums (44pt)
- Include haptic feedback where appropriate
- Support accessibility props

**Example**: `components/design-system/Button.tsx`

```typescript
import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from '@tamagui/button';
import * as Haptics from 'expo-haptics';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  
  // Default variant (primary)
  backgroundColor: '$primary500',
  color: '$textPrimaryDark',
  borderRadius: '$sm',
  minHeight: '$touchComfortable', // 48pt
  paddingHorizontal: '$md',
  fontWeight: '$semibold',
  fontSize: '$button',
  
  pressStyle: {
    scale: 0.95,
    opacity: 0.9,
  },
  
  onPress: (e) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary500',
        color: '$textPrimaryDark',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$border',
        color: '$textPrimary',
      },
      destructive: {
        backgroundColor: '$error',
        color: '$textPrimaryDark',
      },
    },
    size: {
      small: {
        minHeight: '$touchMinimum', // 44pt
        paddingHorizontal: '$sm',
        fontSize: '$caption',
      },
      large: {
        minHeight: '$touchGenerous', // 56pt
        paddingHorizontal: '$lg',
        fontSize: '$h3',
      },
    },
    disabled: {
      true: {
        opacity: 0.6,
        pointerEvents: 'none',
      },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
  },
});
```

**Expected Outcome**: Complete set of design system components matching the design philosophy specifications.

---

### Phase 3: Screen Migration

**Estimated Time**: 8-12 hours

Migrate all existing screens from StyleSheet to Tamagui components. Prioritize by user flow.

#### Migration Priority Order

1. **Tier 1 - Authentication Flow** (critical path):
   - `app/onboarding.tsx`
   - `app/auth/signup.tsx`
   - `app/auth/login.tsx`

2. **Tier 2 - Core Screens** (primary user flows):
   - `app/(tabs)/recipients.tsx`
   - `app/recipients/[id].tsx`
   - `app/(tabs)/index.tsx` (Add gift screen)

3. **Tier 3 - Secondary Screens**:
   - `app/recipients/new.tsx`
   - `app/(tabs)/unassigned.tsx`
   - `app/(tabs)/_layout.tsx`

#### Migration Process per Screen

For each screen, follow this process:

1. **Audit Current Styles**: Document all StyleSheet styles used
2. **Map to Design System**: Identify which design system components to use
3. **Replace Components**: Swap React Native components with Tamagui equivalents
4. **Remove StyleSheet**: Delete inline styles
5. **Test Functionality**: Ensure no regressions
6. **Test Dark Mode**: Verify appearance in both themes
7. **Test Accessibility**: Screen reader, dynamic type
8. **Optimize Performance**: Check for unnecessary re-renders

#### Migration Example: Login Screen

**Before** (`app/auth/login.tsx`):
```typescript
// Using StyleSheet with inline styles
<View style={styles.container}>
  <TextInput style={styles.input} />
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Sign In</Text>
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  input: { borderWidth: 1, padding: 16, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 16 },
  buttonText: { color: '#fff', fontSize: 16 },
});
```

**After** (with Tamagui):
```typescript
// Using design system components
import { YStack } from 'tamagui';
import { Button, Input, Text } from '@/components/design-system';

<YStack flex={1} padding="$md">
  <Input placeholder="Email" />
  <Button onPress={handleLogin}>
    <Text variant="button">Sign In</Text>
  </Button>
</YStack>
```

**Benefits**:
- ✅ No inline styles to maintain
- ✅ Automatic dark mode support
- ✅ Type-safe design tokens
- ✅ Compile-time optimization
- ✅ Consistent with design system

#### Migration Tracking

Create a checklist to track migration progress:

```markdown
### Authentication Flow
- [ ] app/auth/login.tsx
- [ ] app/auth/signup.tsx
- [ ] app/onboarding.tsx

### Core Screens
- [ ] app/(tabs)/recipients.tsx
- [ ] app/recipients/[id].tsx
- [ ] app/(tabs)/index.tsx

### Secondary Screens
- [ ] app/recipients/new.tsx
- [ ] app/(tabs)/unassigned.tsx
- [ ] app/(tabs)/_layout.tsx
- [ ] app/_layout.tsx
```

**Expected Outcome**: All screens using Tamagui design system components with zero StyleSheet usage.

---

### Phase 4: Animation Integration

**Estimated Time**: 3-4 hours

Integrate Tamagui with existing Reanimated/Gesture Handler setup for high-performance animations.

#### Step 4.1: Configure Reanimated with Tamagui

Tamagui has built-in support for Reanimated. Enable it:

```typescript
// In tamagui.config.ts
import { config as configBase } from '@tamagui/config';
import { createTamagui } from '@tamagui/core';

const config = createTamagui({
  ...configBase,
  animations: {
    ...configBase.animations,
    // Use Reanimated driver
    driver: 'reanimated',
  },
});
```

#### Step 4.2: Create Animated Components

**File**: `components/design-system/AnimatedCard.tsx`

```typescript
import { Card } from 'tamagui';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export function AnimatedCard({ children, onPress, ...props }) {
  const scale = useSharedValue(1);
  
  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.95, { duration: 150 });
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      onPress?.();
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animatedStyle}>
        <Card {...props}>
          {children}
        </Card>
      </Animated.View>
    </GestureDetector>
  );
}
```

#### Step 4.3: Implement Key Animations

Based on design philosophy animation catalog:

1. **List Item Entry** (staggered fade-in):
   - Duration: 300ms
   - Stagger: 50ms per item (max 20 items)

2. **Card Press Feedback**:
   - Scale to 0.95
   - Duration: 150ms
   - Spring back: damping 15, stiffness 200

3. **Screen Transitions**:
   - Slide from right (stack push)
   - Duration: 350ms
   - Decelerate easing

4. **Status Change**:
   - Background color fade + icon change
   - Duration: 300ms

**Expected Outcome**: Smooth 60fps+ animations throughout the app using Reanimated with Tamagui components.

---

### Phase 5: Testing & Optimization

**Estimated Time**: 4-6 hours

#### Step 5.1: Functional Testing

Test all migrated screens:
- ✅ All interactive elements work
- ✅ Navigation flows correctly
- ✅ Forms submit properly
- ✅ Data loads and displays

#### Step 5.2: Visual Testing

- ✅ Light mode appearance matches design philosophy
- ✅ Dark mode appearance matches design philosophy
- ✅ Touch targets meet 44pt minimum
- ✅ Typography scales match specifications
- ✅ Spacing follows 8pt grid
- ✅ Colors match design tokens
- ✅ Corner radii correct (8-16pt)
- ✅ Shadows/elevation correct (2-8dp)

#### Step 5.3: Accessibility Testing

- ✅ Screen reader navigation (VoiceOver/TalkBack)
- ✅ Dynamic type support (100%, 150%, 200%)
- ✅ Color contrast meets WCAG AA (4.5:1)
- ✅ Reduced motion respected
- ✅ All interactive elements labeled

#### Step 5.4: Performance Testing

- ✅ App bundle size (target: no significant increase)
- ✅ Time to interactive < 2 seconds
- ✅ List scroll at 60fps
- ✅ Animations at 60fps
- ✅ No jank during screen transitions

**Use React DevTools Profiler to identify:**
- Unnecessary re-renders
- Expensive components
- Memory leaks

#### Step 5.5: Device Testing

Test on real devices (not just simulator):
- iPhone (iOS 16+)
- Android phone (mid-range device)
- Different screen sizes
- Different text size settings

**Expected Outcome**: All screens working flawlessly with excellent performance on both platforms.

---

## Additional Tasks

### Task 1: Update TypeScript Configuration

Ensure TypeScript recognizes Tamagui types:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["tamagui"],
    // ... existing config
  }
}
```

### Task 2: Create Storybook/Documentation (Optional)

Consider creating a visual catalog of design system components:

```bash
npm install --save-dev @storybook/react-native
```

Benefits:
- Living documentation
- Component testing in isolation
- Design review tool

### Task 3: Setup Dark Mode Switching (Optional for MVP)

If users need manual dark mode toggle (vs system preference):

**File**: `hooks/useTheme.ts`

```typescript
import { useTheme as useTamaguiTheme } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTheme() {
  const theme = useTamaguiTheme();
  
  const setTheme = async (newTheme: 'light' | 'dark') => {
    await AsyncStorage.setItem('@theme', newTheme);
    // Toggle Tamagui theme
  };
  
  return { theme, setTheme };
}
```

### Task 4: Performance Monitoring

Setup performance monitoring to track improvements:

```bash
npm install @shopify/react-native-performance
```

Track:
- Screen load times
- Animation frame rates
- Time to interactive

---

## Reference Documentation

### Related Design Documents

- `docs/12-design-philosophy.md` - Source for all design tokens
- `docs/09-user-experience-principles.md` - UX principles guiding component behavior
- `docs/10-ux-flow-and-screens.md` - Screen layout specifications

### External Resources

- [Tamagui Documentation](https://tamagui.dev/docs)
- [Tamagui Expo Setup Guide](https://tamagui.dev/docs/guides/expo)
- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io)

---

## Success Criteria

The implementation is successful when:

✅ **Functional**:
- All existing functionality works identically
- No regressions in user flows
- All forms submit correctly

✅ **Visual**:
- Matches design philosophy specifications
- Dark mode works throughout
- Consistent spacing (8pt grid)
- Correct typography scales

✅ **Performance**:
- 60fps scrolling and animations
- Time to interactive < 2 seconds
- No increase in bundle size > 10%

✅ **Maintainability**:
- Zero inline StyleSheet usage
- All components use design system
- Type-safe design tokens
- Well-documented component API

✅ **Accessibility**:
- WCAG AA compliance
- Screen reader support
- Dynamic type support
- Reduced motion support

---

## Risk Mitigation

### Risk 1: Breaking Changes During Migration

**Mitigation**:
- Migrate one screen at a time
- Test thoroughly after each migration
- Keep git commits small and atomic
- Can easily revert if issues arise

### Risk 2: Performance Regression

**Mitigation**:
- Profile before and after migration
- Use React DevTools Profiler
- Test on real devices (especially mid-range Android)
- Use Tamagui's compile-time optimization

### Risk 3: Learning Curve

**Mitigation**:
- Start with simple screens (login, signup)
- Reference Tamagui documentation
- Create reusable patterns in design system
- Document common patterns as discovered

### Risk 4: Dark Mode Issues

**Mitigation**:
- Test both modes continuously during migration
- Use design tokens (not hardcoded colors)
- Review dark mode specifications from design doc
- Test on actual devices in different modes

---

## Timeline Estimate

**Total Estimated Time**: 25-35 hours

| Phase | Time | Description |
|-------|------|-------------|
| Phase 1 | 2-3h | Installation & configuration |
| Phase 2 | 4-6h | Design system components |
| Phase 3 | 8-12h | Screen migration (10-12 screens) |
| Phase 4 | 3-4h | Animation integration |
| Phase 5 | 4-6h | Testing & optimization |
| Additional | 2-4h | Documentation, cleanup |

**Recommended Approach**: Split into 3-4 work sessions over 1-2 weeks.

---

## Appendix A: Complete Tamagui Configuration

**File**: `tamagui.config.ts`

```typescript
import { createTamagui, createTokens } from '@tamagui/core';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens as defaultTokens } from '@tamagui/themes';

// System font configuration
const systemFont = createInterFont(
  {
    family: 'System',
  },
  {
    sizeSize: (size) => size,
    sizeLineHeight: (size) => size * 1.4,
  }
);

// Design tokens from design philosophy
const tokens = createTokens({
  // Colors (from Phase 2.3 above)
  color: {
    // Primary
    primary50: '#E5F2FF',
    primary100: '#B3DBFF',
    primary200: '#80C4FF',
    primary300: '#4DADFF',
    primary400: '#1A96FF',
    primary500: '#007AFF',
    primary600: '#0062CC',
    primary700: '#004999',
    primary800: '#003166',
    primary900: '#001933',
    
    // Neutrals
    neutral50: '#F9FAFB',
    neutral100: '#F3F4F6',
    neutral200: '#E5E7EB',
    neutral300: '#D1D5DB',
    neutral400: '#9CA3AF',
    neutral500: '#6B7280',
    neutral600: '#4B5563',
    neutral700: '#374151',
    neutral800: '#1F2937',
    neutral900: '#111827',
    
    // Semantic
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
    
    // Light mode semantic
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    backgroundTertiary: '#F3F4F6',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    borderActive: '#007AFF',
    
    // Dark mode semantic
    backgroundDark: '#121212',
    backgroundSecondaryDark: '#1E1E1E',
    backgroundTertiaryDark: '#2A2A2A',
    textPrimaryDark: '#F9FAFB',
    textSecondaryDark: '#9CA3AF',
    textTertiaryDark: '#6B7280',
    borderDark: '#374151',
    borderActiveDark: '#4DADFF',
  },
  
  // Spacing (8pt grid)
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    
    // Touch targets
    touchMinimum: 44,
    touchComfortable: 48,
    touchGenerous: 56,
  },
  
  // Typography sizes
  size: {
    display: 34,
    h1: 28,
    h2: 22,
    h3: 20,
    body: 17,
    bodyEmphasis: 17,
    caption: 15,
    small: 13,
    button: 17,
    tabBar: 10,
  },
  
  // Border radius
  radius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  // Z-index
  zIndex: {
    low: 1,
    medium: 10,
    high: 100,
    modal: 1000,
  },
});

// Theme definitions
const lightTheme = {
  background: tokens.color.background,
  backgroundSecondary: tokens.color.backgroundSecondary,
  backgroundTertiary: tokens.color.backgroundTertiary,
  textPrimary: tokens.color.textPrimary,
  textSecondary: tokens.color.textSecondary,
  textTertiary: tokens.color.textTertiary,
  border: tokens.color.border,
  borderActive: tokens.color.borderActive,
  primary: tokens.color.primary500,
  success: tokens.color.success,
  error: tokens.color.error,
  warning: tokens.color.warning,
  info: tokens.color.info,
};

const darkTheme = {
  background: tokens.color.backgroundDark,
  backgroundSecondary: tokens.color.backgroundSecondaryDark,
  backgroundTertiary: tokens.color.backgroundTertiaryDark,
  textPrimary: tokens.color.textPrimaryDark,
  textSecondary: tokens.color.textSecondaryDark,
  textTertiary: tokens.color.textTertiaryDark,
  border: tokens.color.borderDark,
  borderActive: tokens.color.borderActiveDark,
  primary: tokens.color.primary500,
  success: tokens.color.success,
  error: tokens.color.error,
  warning: tokens.color.warning,
  info: tokens.color.info,
};

// Create configuration
const config = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  fonts: {
    heading: systemFont,
    body: systemFont,
  },
  shorthands,
  animations: {
    instant: {
      type: 'timing',
      duration: 150,
    },
    fast: {
      type: 'timing',
      duration: 200,
    },
    normal: {
      type: 'timing',
      duration: 300,
    },
    transition: {
      type: 'timing',
      duration: 350,
    },
    gentle: {
      type: 'spring',
      damping: 20,
      stiffness: 90,
    },
    snappy: {
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
    bouncy: {
      type: 'spring',
      damping: 10,
      stiffness: 150,
    },
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
```

---

## Appendix B: Component Migration Checklist

Use this checklist for each screen migration:

```markdown
### Screen: [Name]
**File**: [Path]

#### Pre-Migration
- [ ] Document current functionality
- [ ] Screenshot current appearance (light & dark)
- [ ] Note any custom animations
- [ ] Identify all StyleSheet styles

#### Migration
- [ ] Replace View → YStack/XStack
- [ ] Replace Text → Text (design system)
- [ ] Replace TextInput → Input (design system)
- [ ] Replace TouchableOpacity → Button/TouchableCard
- [ ] Replace ScrollView → ScrollView (Tamagui)
- [ ] Replace FlatList → (keep React Native)
- [ ] Add haptic feedback where appropriate
- [ ] Remove all StyleSheet styles
- [ ] Use design tokens for all spacing/colors

#### Post-Migration
- [ ] Test all interactions
- [ ] Test light mode appearance
- [ ] Test dark mode appearance
- [ ] Test with screen reader
- [ ] Test with large text (200%)
- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Check performance (no jank)
- [ ] Update any related tests

#### Sign-off
- [ ] Designer approval (if applicable)
- [ ] Code review complete
- [ ] QA testing complete
```

---

## Conclusion

This implementation plan provides a comprehensive roadmap for integrating Tamagui into gift-horse. The plan:

1. ✅ **No conflicts** with existing codebase (clean slate)
2. ✅ **Design system tokens** aligned with `12-design-philosophy.md`
3. ✅ **Phased approach** minimizing risk
4. ✅ **Complete migration** of all existing screens
5. ✅ **Performance optimization** using compile-time extraction
6. ✅ **Accessibility compliance** built-in
7. ✅ **Dark mode support** throughout

**Next Steps**: Review this plan, make any adjustments, then proceed with Phase 1 (Installation & Configuration) when ready to begin implementation.

