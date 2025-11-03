# User Experience Principles

## Core Principles

### 1. Speed of Capture
**Principle**: Minimize friction from "I have an idea" to "it's saved"

**Implementation**:
- Landing screen is "Add Gift" screen
- Multiple capture methods (image share, photo, text)
- Person assignment optional during capture (can be assigned later)
- Minimum required information: title only
- Optional details can be added later
- Optimize for one-handed use

**Target**: < 10 seconds from app open to idea saved

### 2. Person-Centric Organization
**Principle**: All ideas for a person in one place, organized for quick decision-making

**Implementation**:
- Simple person list → tap person → see all their ideas
- Ideas grouped by next upcoming occasion
- Within groups, sorted by most recently added
- Clear visual separation of state (purchased vs ideas)

### 3. Simplicity Over Features
**Principle**: Do a few things exceptionally well rather than many things poorly

**Exclusions**:
- No gift suggestions
- No social features
- No wishlist sharing
- No complex budget tracking (for MVP)
- No advanced search or filtering

**Focus**: Quick capture + person-centric browsing

## Navigation Structure

### Primary Flows

1. **Capture Flow** (Primary)
   - App opens → Add Gift screen
   - Select capture method
   - Optionally assign to person (and occasion)
   - Save (minimal info required - title only)

2. **Browse Flow** (Secondary)
   - App opens → Add Gift screen
   - Navigate to People list
   - Tap person → View their gift ideas (grouped by occasions, sorted by recency)
   - Or view unassigned ideas (ideas not yet assigned to anyone)
   - Update states as needed
   - Assign unassigned ideas to people/occasions as needed

### Screen Hierarchy

```
App Root
├── Add Gift Screen (Landing)
├── People List
│   └── Person Gift Ideas View
│       ├── Grouped by occasions
│       └── Sorted by recency
├── Unassigned Ideas View (ideas not yet assigned to a person)
└── Settings/Archive (Less accessible)
```

## Interaction Patterns

### Gift State Updates
- Manual updates only
- Simple toggle or action button
- No automatic state transitions
- Clear visual indicators for each state

### Image Handling
- Quick capture from camera
- Share from other apps (deep link) - person assignment optional before save
- View full-size images
- Easy to attach/detach images

### Occasion Reminders
- Local notifications (1 month before birthdays)
- Customizable for user-defined occasions
- Non-intrusive but helpful

## Visual Design Philosophy

- **Native Feel**: Should feel at home on iOS and Android
- **Clean & Simple**: No clutter, focus on content
- **Quick Recognition**: Person profile displays (initials or emoji) for fast identification
- **State Clarity**: Visual distinction between gift states
- **Occasion Grouping**: Clear visual separation of occasion groups

## Accessibility

- Support system accessibility features
- Large touch targets
- Clear typography and contrast
- Screen reader support

