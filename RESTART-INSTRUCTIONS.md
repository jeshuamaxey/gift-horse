# How to Restart Expo to Pick Up .env Changes

## The Root Problem (FIXED!)

The original issue was that you had `app.json` (a static JSON file) which **cannot read `.env` files**.

✅ **Solution Applied:** 
- Installed `dotenv` package
- Converted `app.json` → `app.config.js` (JavaScript config that loads .env)
- Backed up original: `app.json.backup`

Now Expo can properly read your `.env` file!

## After Configuration Changes

When you change environment variables, just pressing "r" to reload **doesn't reload environment variables**.

## Solution: Full Restart

### Step 1: Stop the Dev Server

In your terminal where Expo is running:
- Press `Ctrl+C` to stop the server completely

### Step 2: Clear Expo Cache and Restart

Run this command:

```bash
npm start -- --clear
```

Or:

```bash
npx expo start --clear
```

The `--clear` flag clears the Metro bundler cache, which includes environment variables.

### Step 3: Reconnect Your Device

1. Wait for the QR code to appear
2. Scan it again with your physical device
3. You should now see: `[Supabase] Using URL: http://192.168.0.110:54321`

## Quick Reference

**Stop and restart with cache clear:**
```bash
# Press Ctrl+C first, then:
npm start -- --clear
```

**Or use these separate commands:**
```bash
# Clear cache
npx expo start --clear

# Or even more thorough:
rm -rf .expo
npm start
```

## Expected Log After Restart

You should see this log message (not the emulator one):

```
[Supabase] Environment variable loaded: http://192.168.0.110:54321
[Supabase] Using URL: http://192.168.0.110:54321
```

This confirms it's:
1. Loading the correct URL from your .env file
2. Using your local network IP for the physical device

## What Was Changed

- **Before:** `app.json` (static, can't read .env files) ❌
- **After:** `app.config.js` (dynamic, loads .env with dotenv) ✅
- **Installed:** `dotenv` package
- **Backup:** Your original config saved as `app.json.backup`

