# Implementation Plan

This document outlines the step-by-step implementation plan for building the Gift Horse MVP.

## Implementation Phases

### Phase 0: Project Setup & Infrastructure
**Goal**: Set up development environment, dependencies, and backend infrastructure

### Phase 1: Core MVP (Authentication & Basic Screens)
**Goal**: Get basic app structure working with authentication and core navigation

### Phase 2: Core Features (Data & Screens)
**Goal**: Implement data models, API integration, and core feature screens

### Phase 3: Polish & Complete MVP
**Goal**: Complete remaining features, testing, and refinements

---

## Phase 0: Project Setup & Infrastructure

### 0.1 Supabase Setup
- [ ] Create Supabase project (if not already created)
- [ ] Configure Supabase local development environment
- [ ] Set up Supabase CLI

### 0.2 Database Schema Setup
- [ ] Create migration for `profiles` table
  - `id` (UUID, FK to auth.users.id, primary key)
  - `created_at`, `updated_at` (timestamps)
- [ ] Create migration for `recipients` table
  - `id` (UUID, primary key)
  - `user_id` (UUID, FK to profiles.id)
  - `name` (text, not null)
  - `birthday` (date, nullable)
  - `emoji` (text, nullable)
  - `created_at`, `updated_at` (timestamps)
  - Index on `user_id`
- [ ] Create migration for `occasions` table
  - `id` (UUID, primary key)
  - `user_id` (UUID, FK to profiles.id)
  - `name` (text, not null)
  - `default_date` (date, nullable)
  - `reminder_days_before` (integer, nullable)
  - `created_at` (timestamp)
  - Index on `user_id`
- [ ] Create migration for `recipient_occasion_mappings` table
  - `id` (UUID, primary key)
  - `recipient_id` (UUID, FK to recipients.id)
  - `occasion_id` (UUID, FK to occasions.id)
  - `created_at` (timestamp)
  - Unique constraint on (recipient_id, occasion_id)
- [ ] Create migration for `gift_ideas` table
  - `id` (UUID, primary key)
  - `user_id` (UUID, FK to profiles.id)
  - `recipient_id` (UUID, FK to recipients.id, nullable)
  - `title` (text, not null)
  - `price` (decimal, nullable)
  - `link` (text, nullable)
  - `notes` (text, nullable)
  - `image_url` (text, nullable)
  - `state` (enum: 'idea', 'acquired', 'gifted', 'abandoned', default 'idea')
  - `occasion_id` (UUID, FK to occasions.id, nullable)
  - `created_at`, `updated_at` (timestamps)
  - Indexes on `user_id`, `recipient_id`, `state`, `created_at`
  - Check constraint: `occasion_id` can only be set if `recipient_id` is set
- [ ] Create enum type for gift states
- [ ] Set up Row Level Security (RLS) policies for all tables
  - Enable RLS on all tables
  - Create policies: users can only access their own data
  - Test RLS policies

### 0.3 Storage Setup
- [ ] Create Supabase Storage bucket for gift images
- [ ] Configure storage policies (users can only upload/access their own images)
- [ ] Set up bucket: `gift-images`

### 0.4 Frontend Dependencies
- [ ] Install Supabase client: `npm install @supabase/supabase-js`
- [ ] Install TanStack Query: `npm install @tanstack/react-query`
- [ ] Install AsyncStorage for local storage: `npm install @react-native-async-storage/async-storage`
- [ ] Install Expo Image Picker: `npx expo install expo-image-picker`
- [ ] Install Expo Camera: `npx expo install expo-camera`
- [ ] Install Expo Notifications: `npx expo install expo-notifications`
- [ ] Research and select UI component library (NativeWind/Tamagui/React Native Paper)
- [ ] Install selected UI library and configure

### 0.5 Project Configuration
- [ ] Set up environment variables for Supabase (`.env` or `.env.local`)
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Configure Expo deep linking for image sharing
- [ ] Set up TypeScript types for database schema
- [ ] Create shared types directory structure

---

## Phase 1: Core MVP (Authentication & Basic Screens)

### 1.1 Supabase Client Setup
- [ ] Create `lib/supabase.ts` - Supabase client initialization
- [ ] Create `lib/supabase-client.ts` - Typed Supabase client
- [ ] Set up auth state listener
- [ ] Create auth context/provider

### 1.2 Authentication Screens
- [ ] Create `app/auth/_layout.tsx` - Auth stack layout
- [ ] Create `app/auth/login.tsx` - Login screen
  - Email/password form
  - Error handling
  - Navigate to signup
- [ ] Create `app/auth/signup.tsx` - Signup screen
  - Email/password/name form
  - Create profile on signup
  - Error handling
  - Navigate to login

### 1.3 Profile Management
- [ ] Create profile on user signup (database trigger or function)
- [ ] Create hooks: `useProfile()` - fetch current user profile
- [ ] Test profile creation flow

### 1.4 Root Layout & Navigation Setup
- [ ] Update `app/_layout.tsx` - Root layout with auth check
  - Check authentication state
  - Redirect to onboarding (first time) or auth (not authenticated) or main app
- [ ] Create `app/(tabs)/_layout.tsx` - Tab navigator
  - Bottom tabs: Add Gift, Recipients, Unassigned
- [ ] Set up navigation structure
- [ ] Create placeholder screens for tabs

### 1.5 Onboarding Screen
- [ ] Create `app/onboarding.tsx`
  - Three benefit slides/cards
  - "Get Started" button → Sign Up
  - "Skip" button → Login
  - Persist "onboarding seen" flag (AsyncStorage)
- [ ] Add onboarding check to root layout
- [ ] Test onboarding flow

---

## Phase 2: Core Features (Data & Screens)

### 2.1 Data Layer Setup
- [ ] Set up TanStack Query provider in root layout
- [ ] Create query hooks structure:
  - `hooks/use-recipients.ts` - CRUD operations for recipients
  - `hooks/use-gift-ideas.ts` - CRUD operations for gift ideas
  - `hooks/use-occasions.ts` - CRUD operations for occasions
- [ ] Create mutation hooks for all entities
- [ ] Set up optimistic updates
- [ ] Test basic queries and mutations

### 2.2 Recipients Feature
- [ ] Create `app/recipients/_layout.tsx` - Stack layout for recipients
- [ ] Create `app/recipients/index.tsx` - Recipients List
  - Fetch and display recipients
  - Profile display (initials/emoji)
  - Tap to navigate to detail
  - Add recipient button
- [ ] Create `app/recipients/new.tsx` - Create Recipient
  - Form: name, birthday, emoji
  - Save mutation
  - Navigate back on success
- [ ] Create `app/recipients/[id].tsx` - Recipient Detail
  - Fetch recipient details
  - Display recipient info
  - Fetch and display gift ideas for recipient
  - Group by occasions, sort by recency
  - Add gift idea button (pre-populates recipient)
  - Edit recipient button

### 2.3 Gift Ideas Feature - Core
- [ ] Create `app/gifts/_layout.tsx` - Stack layout for gifts
- [ ] Create `app/gifts/[id].tsx` - Gift Detail/Edit
  - Display all gift fields
  - Edit form
  - State selector
  - Recipient selector
  - Occasion selector (conditional)
  - Save/delete actions
  - Image display and upload

### 2.4 Add Gift Screen (Landing)
- [ ] Update `app/index.tsx` - Add Gift Screen
  - Capture method selector
  - Photo capture button (opens camera)
  - Quick text entry
  - Handle shared images (deep link)
  - Minimal form: title (required), recipient (optional), occasion (optional)
  - Expandable "more details" section
  - Save mutation
  - Success feedback
  - Clear form after save
- [ ] Implement image capture flow
- [ ] Implement image upload to Supabase Storage
- [ ] Handle deep linking for shared images
- [ ] Test all capture methods

### 2.5 Unassigned Ideas Screen
- [ ] Create `app/unassigned.tsx` - Unassigned Ideas
  - Fetch gift ideas where `recipient_id IS NULL`
  - Display list of unassigned ideas
  - Tap to navigate to gift detail
  - Assign to recipient action
- [ ] Test unassigned ideas flow

### 2.6 Occasions Feature (Basic)
- [ ] Create `app/occasions/index.tsx` - Occasions List
  - Display all occasions
  - Add occasion button
  - Popular occasions suggestions (Christmas, Diwali, etc.)
- [ ] Create `app/occasions/new.tsx` - Create Occasion
  - Form: name, default_date, reminder_days_before
  - Save mutation
- [ ] Create recipient-occasion mapping functionality
  - Map recipients to occasions from occasion screen or recipient detail

---

## Phase 3: Polish & Complete MVP

### 3.1 Archive Feature
- [ ] Create `app/archive.tsx` - Archive Screen
  - Fetch gift ideas where `state = 'gifted'`
  - Display archived gifts
  - Group by recipient (optional)
  - Read-only view

### 3.2 Settings Screen
- [ ] Create `app/settings.tsx` - Settings Screen
  - Account info display
  - Link to occasions
  - Link to archive
  - Logout button
  - Version info

### 3.3 Notifications
- [ ] Set up Expo Notifications
- [ ] Request notification permissions
- [ ] Create notification scheduler service
- [ ] Schedule birthday reminders (1 month before)
- [ ] Schedule occasion reminders (configurable)
- [ ] Test notification flow

### 3.4 Image Handling Enhancements
- [ ] Optimize image uploads (compression)
- [ ] Add image viewing (full screen)
- [ ] Add image deletion
- [ ] Handle image errors gracefully

### 3.5 Error Handling & Loading States
- [ ] Add loading states to all screens
- [ ] Add error boundaries
- [ ] Add error messages for failed operations
- [ ] Add retry mechanisms
- [ ] Add offline handling (basic)

### 3.6 Data Organization Logic
- [ ] Implement occasion-based grouping for recipient gift ideas
  - Calculate next upcoming occasion
  - Sort occasions chronologically
  - Group gifts by occasion
- [ ] Implement recency sorting within groups
- [ ] Test organization logic with various data scenarios

### 3.7 UI/UX Polish
- [ ] Add haptic feedback for actions
- [ ] Add success animations/toasts
- [ ] Improve visual hierarchy
- [ ] Add empty states for all lists
- [ ] Add pull-to-refresh
- [ ] Polish spacing and typography
- [ ] Test on both iOS and Android

### 3.8 Testing & Bug Fixes
- [ ] Test all user flows end-to-end
- [ ] Test authentication flows
- [ ] Test data isolation (RLS)
- [ ] Test image upload/download
- [ ] Test notifications
- [ ] Fix identified bugs
- [ ] Performance testing

### 3.9 Documentation
- [ ] Update implementation log in `docs/03-features-and-implementations.md`
- [ ] Document any deviations from plan
- [ ] Document known issues/limitations

---

## Technical Implementation Details

### Database Schema Implementation Order
1. Profiles table (foundation)
2. Recipients table (core entity)
3. Gift Ideas table (core entity)
4. Occasions table
5. Recipient-Occasion Mappings table
6. RLS policies for all tables

### Component Structure
```
components/
├── ui/                    # Reusable UI components (buttons, inputs, etc.)
├── gift-idea/            # Gift idea related components
├── recipient/            # Recipient related components
├── occasion/             # Occasion related components
└── shared/               # Shared components (loading, error, etc.)
```

### Hook Structure
```
hooks/
├── auth/                 # Authentication hooks
├── recipients/           # Recipient hooks
├── gift-ideas/          # Gift idea hooks
├── occasions/           # Occasion hooks
└── shared/              # Shared hooks (useQuery, etc.)
```

### Type Definitions
```
types/
├── database.ts          # Supabase generated types
├── entities.ts          # Entity types (Recipient, GiftIdea, etc.)
└── navigation.ts        # Navigation types
```

### Utilities
```
lib/
├── supabase.ts          # Supabase client
├── storage.ts           # Storage utilities
├── notifications.ts     # Notification utilities
└── utils.ts             # General utilities
```

---

## Key Implementation Decisions

### TanStack Query Usage
- Use TanStack Query for all server state
- Implement optimistic updates for mutations
- Use query invalidation for refetching
- Cache configuration for offline support

### Image Handling
- Compress images before upload
- Store images in Supabase Storage
- Use Expo Image for optimized display
- Handle image errors gracefully

### State Management
- Server state: TanStack Query
- Local state: React hooks
- Global app state: Context API (if needed)
- Onboarding flag: AsyncStorage

### Navigation
- File-based routing with Expo Router
- Tab navigation for primary screens
- Stack navigation for detail screens
- Modal presentation for editing (optional)

---

## Testing Checklist

### Authentication
- [ ] Sign up flow
- [ ] Login flow
- [ ] Logout flow
- [ ] Profile creation
- [ ] Auth state persistence

### Recipients
- [ ] Create recipient
- [ ] Edit recipient
- [ ] Delete recipient
- [ ] List recipients
- [ ] View recipient detail

### Gift Ideas
- [ ] Create gift idea (all capture methods)
- [ ] Edit gift idea
- [ ] Delete gift idea
- [ ] Change gift state
- [ ] Assign/unassign recipient
- [ ] Assign occasion
- [ ] Image upload
- [ ] Deep link image sharing

### Occasions
- [ ] Create occasion
- [ ] Edit occasion
- [ ] Delete occasion
- [ ] Map recipients to occasions

### Data Isolation
- [ ] Users can only see their own data
- [ ] RLS policies enforced
- [ ] Foreign key constraints working

### Notifications
- [ ] Birthday reminders scheduled
- [ ] Occasion reminders scheduled
- [ ] Notifications delivered correctly

---

## Notes

- Prioritize core capture and browse flows
- Can simplify occasions management for MVP if needed
- Focus on getting basic flow working before polish
- Test on real devices early (especially camera and image sharing)
- Keep UI simple and native-feeling

