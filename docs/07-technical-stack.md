# Technical Stack & Architecture

## Backend

### Supabase
**Purpose**: Complete backend-as-a-service solution

**Services Used**:
- **PostgreSQL Database**: Data storage via Supabase
- **REST API**: Web API for data access
- **Storage**: Static file storage for image uploads
- **Authentication**: User authentication and session management

**Rationale**: Provides full backend functionality without managing infrastructure

## Data Layer

### TanStack Query (React Query)
**Purpose**: API client and data fetching layer

**Features**:
- Built on top of Supabase client
- Provides loading states, error handling, caching
- Optimistic updates support
- Query invalidation and refetching

**Consideration**: Need to verify compatibility with React Native/Expo (not yet tested in this context)
**Fallback**: If not suitable, use Supabase client directly with React hooks

## Frontend UI Components

### Component Library Strategy
**Challenge**: Shadcn UI is designed for Next.js/web, not React Native

**Approach**: 
- Research and evaluate React Native component libraries
- Prioritize native feel on iOS and Android
- Consider libraries like:
  - NativeWind (Tailwind for React Native)
  - Tamagui
  - React Native Paper
  - Gluestack UI

**Decision**: To be made after research - focus on native mobile experience over web compatibility

## Mobile Platform

### React Native / Expo
**Platform**: Native mobile application only
**Target Platforms**: iOS and Android
**Web Support**: Not prioritized for initial release

### Expo Router
**Routing**: File-based routing system (already configured)
**Navigation**: Stack and potentially Tab navigation

## Development Environment

### TypeScript
- Strict mode enabled
- Type safety throughout

### State Management
- TanStack Query for server state
- React hooks for local component state
- Context API if needed for global app state

## Development Considerations

### Image Handling
- Image capture from camera
- Image sharing from other apps
- Image upload to Supabase Storage
- Image display and optimization

### Deep Linking
- Handle shared images from other apps
- URL scheme: `gifthorse` (configured in app.json)

### Voice-to-Text
- Native speech recognition APIs
- Platform-specific implementation (iOS vs Android)
- Fast transcription for quick capture

### Notifications
- Local notifications for reminders
- Birthday and occasion alerts
- Permission handling

## Architecture Principles

1. **Mobile-First**: Optimized for native mobile experience
2. **Offline-Considerate**: TanStack Query caching helps, but may need offline storage for true offline support
3. **Fast Capture**: Minimize data transfer and processing during capture flow
4. **Simple Data Model**: Person-centric design with straightforward relationships

