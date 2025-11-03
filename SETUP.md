# Setup Guide

## Prerequisites

- Node.js installed
- npm or yarn
- Expo CLI (via `npx expo`)
- Supabase CLI (for local development)

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. For local development with Supabase:
   - Start Supabase locally: `supabase start`
   - Get your local Supabase URL and anon key from the output
   - Add them to `.env`:
     ```
     EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
     ```
   
   **Important for Emulators/Simulators:**
   - The code automatically handles `127.0.0.1` for different platforms:
     - **Android Emulator**: Automatically uses `10.0.2.2` (maps to host's localhost)
     - **iOS Simulator**: Uses `127.0.0.1` (usually works, but if not, use your machine's IP)
     - **Web**: Uses `127.0.0.1` directly
   
   - If iOS simulator doesn't work with `127.0.0.1`, find your machine's IP address:
     ```bash
     # macOS/Linux
     ifconfig | grep "inet " | grep -v 127.0.0.1
     
     # Or on macOS
     ipconfig getifaddr en0
     ```
     Then use: `http://YOUR_IP_ADDRESS:54321` in your `.env` file

3. For production/remote Supabase:
   - Get your Supabase project URL and anon key from your Supabase dashboard
   - Add them to `.env`

## Database Setup

1. Make sure Supabase is running locally: `supabase start`

2. Run migrations (Phase 0 - will be implemented next):
   ```bash
   supabase migration up
   ```

3. Verify your database schema matches the data model in `docs/08-data-model.md`

## Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npm start
   ```

3. Run on iOS simulator:
   ```bash
   npm run ios
   ```

4. Run on Android emulator:
   ```bash
   npm run android
   ```

## Phase 1 Status

✅ Dependencies installed
✅ Supabase client setup
✅ Auth context/provider
✅ Authentication screens (login/signup)
✅ Onboarding screen
✅ Navigation structure
✅ Root layout with auth flow

**Next Steps:**
- Set up database schema (Phase 0)
- Implement profile creation on signup
- Test authentication flow
- Begin Phase 2 implementation

