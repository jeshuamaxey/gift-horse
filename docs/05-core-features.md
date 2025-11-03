# Core Features

## MVP Features (Must Have)

### 1. Quick Gift Idea Capture
**Goal**: Minimize friction from idea to stored

**Supported Capture Methods**:
- **Image sharing from other apps**: Share image → app opens → optionally assign person → save gift idea
- **Photo capture**: Take photo in-app → save as gift idea
- **Quick text entry**: Minimal form with title field

**Required Information**:
- Title (minimum required)

**Optional Information** (can add later):
- Price
- Link/URL to product page
- Notes/description
- Image upload

**User Flow**: Landing screen should be the "Add Gift" screen for maximum accessibility

### 2. Person Management
**Simple Identification**:
- People identified by name only
- No grouping or relationship tags needed
- User implicitly knows relationships

**Person List View**:
- Simple list of all people
- Shows name and profile display (initials or optional emoji)
- Tap to view that person's gift ideas
- Users can optionally assign an emoji to each person (rendered instead of initials)

### 3. Gift Ideas Organization
**Purpose**: Ideas can exist independently or be associated with people and occasions

**Gift Idea Associations**:
- **No association**: Just a general idea (not yet assigned to anyone)
- **Person only**: Associated with a person but no specific occasion
- **Person + Occasion**: Associated with a person for a specific occasion (e.g., "for my girlfriend for Christmas")

**Person Gift Ideas View**:
When viewing a specific person's ideas:
1. **Grouped by upcoming occasions**: Ideas for the next occurring occasion shown first
   - If birthday is before Christmas → birthday ideas first
2. **Within groups, sorted by recency**: Most recently added ideas appear first

**Gift States**:
- Idea (default)
- Acquired (bought but not yet gifted)
- Gifted (archived/hidden from main view)
- Abandoned (no longer considering)

**State Management**: Manual updates only (no automatic state changes)

### 4. Occasion Management
**Person Occasions**:
- Birthday (per recipient, date stored)
- Other occasions: User-defined occasions (e.g., Christmas, Hanukkah, etc.)
- Mapping: Recipients can be mapped to occasions (e.g., "Buy for this person at Christmas")

**Occasion Reminders**:
- Birthday reminders: 1 month before
- Occasion reminders: Customizable timing for user-defined occasions

### 5. Image Upload
**Purpose**: Essential for MVP, especially for in-store capture
- Users can take photos of items they see in stores
- Images can be attached to gift ideas
- Supports image sharing from other apps

## Archive/History (Secondary Feature)

- Gifted items are archived and hidden from main view
- Archive view should exist but be less accessible (not core feature)
- Allows users to see past gift history if needed

