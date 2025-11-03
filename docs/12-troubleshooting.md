# Troubleshooting Guide

## Network Connection Issues

### "Network request failed" when connecting to local Supabase

**Problem**: App can't connect to local Supabase instance when running on emulator/simulator.

**Solution**: The app automatically handles different platforms:

- **Android Emulator**: Automatically converts `127.0.0.1` to `10.0.2.2` (special IP that maps to host machine)
- **iOS Simulator**: Uses `127.0.0.1` (usually works, but may need your machine's IP)
- **Web**: Uses `127.0.0.1` directly

**If iOS Simulator still doesn't work:**

1. Find your machine's IP address:
   ```bash
   # macOS
   ipconfig getifaddr en0
   
   # Or check all interfaces
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. Update your `.env` file to use your IP instead of `127.0.0.1`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=http://192.168.1.XXX:54321
   ```

3. Make sure your Mac's firewall allows connections on port 54321

4. Restart the Expo dev server after changing the `.env` file

### Testing if Supabase is accessible

1. **Check Supabase is running:**
   ```bash
   supabase status
   ```

2. **Test from your machine:**
   ```bash
   curl http://127.0.0.1:54321/rest/v1/
   ```

3. **Test from Android emulator** (if you have adb):
   ```bash
   adb shell
   curl http://10.0.2.2:54321/rest/v1/
   ```

## Common Issues

### Environment Variables Not Loading

- Make sure `.env` file is in the project root
- Restart Expo dev server after changing `.env`
- Check that variables start with `EXPO_PUBLIC_`
- For iOS, you may need to rebuild: `npx expo run:ios`

### Database Connection Errors

- Verify Supabase is running: `supabase status`
- Check migrations are applied: `supabase migration list`
- Verify RLS policies are set up correctly

### Authentication Issues

- Check that profiles table exists and has RLS policies
- Verify the trigger for creating profiles on signup is working
- Check Supabase logs: `supabase logs`

