# Design Philosophy

*Informed by best practices from Flighty, Daylio, Instant, and other leading native mobile data tracking apps*

## Overview

This document establishes a comprehensive design philosophy for gift-horse, drawing from the best practices of successful native mobile apps that excel at data tracking and management. The guidance is specifically tailored for applications where users:
- Manually input small amounts of data (quick capture)
- Review medium-sized lists (~20 items)
- Need speed and simplicity over complexity

## Core Design Principles

### 1. **Speed Over Features**
Every design decision should optimize for reducing time-to-action. If a feature adds friction, it doesn't belong in the core flow.

### 2. **Clarity Over Cleverness**
Users should instantly understand what they're looking at and what actions are available. No learning curve.

### 3. **Native Feel Over Custom Creativity**
The app should feel like it belongs on the platform. Leverage platform conventions and patterns that users already know.

### 4. **Content First**
The user's data is the hero. All UI elements exist to support and enhance the data, not compete with it.

---

## Component Design Patterns

### Card-Based Layouts

**Why**: Cards are the gold standard for data tracking apps (Flighty, Daylio, Smartsheet all use them)

**Visual Structure**:
```
┌─────────────────────────────────┐
│ [Icon/Image]  [Primary Info]    │  ← 44pt min height for tappability
│ [Supporting text]                │  ← 8dp spacing from primary
│ [Metadata · Metadata]            │  ← 12dp padding bottom
└─────────────────────────────────┘
     12-16dp radius    2-8dp elevation
```

**Best Practices**:
- **Elevation**: Use shadow depth to distinguish states (idea vs purchased)
- **Touch Targets**: Minimum 44×44 pt for tappable elements
- **Spacing**: 12-16dp between cards, 16-20dp edge margins
- **Corner Radius**: 12-16dp for modern feel without being too rounded
- **Content Density**: 2-3 lines of primary info visible without expanding

**Example from Flighty**: Flight cards show 3 key pieces of info immediately (flight number, time, gate) with subtle color coding for status. All other details are accessible via tap.

### List Design Patterns

**Why**: Medium-sized lists (10-20 items) need careful design to stay scannable

**Guidelines**:

1. **Visual Rhythm**:
   - Consistent card heights when possible
   - Alternating background colors sparingly (only for grouping)
   - Clear visual separation between groups

2. **Grouping & Sorting**:
   - Group by logical categories (occasions, dates, states)
   - Sort within groups by recency or importance
   - Use sticky section headers for context while scrolling

3. **Section Headers**:
   - 14-16pt semi-bold typography
   - 40-44pt height for touch target
   - Subtle background color to distinguish from content
   - Sticky behavior for scrolling context

4. **Empty States**:
   - Center-aligned icon (48-64pt)
   - Helpful message (not cute, useful)
   - Clear call-to-action button

**From Daylio**: Mood entries are grouped by date with clear visual separators. Each group has a sticky header. Icons provide quick recognition without reading.

### Form Components

**Why**: Quick data entry is the primary use case

**Input Hierarchy** (fastest to slowest):
1. Selection (tap to choose) - fastest
2. Toggle/switch - very fast
3. Numeric input - fast
4. Short text (< 20 chars) - moderate
5. Long text - slowest (minimize usage)

**Smart Defaults**:
- Pre-populate fields when possible
- Remember recent choices
- Suggest common values

**Progressive Disclosure**:
- Show only required fields initially
- "More Details" expandable section for optional fields
- Never show 10+ fields at once

**Inline Validation**:
- Real-time feedback as user types
- Clear success indicators
- Immediate error messages (don't wait for submit)

**From Flighty**: When adding a flight, just enter flight number. The app looks up all other details automatically. Optional fields are hidden behind a "More Options" toggle.

### Button Hierarchy

**Critical for Native Feel**:

1. **Primary Action**: 
   - Filled button, accent color
   - Bottom of screen (thumb-reachable)
   - 48pt height minimum
   - Full-width or prominent placement

2. **Secondary Action**:
   - Outlined button or text button
   - Less prominent placement

3. **Destructive Action**:
   - Red color
   - Requires confirmation
   - Not easily tappable by accident

### Interactive Elements

**Touch Targets**:
- **Minimum**: 44×44pt (iOS HIG standard)
- **Comfortable**: 48×48pt (recommended)
- **Generous**: 56×56pt (for primary actions)

**Swipe Actions**:
- Common pattern for list management
- Left swipe: Destructive (delete, archive)
- Right swipe: Quick action (mark as done)
- Visual feedback: color reveals behind card

**Pull to Refresh**:
- Standard pattern for data lists
- Use platform native component
- Show timestamp of last update

---

## Typography

### Font Selection

**Primary Recommendation**: Use system fonts

- **iOS**: SF Pro (includes SF Pro Text, SF Pro Display)
- **Android**: Roboto
- **React Native**: System fonts provide automatic optimization

**Why System Fonts**:
- Load instantly (no font download)
- Automatic platform optimizations
- Accessibility features work perfectly
- Users already familiar with them

**Custom Fonts**: Only if brand identity absolutely requires it
- Maximum 2 font families
- Include all necessary weights (400, 600, 700)
- Test accessibility features thoroughly

### Type Scale

**Establish a clear hierarchy with consistent sizing**:

| Style | Size | Weight | Use Case |
|-------|------|--------|----------|
| Display | 34pt | Bold | Hero moments (rare) |
| H1 | 28pt | Bold | Screen titles |
| H2 | 22pt | Semibold | Section titles |
| H3 | 20pt | Semibold | Card titles |
| Body | 17pt | Regular | Main text |
| Body Emphasis | 17pt | Semibold | Emphasized text |
| Caption | 15pt | Regular | Supporting text |
| Small | 13pt | Regular | Metadata |
| Button | 17pt | Semibold | Button labels |
| Tab Bar | 10pt | Medium | Navigation labels |

### Typography Guidelines

**1. Information Hierarchy**:
- Primary info: Bold, larger (20pt)
- Secondary info: Regular, medium (15pt)
- Tertiary info: Regular, smaller (13pt), reduced opacity

**2. Weight Usage**:
- **Regular (400)**: Body text, descriptions
- **Semibold (600)**: Emphasized text, card titles
- **Bold (700)**: Screen titles, primary headings
- **Avoid**: Light (300) or below - poor accessibility

**3. Color & Contrast**:
- **Primary text**: Near-black in light mode, near-white in dark mode
- **Secondary text**: 60% opacity of primary
- **Tertiary text**: 40% opacity of primary
- **Minimum contrast ratio**: 4.5:1 (WCAG AA standard)

**4. Line Length**:
- **Optimal**: 50-75 characters per line
- **Maximum**: 90 characters
- Use padding to constrain wide screens

**5. Alignment**:
- **Left-aligned**: All body text (easiest to read)
- **Center-aligned**: Empty states, onboarding only
- **Right-aligned**: Numerical data in tables only

**From Flighty**:
- Flight numbers are bold and large (primary info)
- Times use medium weight (secondary but important)
- Gate info uses regular weight (contextual)
- All use same font family with different weights

---

## Animation & Motion

### Core Animation Principles

**1. Purposeful, Never Decorative**:
Every animation must serve one of these purposes:
- **Feedback**: Confirm user action
- **Guidance**: Direct attention or indicate next step
- **Relationship**: Show how elements are connected
- **Context**: Maintain spatial awareness during transitions

**2. Fast & Snappy**:
- **Quick actions**: 200-300ms
- **Screen transitions**: 300-400ms
- **Never exceed**: 500ms for any animation

**3. Natural Motion**:
- Use easing curves (not linear)
- Objects should accelerate and decelerate
- Heavy objects move slower than light objects

### Animation Timing

| Type | Duration | Use Case |
|------|----------|----------|
| Instant | 150ms | Button press, user perceives as immediate |
| Fast | 200ms | Toggle, checkbox, quick feedback |
| Normal | 300ms | State changes, card expand, default |
| Transition | 350ms | Screen navigation, modal presentation |

**Easing Curves**:
- **Default**: Smooth acceleration and deceleration (most common)
- **Decelerate**: Entering elements (starts fast, ends slow)
- **Accelerate**: Exiting elements (starts slow, ends fast)
- **Sharp**: Quick interaction that returns (button press)

### Animation Catalog

**1. Feedback Animations**:
- **Button Press**: Scale to 0.95 (subtle press feedback), 150ms
- **Toggle Switch**: Slide knob, 200ms
- **Checkbox**: Scale bounce (1.0 → 1.2 → 1.0), 300ms

**2. State Change Animations**:
- **Status change**: Background color fade + icon change, 300ms
- **List item deletion**: Swipe reveal → scale down + fade → list reflow, 300ms
- **Card lift**: Elevation increase on press, 150ms

**3. Navigation Animations**:
- **Card to Detail**: Card scales up from tap position, 350ms
- **Modal presentation**: Slide up from bottom + background dim, 300ms
- **Stack push**: New screen slides in from right, 350ms

**4. Content Loading**:
- **Skeleton screens** (preferred over spinners): Show structure immediately, shimmer effect, fade in real content, 300ms fade
- **Pull to refresh**: Native pull indicator, subtle bounce when released, 400ms

**5. Attention-Directing**:
- **New item added**: Fade in + slide in from top, subtle scale bounce, 400ms
- **Empty state action**: Gentle pulse (scale 1.0 ↔ 1.05), 2000ms, repeat 2-3 times only

### Animation Best Practices

**From Flighty**:
- When flight status updates, the entire card subtly pulses once
- Boarding pass view slides up from bottom with spring animation
- Status changes include color fade + icon change
- Delay notifications expand smoothly from their initial position

**From Daylio**:
- Mood selection has a satisfying bounce (scale animation)
- Calendar view fades in dates progressively (staggered animation)
- Statistics charts animate their values counting up
- Navigation feels native with platform-standard transitions

**Guidelines**:

1. **Use Spring Animations for Natural Feel**: Damping and stiffness create organic motion

2. **Stagger Animations for Lists**: When rendering lists, stagger item animations by 50ms. Max stagger: 20 items × 50ms = 1 second

3. **Reduce Motion Support**: Respect system preferences for reduced motion. When enabled, use instant state changes or very short durations (< 100ms)

4. **Test on Real Devices**: Animations on simulator don't represent actual performance. Test on lower-end devices and ensure 60fps minimum.

### Haptic Feedback

**Essential Component of Native Feel**:

| Haptic Type | Use Case |
|-------------|----------|
| Light tap | Selection, toggle, minor interactions |
| Medium tap | Button press, standard actions |
| Heavy tap | Important action, deletion |
| Success | Successful completion (save, purchase) |
| Error | Failed action, validation error |

**When to Use Haptics**:
- ✅ State changes (toggle switch, checkbox)
- ✅ Significant actions (save, delete)
- ✅ Alerts and errors
- ✅ Pull to refresh trigger
- ❌ Every button press (too much)
- ❌ Scrolling or navigation
- ❌ Decorative purposes

---

## Color System

### Color Philosophy

**Learn from the Best**:
- **Flighty**: Muted, professional palette with pops of color for status
- **Daylio**: Vibrant colors for moods, but restrained elsewhere
- **Instant**: Data-focused with charts using distinguishable colors

### Color Palette Structure

**Use a structured system with shades 50-900**:

**Primary (Brand/Accent)**:
- Use sparingly (10-20% of UI)
- Main buttons, links, active states
- 500 is the base, 600-700 for hover/active

**Neutral (Grays)**:
- Foundation of the UI (70-80%)
- Backgrounds, borders, text
- 900 for primary text, 500-600 for secondary, 200-300 for borders

**Semantic**:
- Success (green), Error (red), Warning (orange), Info (blue)
- Only for status indication
- Never rely on color alone (use icons too)

### Dark Mode Support

**Required for Modern Apps**:

**Backgrounds**:
- Don't use pure black (#000000) - too harsh
- Use near-black (#121212) for primary background
- Elevated surfaces are *lighter* in dark mode (opposite of light mode)

**Colors in Dark Mode**:
- Reduce saturation of accent colors
- Increase contrast for text
- Test all color combinations for accessibility

**Best Practices**:
1. Design both modes from the start
2. Use semantic color names (not "blue" but "accent")
3. Respect system preference by default
4. Test readability in both modes

### Color Usage Guidelines

**1. Restraint**:
- Primary color: 10-20% of UI
- Neutral grays: 70-80% of UI
- Semantic colors: Only for status/states

**2. Accessibility**:
- All text must meet WCAG AA (4.5:1 contrast)
- Important text should meet WCAG AAA (7:1 contrast)
- Never rely on color alone to convey information

**3. Consistency**:
- Use a theme system to enforce consistency
- Name colors semantically (background.primary, text.secondary)
- Don't use arbitrary hex codes throughout codebase

---

## Spacing & Layout

### Spacing Scale

**Use a consistent spacing scale (8pt grid system)**:

| Token | Size | Use Case |
|-------|------|----------|
| xs | 4pt | Tight spacing within components |
| sm | 8pt | Related elements |
| md | 16pt | Standard spacing (most common) |
| lg | 24pt | Section spacing |
| xl | 32pt | Major section breaks |
| xxl | 48pt | Screen-level spacing |

### Layout Principles

**1. Breathing Room**:
- Don't cram content
- White space improves readability
- Edge margins: 16-20dp minimum

**2. Consistent Patterns**:
```
Screen Layout Template:
┌─────────────────────────────────┐
│ [Header]                    [16] │
│                             [16] │
│ [Content]                        │
│   [Card]                         │
│                             [8]  │
│   [Card]                         │
│                             [8]  │
│   [Card]                         │
│                             [24] │
│ [Primary Button]            [16] │
└─────────────────────────────────┘
```

**3. Responsive Behavior**:
- Small screens (< 375 width): Reduce spacing by 1 step
- Large screens (> 768 width): Increase spacing by 1 step
- Tablet layouts: Consider 2-column layouts

---

## Interaction Patterns

### Gestures

**Standard iOS/Android Gestures** (use platform defaults):

1. **Tap**: Primary action
2. **Long Press**: Show context menu or additional options
3. **Swipe Left/Right**: Quick actions (delete, complete)
4. **Swipe Down**: Dismiss modal or refresh
5. **Pinch**: Zoom (for images only)
6. **Double Tap**: Not recommended (users don't discover it)

### Loading States

**Never Show Spinners Alone**:

❌ **Bad**: Empty screen with spinner
✅ **Good**: Skeleton screen showing structure

**Loading Pattern Hierarchy**:
1. **Best**: Skeleton screens (perceived performance)
2. **Good**: Pull to refresh (user-initiated)
3. **Acceptable**: Inline spinner for small updates
4. **Last Resort**: Full-screen spinner

### Error States

**Make Errors Helpful**:

❌ **Bad**: "Error: 500"
✅ **Good**: "Couldn't save your gift idea. Check your connection and try again." [Try Again]

**Error State Checklist**:
- Explain what went wrong (user-friendly language)
- Suggest how to fix it
- Provide a retry action
- Don't lose user's data
- Log technical details for debugging (but don't show them)

### Empty States

**Engaging, Not Sad**:

**First-Time User**:
- Welcoming message
- Explain what will appear here
- Clear action to add first item

**Filtered/Searched**:
- Acknowledge the search/filter
- Suggest alternatives
- Option to clear filters

---

## Accessibility

### Non-Negotiable Requirements

**1. Screen Reader Support**:
- All interactive elements need labels
- Describe what will happen, not just what it says
- Group related information

**2. Dynamic Type**:
- Use system font sizes
- Allow text to scale with system settings
- Test at 200% text size
- Ensure layouts don't break

**3. Color Contrast**:
- Test all color combinations
- Use automated tools
- Don't rely on color alone for meaning

**4. Touch Targets**:
- Minimum 44×44pt (iOS)
- Minimum 48×48dp (Android)
- Add padding to increase tappable area if needed

**5. Reduce Motion**:
- Respect system preference
- Disable decorative animations
- Keep functional animations minimal

---

## Image Handling

### Image Guidelines

**From Flighty & Similar Apps**:
- Display images prominently when available
- Provide image preview before upload
- Show upload progress
- Handle errors gracefully (show broken image icon)

**Optimization**:
- Max dimensions: 1200×1200 (balance quality and file size)
- Quality: 80% (good enough, smaller files)
- Format: JPEG for photos, PNG for graphics
- Compress before upload
- Remove metadata for privacy and file size

**Display Patterns**:
- Thumbnail in cards (64×64pt typically)
- Full-width in detail views
- Tappable for full-screen viewing
- Loading placeholder while fetching

---

## Performance Considerations

### Critical Performance Metrics

**Target Metrics**:
- **Time to Interactive**: < 2 seconds
- **List Scroll FPS**: 60fps (or 120fps on capable devices)
- **Animation FPS**: 60fps minimum
- **Image Load Time**: < 1 second

### Optimization Strategies

**1. List Rendering**:
- Use virtualized lists (only render visible items)
- Set initial render count (10-15 items)
- Use proper key extraction
- Consider item height optimization

**2. Image Optimization**:
- Lazy load images
- Show placeholder while loading
- Cache aggressively
- Use appropriate sizes (don't load 4K for thumbnail)

**3. Database Queries**:
- Fetch only what's needed
- Paginate long lists (20-50 items per page)
- Cache query results
- Optimistic UI updates

---

## Platform-Specific Considerations

### iOS Specific

**Navigation**:
- Use large titles for top-level screens
- Standard navigation bar for detail screens
- Swipe from left edge to go back (gesture)

**Modals**:
- Sheet presentation style
- Pull down to dismiss
- Drag handle at top

**Lists**:
- Swipe actions (left and right)
- Context menus (long press)
- Separator lines (subtle, not bold)

### Android Specific

**Navigation**:
- Material Design top app bar
- Back button handling (hardware + on-screen)
- FAB for primary action (if applicable)

**Sheets**:
- Bottom sheets for actions
- Full-screen modals for complex forms

**Material Components**:
- Ripple effect on touch
- Elevation for cards
- Consistent with Material Design 3 guidelines

---

## Testing Guidelines

### Visual Testing

1. **Both Modes**: Test every screen in light and dark mode
2. **Text Sizes**: Test at 100%, 150%, 200% scale
3. **Screen Sizes**: Test on smallest and largest target devices
4. **Real Devices**: Simulator doesn't show true performance

### Interaction Testing

1. **Gestures**: Verify all swipes, taps, long presses work
2. **Haptics**: Feel the feedback on device
3. **Animations**: Check smoothness at 60fps
4. **Loading**: Test on slow network

### Accessibility Testing

1. **Screen Reader**: Navigate entire app with VoiceOver/TalkBack
2. **Dynamic Type**: Verify layouts at 200% scale
3. **Color Contrast**: Use accessibility inspector tools
4. **Reduce Motion**: Test with animations disabled

---

## Design Decision Framework

When making any design decision, ask:

1. **Does this make the app faster to use?**
   - If no → reconsider

2. **Is this instantly understandable?**
   - If no → simplify

3. **Does this feel native to iOS/Android?**
   - If no → use platform conventions

4. **Does this put the user's data first?**
   - If no → reduce visual noise

5. **Would Flighty/Daylio do this?**
   - If no → research their approach

---

## Key Measurements Reference

**Touch Targets**:
- Minimum: 44×44pt (iOS) / 48×48dp (Android)
- Comfortable: 48×48pt
- Generous: 56×56pt

**Spacing**:
- 4, 8, 16, 24, 32, 48pt

**Corner Radius**:
- Cards: 12-16pt
- Buttons: 8-12pt
- Avatars: 50% (circular)

**Typography Sizes**:
- Screen titles: 28pt
- Section titles: 22pt
- Card titles: 20pt
- Body: 17pt
- Supporting: 15pt
- Metadata: 13pt

**Animation Timing**:
- Button press: 150ms
- State change: 300ms
- Navigation: 350ms
- Maximum: 500ms

**Shadow Elevation**:
- Low: 2dp
- Medium: 4dp
- High: 8dp

---

## Resources

### Inspiration
- [Flighty](https://www.flightyapp.com) - Study UI, animations, data presentation
- [Daylio](https://daylio.net) - Study quick input, color usage
- [Things 3](https://culturedcode.com/things/) - Study list management

### Guidelines
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io)

---

## Conclusion

This design philosophy is about understanding the principles behind successful data tracking apps and applying them thoughtfully to gift-horse.

**Remember**:
- **Speed** is more important than features
- **Clarity** is more important than aesthetics
- **Native feel** is more important than brand creativity
- **User's data** is more important than your UI

Every design decision should be measured against these principles. When in doubt, look at how Flighty, Daylio, or the platform (iOS/Android) solves similar problems.

The goal is to create an app that feels like it was made by Apple or Google, but with the unique functionality of gift-horse.
