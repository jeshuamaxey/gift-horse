# Physical Device Setup Guide

This guide explains how to test your app on a physical Android or iOS device while running Supabase locally on your laptop.

## The Problem

When developing with a local Supabase instance, you'll encounter network connection issues when testing on physical devices because:

- **Emulators** can use special IPs (`10.0.2.2` for Android, `127.0.0.1` for iOS)
- **Physical devices** need to connect to your laptop's actual local network IP address (e.g., `192.168.0.110`)

If you try to use `localhost` or `127.0.0.1` on a physical device, it will try to connect to the phone itself, not your laptop.

## Solution Overview

To fix this, you need to:

1. Find your laptop's local network IP address
2. Configure the app to use that IP address
3. Ensure both devices are on the same Wi-Fi network
4. Make sure your firewall allows connections

## Quick Setup

### Step 1: Get Your Local IP Address

Run the helper script:

```bash
npm run get-ip
```

This script will:
- Detect your local network IP address
- Automatically create/update your `.env` file with the correct configuration
- Display troubleshooting tips

**Example output:**
```
🔍 Detecting your local network IP address...

📡 Found network interfaces:
   1. en0: 192.168.0.110

✅ Primary IP address: 192.168.0.110

✨ .env file has been created/updated automatically!
```

### Step 2: Verify Your Configuration

The script creates a `.env` file with content like:

```env
EXPO_PUBLIC_SUPABASE_URL=http://192.168.0.110:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** If your laptop's IP changes (e.g., you connect to a different Wi-Fi network), you need to run `npm run get-ip` again.

### Step 3: Start Supabase

Make sure your local Supabase instance is running:

```bash
npx supabase start
```

Verify it's accessible by visiting: `http://localhost:54323` (Supabase Studio)

### Step 4: Start Expo Dev Server

Restart your Expo development server:

```bash
npm start
```

### Step 5: Connect Your Physical Device

1. Ensure your phone and laptop are on the **same Wi-Fi network**
2. Open the Expo Go app on your phone
3. Scan the QR code from the terminal

The app should now connect successfully to your local Supabase instance!

## Manual Setup (Alternative)

If you prefer to set up manually or the script doesn't work:

### Find Your IP Address Manually

**On macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows:**
```bash
ipconfig
```

Look for your Wi-Fi adapter's IPv4 address (usually starts with `192.168.x.x` or `10.x.x.x`).

### Create .env File

Create a file named `.env` in your project root:

```env
# Replace YOUR_IP with your actual local IP (e.g., 192.168.0.110)
EXPO_PUBLIC_SUPABASE_URL=http://YOUR_IP:54321

# Get your key by running: npx supabase status
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
```

## How It Works

The app's Supabase client (`lib/supabase.ts`) automatically detects the environment:

- **Android Emulator:** Remaps `127.0.0.1` → `10.0.2.2`
- **iOS Simulator:** Uses `127.0.0.1` as-is
- **Physical Devices:** Uses the IP from your `.env` file (no remapping)
- **Web:** Uses `127.0.0.1` as-is

You'll see logs in your console indicating which configuration is being used:

```
[Supabase] Using URL: http://192.168.0.110:54321
```

## Different Configurations for Different Environments

You might want to test on both emulators and physical devices. Here's how to manage that:

### Option 1: Use Separate .env Files (Recommended)

Create multiple environment files:

```
.env.emulator      # For emulators (uses 127.0.0.1)
.env.physical      # For physical devices (uses your local IP)
.env               # Active configuration
```

Copy the appropriate file to `.env` when switching:

```bash
# For emulator testing
cp .env.emulator .env

# For physical device testing
cp .env.physical .env
npm run get-ip  # Updates with current IP
```

### Option 2: Quick Toggle Script

Add to your `package.json`:

```json
"scripts": {
  "use-emulator": "echo 'EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321' > .env",
  "use-physical": "npm run get-ip"
}
```

## Troubleshooting

### Error: "Network request failed"

**Symptoms:** Login fails with a network error on physical device

**Solutions:**

1. **Check Wi-Fi:** Ensure both laptop and phone are on the same Wi-Fi network
   - Turn off mobile data on your phone
   - Verify both devices show the same network name

2. **Verify IP Address:**
   ```bash
   npm run get-ip
   ```
   If your IP changed, the `.env` file will be updated automatically

3. **Check Supabase is Running:**
   ```bash
   npx supabase status
   ```
   Should show all services as running

4. **Test Connection from Phone:**
   Open your phone's browser and visit: `http://YOUR_IP:54321`
   (Replace YOUR_IP with your laptop's IP)
   
   - If you see a Supabase response → Good!
   - If you get "Can't connect" → Network/firewall issue

5. **Check Firewall:**
   Your laptop's firewall might be blocking connections. Temporarily allow connections on port 54321.
   
   **macOS:**
   System Preferences → Security & Privacy → Firewall → Firewall Options → Allow incoming connections for Supabase

6. **Restart Everything:**
   ```bash
   # Stop Supabase
   npx supabase stop
   
   # Start Supabase
   npx supabase start
   
   # Restart Expo (press 'r' in terminal or quit and restart)
   ```

### IP Address Keeps Changing

If your IP address changes frequently:

- **Home Network:** Set a static IP in your router settings
- **Office/Public Wi-Fi:** You may need to run `npm run get-ip` each time you connect
- **Consider using a DNS service** like mDNS (Bonjour) if available on your network

### Still Not Working?

Try these debugging steps:

1. **Check Console Logs:**
   Look for `[Supabase]` logs in your terminal to see which URL is being used

2. **Test API Directly:**
   From your laptop's browser, visit: `http://localhost:54321`
   From your phone's browser, visit: `http://YOUR_IP:54321`
   Both should show similar Supabase responses

3. **Verify Environment Variables:**
   Add this to your app temporarily to debug:
   ```typescript
   console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
   ```

4. **Network Inspection:**
   Use React Native Debugger or Flipper to inspect network requests and see exactly what URL is being used

## Production Considerations

**Important:** This guide is for local development only!

When deploying to production:

- Use your hosted Supabase project URL (e.g., `https://your-project.supabase.co`)
- Never commit your `.env` file to version control (it's in `.gitignore`)
- Use different environment variables for development vs. production

## Summary

**For Physical Device Testing:**

1. Run `npm run get-ip` to auto-configure your `.env`
2. Ensure both devices are on the same Wi-Fi
3. Start Supabase: `npx supabase start`
4. Start Expo: `npm start`
5. Scan QR code with your phone

**For Emulator Testing:**

1. Set `.env` to use `http://127.0.0.1:54321`
2. Or simply don't have a `.env` file (it will auto-remap)

---

**Questions or Issues?** Check the [troubleshooting section](#troubleshooting) or see `docs/12-troubleshooting.md` for more help.

