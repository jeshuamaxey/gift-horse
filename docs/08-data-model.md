# Data Model (High-Level)

This is a high-level overview of the data structure. Actual schema will be defined during implementation.

## Core Entities

### Authentication & User Profiles

**Supabase Auth (`auth.users`)**:
- Handles user authentication (email, password, etc.)
- Managed by Supabase Auth system

**Profiles (Public Schema)**:
- `id` (UUID, FK to `auth.users.id` - one-to-one relationship)
- Additional user profile fields (as needed)
- Stored in `public.profiles` table
- Links app user records to Supabase Auth users

**Key Point**: App users are authenticated users who create and manage their own recipient lists.

### Recipients (People)
**Important**: Recipients are **NOT** app users. They are simply records created by app users for people they want to give gifts to.

**Fields**:
- `id` (UUID)
- `user_id` (FK to Profiles, references the app user who created this recipient)
- `name` (text)
- `birthday` (date, nullable)
- `emoji` (text, nullable - single emoji character, replaces initials when set)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Critical Architecture Notes**:
- **Not portable**: Recipients are completely user-specific. They exist only in the context of the user who created them.
- **Duplication expected**: The same person can exist as multiple recipient records. For example:
  - User A creates recipient "Sarah" (their girlfriend)
  - User B (Sarah's mom) creates recipient "Sarah" (her daughter)
  - These are two separate records, and that's correct behavior
- **No global database**: There is no attempt to deduplicate or create a unified view of recipients across users
- **Privacy by design**: Each user's recipients are isolated to their own data

**Display**:
- Profile display: Uses emoji if set, otherwise shows initials derived from name
- No image uploads for recipient profiles

### Occasions
**Fields**:
- `id` (UUID)
- `user_id` (FK to Profiles, references the app user who created this occasion)
- `name` (text, e.g., "Christmas", "Hanukkah")
- `default_date` (date, nullable - for recurring occasions)
- `reminder_days_before` (integer, nullable)
- `created_at` (timestamp)

**Notes**:
- User-defined occasions (specific to each user)
- Can be mapped to multiple recipients (within the same user's recipients)

### Recipient-Occasion Mapping
**Fields**:
- `id` (UUID)
- `recipient_id` (FK to Recipients)
- `occasion_id` (FK to Occasions)
- `created_at` (timestamp)

**Purpose**: Indicates which recipients receive gifts for which occasions (all within the same user's data)

### Gift Ideas
**Fields**:
- `id` (UUID)
- `user_id` (FK to Profiles, references the app user who created this gift idea)
- `recipient_id` (FK to Recipients, nullable - can be unassigned, assigned to recipient, or recipient+occasion)
- `title` (text, required)
- `price` (decimal, nullable)
- `link` (text, nullable - URL)
- `notes` (text, nullable - description)
- `image_url` (text, nullable - Supabase Storage reference)
- `state` (enum: 'idea', 'acquired', 'gifted', 'abandoned')
- `occasion_id` (FK to Occasions, nullable - which occasion this gift is for, requires person_id)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**States**:
- `idea`: Default state for new gifts
- `acquired`: Bought but not yet given
- `gifted`: Already given (archived)
- `abandoned`: No longer considering

**Association Patterns**:
- **Unassigned**: `recipient_id` = null, `occasion_id` = null (just a general idea)
- **Recipient only**: `recipient_id` set, `occasion_id` = null (gift idea for a recipient, no specific occasion)
- **Recipient + Occasion**: `recipient_id` set, `occasion_id` set (gift idea for recipient's specific occasion)

**Notes**:
- Title is minimum required field
- All other fields optional
- `occasion_id` can only be set if `recipient_id` is also set
- Gift ideas are user-specific and can only reference recipients belonging to that user

## Storage

### Images
- Stored in Supabase Storage
- Only one type:
  1. Gift idea images (product photos, etc.)
- Note: Person profiles use initials or emoji, no image storage needed

## Relationships

```
Supabase Auth (auth.users)
  └── Profile (1 to 1, public.profiles)

Profile (App User)
  ├── Recipients (1 to many, user-specific)
  ├── Occasions (1 to many, user-specific)
  └── Gift Ideas (1 to many, user-specific)

Recipient (NOT an app user - just a record)
  ├── Gift Ideas (1 to many, only for this recipient's user)
  └── Recipient-Occasion Mappings (many to many with Occasions, within same user)

Occasion (user-specific)
  ├── Recipient-Occasion Mappings (many to many with Recipients, within same user)
  └── Gift Ideas (1 to many, optional)

Gift Idea (user-specific)
  ├── Recipient (many to 1, optional, must belong to same user)
  └── Occasion (many to 1, optional, requires recipient_id, must belong to same user)
```

**Isolation**: All data (recipients, occasions, gift ideas) is scoped to the user who created it. No cross-user data access.

## Query Patterns

### Common Queries
1. **All recipients for user**: `SELECT * FROM recipients WHERE user_id = ?` (always scoped to current user)
2. **All gifts for recipient**: `SELECT * FROM gift_ideas WHERE recipient_id = ? AND user_id = ? AND state != 'gifted'` (user_id check ensures data isolation)
3. **Unassigned gift ideas**: `SELECT * FROM gift_ideas WHERE recipient_id IS NULL AND user_id = ? AND state != 'gifted'`
4. **Upcoming occasions for recipient**: Join recipient-occasion mappings with occasions where user_id = ?, filter by date
5. **Gifts grouped by occasion for recipient**: Group gifts by occasion_id where recipient_id = ? AND user_id = ?, order by occasion date, then by created_at
6. **Gifted items (archive)**: `SELECT * FROM gift_ideas WHERE user_id = ? AND state = 'gifted'`

**Security Note**: All queries should include `user_id = current_user_id` filters to ensure data isolation and prevent cross-user data access.

## Indexes (To Consider)
- `profiles.id` - link to auth.users
- `recipients.user_id` - fast recipient lookup (user isolation)
- `recipients.user_id, name` - composite index for user's recipient search
- `gift_ideas.user_id` - user isolation (critical for security)
- `gift_ideas.user_id, recipient_id` - fast gift lookup by recipient (user-scoped)
- `gift_ideas.state` - filtering by state
- `gift_ideas.created_at` - sorting by recency
- `recipient_occasion_mappings.recipient_id` - occasion lookups
- `occasions.user_id` - user-scoped occasion lookup

**Security**: All indexes should support efficient user-scoped queries to ensure Row Level Security (RLS) policies can be enforced.

## Security & Row Level Security (RLS)

### Data Isolation Requirements
All user data must be completely isolated:
- Users can only see their own recipients, occasions, and gift ideas
- No cross-user data access possible
- Duplicate recipients across users are expected and should not be prevented

### Row Level Security Policies (Supabase)

**Profiles Table**:
- Users can read/update only their own profile

**Recipients Table**:
- Users can only SELECT/INSERT/UPDATE/DELETE recipients where `user_id = auth.uid()`
- Foreign key constraints ensure recipients belong to the correct user

**Occasions Table**:
- Users can only SELECT/INSERT/UPDATE/DELETE occasions where `user_id = auth.uid()`

**Gift Ideas Table**:
- Users can only SELECT/INSERT/UPDATE/DELETE gift ideas where `user_id = auth.uid()`
- Foreign key constraints ensure gift ideas can only reference recipients/occasions belonging to the same user

**Recipient-Occasion Mappings Table**:
- Users can only access mappings for their own recipients and occasions
- Enforced via foreign key relationships and RLS policies on related tables

**Storage (Supabase Storage)**:
- Storage buckets should enforce user-scoped access
- Users can only upload/access images for their own gift ideas

