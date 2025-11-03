# Codebase Structure

## Directory Structure

```
gift-horse/
├── app/                    # Main application code (file-based routing)
│   ├── _layout.tsx        # Root layout (currently minimal Stack router)
│   └── index.tsx          # Home/index screen
│
├── app-example/           # Reference boilerplate code (not used in app)
│   ├── app/              # Example routing structure
│   │   ├── (tabs)/      # Tab navigation example
│   │   └── modal.tsx    # Modal presentation example
│   ├── components/       # Example component implementations
│   ├── constants/        # Theme constants
│   ├── hooks/           # Custom React hooks
│   └── scripts/         # Utility scripts
│
├── assets/               # Static assets (images, icons)
│   └── images/          # App icons and splash screens
│
├── docs/                 # Project documentation (this directory)
│
├── node_modules/         # Dependencies
├── app.json             # Expo configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project README
```

## Key Files

### Configuration Files
- **`app.json`**: Expo app configuration
  - App name: `gift-horse`
  - URL scheme: `gifthorse`
  - New Architecture enabled
  - Typed routes enabled
  - React Compiler enabled
  - Supports iOS, Android, and Web

- **`package.json`**: Dependencies and scripts
  - Main entry: `expo-router/entry`
  - Scripts: start, android, ios, web, lint

- **`tsconfig.json`**: TypeScript configuration
  - Extends Expo base config
  - Strict mode enabled
  - Path alias: `@/*` maps to root

### Current Application Code
- **`app/_layout.tsx`**: Minimal root layout using Expo Router Stack
- **`app/index.tsx`**: Basic home screen (placeholder)

## Routing Structure

The project uses **Expo Router** for file-based routing:
- Routes are defined by files in the `app` directory
- `_layout.tsx` files define layout components
- Currently using a simple Stack navigator

## Example Code Reference (`app-example`)

The `app-example` directory contains reference implementations:

### Navigation Patterns
- **Tab Navigation**: `(tabs)/` directory with `_layout.tsx` and tab screens
- **Modal Presentation**: `modal.tsx` demonstrates modal screen
- **Stack Navigation**: Root layout with Stack navigator configuration

### Component Patterns
- **Themed Components**: `themed-text.tsx`, `themed-view.tsx`
- **UI Components**: `collapsible.tsx`, `icon-symbol.tsx`
- **External Links**: `external-link.tsx`

### Theme System
- **Theme Constants**: `constants/theme.ts` with light/dark color definitions
- **Color Scheme Hooks**: `use-color-scheme.ts`, `use-theme-color.ts`
- **Platform-specific Fonts**: iOS, Web, and default font configurations

### Hooks
- Custom hooks for color scheme detection
- Platform-specific implementations (web vs native)

## Dependencies

### Core
- **expo**: ~54.0.20
- **expo-router**: ~6.0.13
- **react**: 19.1.0
- **react-native**: 0.81.5

### Navigation
- **@react-navigation/native**: ^7.1.8
- **@react-navigation/bottom-tabs**: ^7.4.0
- **@react-navigation/elements**: ^2.6.3

### UI & Animations
- **react-native-reanimated**: ~4.1.1
- **react-native-gesture-handler**: ~2.28.0
- **expo-haptics**: ~15.0.7
- **expo-image**: ~3.0.10

### Utilities
- **expo-constants**: ~18.0.10
- **expo-font**: ~14.0.9
- **expo-linking**: ~8.0.8
- **expo-status-bar**: ~3.0.8
- **expo-splash-screen**: ~31.0.10
- **expo-system-ui**: ~6.0.8
- **expo-web-browser**: ~15.0.8

## Development Workflow

1. **File-based Routing**: Create files in `app/` to create routes
2. **TypeScript**: Strict mode enabled, use type safety
3. **Path Aliases**: Use `@/` prefix for imports from root
4. **Reference Implementation**: Check `app-example/` for patterns

