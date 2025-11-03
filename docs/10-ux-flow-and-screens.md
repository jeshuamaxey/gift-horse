# UX Flow and Screens

## Navigation Architecture

### Primary Navigation Pattern
**Approach**: Bottom Tab Navigation for primary screens, Stack Navigation for detail screens

**Rationale**: 
- Quick access to core features (Add Gift, Recipients, Unassigned Ideas)
- Fast switching between main functions
- Detail/edit screens can be pushed on top as modals or stack screens

### Screen Hierarchy

```
App Root (_layout.tsx)
│
├── Onboarding (first launch only, skippable)
│   └── Pre-Login Onboarding
│
├── Auth Flow (if not authenticated)
│   ├── Login
│   └── Sign Up
│
└── Main App (if authenticated)
    │
    ├── Tab Navigator
    │   ├── Add Gift (index.tsx) [LANDING SCREEN]
    │   ├── Recipients List (recipients/index.tsx)
    │   └── Unassigned Ideas (unassigned.tsx)
    │
    ├── Stack Screens (pushed from tabs)
    │   ├── Recipient Detail (recipients/[id].tsx)
    │   ├── Gift Detail/Edit (gifts/[id].tsx)
    │   ├── Create/Edit Recipient (recipients/new.tsx, recipients/[id]/edit.tsx)
    │   ├── Occasions Management (occasions/index.tsx)
    │   └── Archive (archive.tsx)
    │
    └── Modal Screens
        ├── Add Occasion (occasions/new.tsx)
        ├── Edit Gift (gifts/[id]/edit.tsx)
        └── Settings (settings.tsx)
```

## Screen Inventory

### MVP Screens (Core Features)

#### 0. Pre-Login Onboarding Screen
**Route**: `/onboarding` (onboarding.tsx)  
**Purpose**: Introduce app benefits to first-time users before authentication  
**Priority**: First screen shown on app launch (if first time and not authenticated)  
**Display Logic**: Only shown once per installation (unless user logs out and returns)

**Features**:
- Skippable screen (can tap "Skip" at any time)
- Key benefits display (in priority order):
  1. **Primary Benefit**: "Capture gift ideas in seconds"
     - Visual: Quick capture illustration or animation
     - Description: Emphasize speed and simplicity
  2. **Secondary Benefit**: "Become an incredibly organised gift giver"
     - Visual: Organization/concept illustration
     - Description: Highlight person-centric organization
  3. **Tertiary Benefit**: "Set reminders so you never miss another birthday"
     - Visual: Calendar/reminder illustration
     - Description: Never forget important occasions
- Action buttons:
  - "Get Started" / "Sign Up" (navigates to Sign Up screen)
  - "Skip" / "I already have an account" (navigates to Login screen)
- Optional: Swipeable cards or carousel presentation
- Clean, minimal design focused on value proposition

**User Flow**:
1. First app launch → Onboarding screen appears
2. User sees three key benefits (swipe through or scroll)
3. User taps "Get Started" → Navigate to Sign Up
   OR taps "Skip" / "I already have an account" → Navigate to Login
4. Once completed or skipped, mark as shown (don't show again unless logged out)

**Note**: After login/signup, a post-login product tour can be shown (separate feature, outside core MVP)

---

#### 1. Add Gift Screen (Landing)
**Route**: `/` (index.tsx)  
**Purpose**: Primary entry point, quick gift idea capture  
**Priority**: Highest - this is the landing screen

**Features**:
- Capture method selector/quick actions:
  - 📷 Take Photo button
  - 📝 Quick Text Entry button
  - 📤 Handle shared images (from deep linking)
- If image shared: Auto-populate image, show form
- Minimal form:
  - Title field (required, auto-focus)
  - Recipient selector (optional, searchable dropdown)
  - Occasion selector (optional, shown if recipient selected)
  - Quick save button
  - Optional: "Add more details" expandable section (price, link, notes)
- Success feedback (toast/haptic) on save
- Navigate to saved gift or stay on screen for next entry

**User Flow**:
1. App opens → Land on Add Gift screen
2. User selects capture method OR receives shared image
3. Enter title (minimum)
4. Optionally select recipient and/or occasion
5. Tap Save
6. Idea saved, ready for next entry

---

#### 2. Recipients List Screen
**Route**: `/recipients` (recipients/index.tsx)  
**Purpose**: View all recipients, navigate to recipient's gift ideas

**Features**:
- List of all recipients (simple list or grid)
- Each item shows:
  - Profile display (emoji or initials in circle)
  - Name
  - Optional: Badge count of active gift ideas
- Add recipient button (top right or floating action button)
- Tap recipient → Navigate to Recipient Detail screen
- Swipe actions (if native feel supports):
  - Edit recipient

**User Flow**:
1. Navigate to Recipients tab
2. See list of all recipients
3. Tap recipient → See their gift ideas
4. Or tap Add → Create new recipient

---

#### 3. Recipient Detail Screen
**Route**: `/recipients/[id]` (recipients/[id].tsx)  
**Purpose**: View all gift ideas for a specific recipient, organized by occasions

**Features**:
- Header:
  - Recipient name
  - Profile display (emoji/initials)
  - Edit button
  - Optional: Birthday display if set (inc N weeks away)
- Gift ideas grouped by occasions:
  - Next upcoming occasion first (e.g., "Birthday - Dec 15")
  - Then other occasions in chronological order
  - Then "No specific occasion" group
- Within each group:
  - Sorted by most recently added (newest first)
  - Each gift idea card shows:
    - Title
    - Thumbnail if has image
    - State badge/indicator (idea, acquired, abandoned)
    - Optional: Price, occasion tag
- Tap gift idea → Navigate to Gift Detail screen
- Action buttons:
  - Add gift idea for this recipient (pre-populates recipient)
  - Edit recipient details
- Filter/state toggle (optional): Show all, hide gifted, etc.

**User Flow**:
1. Tap recipient from list
2. See all their gift ideas, grouped by upcoming occasions
3. Browse ideas, organized by relevance (next occasion first)
4. Tap idea to view/edit details
5. Or add new idea for this recipient

---

#### 4. Unassigned Ideas Screen
**Route**: `/unassigned` (unassigned.tsx)  
**Purpose**: View gift ideas not yet assigned to a recipient

**Features**:
- List of all gift ideas with `recipient_id = null`
- Each item shows:
  - Title
  - Thumbnail if has image
  - State indicator
  - "Assign to recipient" button/action
- Sorted by most recently added
- Tap idea → Navigate to Gift Detail screen
- Bulk assign action (optional for MVP): Select multiple, assign to recipient

**User Flow**:
1. Navigate to Unassigned Ideas tab
2. See all unassigned gift ideas
3. Tap idea to view/edit or assign to recipient
4. Assign ideas to recipients as needed

---

#### 5. Gift Detail/Edit Screen
**Route**: `/gifts/[id]` (gifts/[id].tsx)  
**Purpose**: View and edit gift idea details

**Features**:
- Full gift idea information:
  - Title (editable)
  - Image (if present, full-size, tap to view larger)
  - Recipient (editable, can change or remove)
  - Occasion (editable, shown if recipient set)
  - Price (editable)
  - Link (editable, opens in browser)
  - Notes (editable, longer text area)
  - State selector (idea, acquired, gifted, abandoned)
  - Created/updated timestamps (read-only)
- Actions:
  - Save changes
  - Delete gift idea (with confirmation)
  - Share gift idea (optional)
- Navigation:
  - Back to previous screen
  - If recipient assigned: Link to Recipient Detail screen

**User Flow**:
1. Tap gift idea from any list
2. View/edit full details
3. Update state, assign to recipient, add details
4. Save and return to previous screen

---

#### 6. Create/Edit Recipient Screen
**Route**: `/recipients/new` or `/recipients/[id]/edit`  
**Purpose**: Create new recipient or edit existing recipient

**Features**:
- Form fields:
  - Name (required, text input)
  - Birthday (optional, date picker)
  - Emoji selector (optional, emoji picker or text input)
- Actions:
  - Save recipient
  - Cancel/back
  - Delete recipient (if editing, with confirmation)
- If editing: Show recipient's gift ideas count (read-only)

**User Flow**:
1. Tap "Add Recipient" or "Edit" from Recipients List/Detail
2. Enter recipient name and optional details
3. Optionally set birthday and emoji
4. Save → Return to Recipients List

---

#### 7. Occasions Management Screen
**Route**: `/occasions` (occasions/index.tsx)  
**Purpose**: View and manage user-defined occasions

**Features**:
- List of all occasions (birthdays auto-included per recipient)
- Pick from popular occasions (Christmas, Diwali, research the top 10 gift giving occasions)
- User-defined occasions:
  - Name
  - Default date (if recurring)
  - Reminder days before
  - Recipients mapped to this occasion
- Add occasion button
- Edit/delete occasions
- Map recipients to occasions (from this screen or from recipient detail)

**User Flow**:
1. Navigate to Occasions (from settings or side menu)
2. View all occasions
3. Add new occasion or edit existing
4. Map recipients to occasions

**Note**: This might be accessible from Settings or as a modal. Can be simplified for MVP.

---

#### 8. Archive Screen (Secondary)
**Route**: `/archive` (archive.tsx)  
**Purpose**: View gifted items (archived gift ideas)

**Features**:
- List of all gift ideas with `state = 'gifted'`
- Grouped by recipient (optional)
- Sorted by date gifted or date created
- Read-only view (no editing)
- Optional: Filter by date range or recipient

**User Flow**:
1. Navigate to Archive (less accessible - from settings or side menu)
2. Browse past gifted items
3. View history of gifts given

---

### Supporting Screens

#### 11. Pre-Login Onboarding Screen
**Note**: Already listed as Screen #1 in MVP screens above. See details there.

#### 9. Authentication Screens
**Route**: `/auth/login` and `/auth/signup`  
**Purpose**: User authentication

**Features**:
- Login: Email/password
- Sign up: Email/password, name
- Password reset (future)
- Social auth (optional, future)

---

#### 10. Settings Screen
**Route**: `/settings` (settings.tsx)  
**Purpose**: App settings and account management

**Features**:
- Account info
- Notification preferences
- Link to Occasions management
- Link to Archive
- Logout
- About/version info

---

## User Flows

### Flow 0: First-Time App Launch
**Goal**: Introduce new users to app benefits before signup

```
1. User downloads and opens app for first time
2. Onboarding screen appears (if not authenticated and first launch)
3. User sees three key benefits:
   - Capture gift ideas in seconds
   - Become an incredibly organised gift giver
   - Set reminders so you never miss another birthday
4. User can:
   - Swipe/scroll through benefits
   - Tap "Get Started" → Navigate to Sign Up
   - Tap "Skip" or "I already have an account" → Navigate to Login
5. Once completed, onboarding is marked as seen
6. Subsequent launches skip onboarding (unless user logs out)
```

**Post-Login Tour**: After successful signup/login, a separate product tour can be shown to guide users through the app interface (feature outside core MVP, to be implemented later).

---

### Flow 1: Quick Capture (Primary Flow)
**Goal**: Capture a gift idea in < 10 seconds

```
1. App opens → Add Gift screen (landing)
2. User taps "Take Photo" OR shares image from another app
   - If photo: Camera opens → Capture → Return to Add Gift with image
   - If shared: App opens directly with image in form
3. Title auto-focus, user types brief title
4. (Optional) Tap recipient selector, choose recipient
5. (Optional) If recipient selected, choose occasion
6. Tap Save
7. Success feedback, form clears or stays open for next entry
```

**Alternative**: Text-only entry
```
1. App opens → Add Gift screen
2. User taps "Quick Entry" or just starts typing in title field
3. Enter title
4. Save (recipient can be assigned later)
```

---

### Flow 2: Browse Recipient's Ideas
**Goal**: See all gift ideas for a person when considering what to give

```
1. From Add Gift screen → Tap Recipients tab
2. See list of recipients
3. Tap recipient (e.g., "Sarah")
4. See Recipient Detail screen:
   - Ideas grouped by next upcoming occasion first
   - "Birthday - Dec 15" section shows birthday ideas
   - "Christmas" section shows Christmas ideas
   - "No occasion" section shows general ideas
   - Within each section, newest ideas first
5. Browse ideas, tap one to see full details
6. Update state (e.g., mark as "acquired") as needed
```

---

### Flow 3: Assign Unassigned Ideas
**Goal**: Organize ideas that were captured without a recipient

```
1. From Add Gift screen → Tap Unassigned Ideas tab
2. See list of unassigned gift ideas
3. Tap an idea
4. In Gift Detail screen, tap "Assign to Recipient"
5. Select recipient (and optionally occasion)
6. Save → Idea now appears in recipient's detail view
```

---

### Flow 4: Set Up Recipient with Birthday
**Goal**: Add a new recipient and configure their birthday for reminders

```
1. Recipients List → Tap "Add Recipient"
2. Enter name (required)
3. Optionally set birthday (date picker)
4. Optionally choose emoji
5. Save
6. If birthday set, reminder will be scheduled automatically
7. Recipient appears in list
```

---

### Flow 5: Create Occasion and Map Recipients
**Goal**: Set up a recurring occasion like Christmas and map recipients

```
1. Settings → Occasions (or direct navigation)
2. Tap "Add Occasion"
3. Enter name: "Christmas"
4. Set default date: Dec 25
5. Set reminder: 30 days before
6. Save occasion
7. Map recipients: Select which recipients receive gifts for this occasion
8. Save mappings
```

---

## Navigation Patterns

### Tab Navigation (Bottom)
- **Tab 1**: Add Gift (home icon) - Landing screen
- **Tab 2**: Recipients (people icon)
- **Tab 3**: Unassigned (list/idea icon)

### Stack Navigation (Push on top)
- Recipient Detail
- Gift Detail
- Create/Edit Recipient
- Create/Edit Occasion

### Modal Navigation (Optional)
- Gift Edit (full screen modal)
- Settings (drawer or modal)
- Archive (full screen modal)

---

## File Structure Recommendations

Based on Expo Router file-based routing:

```
app/
├── _layout.tsx                    # Root layout with auth check
├── onboarding.tsx                 # Pre-login onboarding (first launch)
├── index.tsx                      # Add Gift screen (landing)
│
├── auth/
│   ├── _layout.tsx               # Auth layout
│   ├── login.tsx
│   └── signup.tsx
│
├── recipients/
│   ├── _layout.tsx               # Recipients stack layout
│   ├── index.tsx                 # Recipients List
│   ├── new.tsx                   # Create Recipient
│   └── [id].tsx                  # Recipient Detail
│
├── gifts/
│   ├── _layout.tsx               # Gifts stack layout
│   └── [id].tsx                  # Gift Detail/Edit
│
├── unassigned.tsx                # Unassigned Ideas tab
├── occasions/
│   ├── index.tsx                 # Occasions Management
│   └── new.tsx                   # Create Occasion
├── archive.tsx                   # Archive (secondary)
└── settings.tsx                  # Settings
```

---

## Screen Priorities for MVP

### Phase 1 (Core MVP)
1. ✅ Pre-Login Onboarding Screen (first user experience)
2. ✅ Add Gift Screen (landing)
3. ✅ Recipients List
4. ✅ Recipient Detail
5. ✅ Gift Detail/Edit
6. ✅ Create/Edit Recipient
7. ✅ Unassigned Ideas

### Phase 2 (Complete MVP)
8. ✅ Authentication Screens (Login/Sign Up)
9. ✅ Occasions Management (can be simplified)
10. ✅ Archive View

### Phase 3 (Polish)
11. Settings
12. Enhanced image handling
13. Search/filter enhancements
14. Post-login product tour (outside core MVP, future enhancement)

---

## Key Interactions

### Image Sharing (Deep Link)
- User shares image from Photos/Camera app
- App opens with shared image
- Add Gift screen shows image pre-populated
- User adds title and optionally recipient
- Saves gift idea

### State Updates
- Swipe gesture on gift idea card to change state (optional)
- Or tap gift idea → Gift Detail → Change state → Save
- Clear visual feedback for state changes

### Quick Actions
- Long press on recipient → Quick menu (Edit, Delete, View Ideas)
- Long press on gift idea → Quick menu (Edit, Delete, Change State)

---

## Accessibility Considerations

- Screen reader support for all interactive elements
- Large touch targets (minimum 44x44 points)
- Clear visual hierarchy and state indicators
- High contrast for text and icons
- Voice Control support (iOS)

