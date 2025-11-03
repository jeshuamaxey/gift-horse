# Resetting Emulators for Clean Testing

This guide explains how to completely remove the app and all its data from Android and iOS emulators to get a fresh install.

## Android Emulator

### Method 1: Uninstall via ADB (Recommended)
```bash
# Connect to your emulator
adb devices

# Uninstall the app (replace with your package name if different)
adb uninstall com.gifthorse.app

# Or find the package name first
adb shell pm list packages | grep gift

# Clear all app data (if uninstall didn't work)
adb shell pm clear com.gifthorse.app
```

### Method 2: Uninstall from Emulator
1. Open the emulator
2. Long press on the app icon
3. Drag to "Uninstall" or select "Uninstall" from the menu

### Method 3: Wipe Data (Complete Reset)
```bash
# Wipe all data from the emulator (this resets the entire emulator)
emulator -avd <AVD_NAME> -wipe-data
```

### Method 4: Clear App Data via Settings
1. Open Settings on the emulator
2. Go to Apps → Gift Horse (or your app name)
3. Tap "Storage"
4. Tap "Clear Data" and "Clear Cache"
5. Or tap "Uninstall"

## iOS Simulator

### Method 1: Reset Simulator (Complete Reset)
```bash
# List all simulators
xcrun simctl list devices

# Erase all content and settings (complete reset)
xcrun simctl erase all

# Or reset a specific simulator
xcrun simctl erase <DEVICE_UDID>
```

### Method 2: Uninstall App from Simulator
1. Long press the app icon on the simulator home screen
2. Tap the "X" that appears
3. Confirm deletion

### Method 3: Reset via Simulator Menu
1. In iOS Simulator, go to: **Device → Erase All Content and Settings...**
2. Confirm the reset

### Method 4: Delete App Data via Finder
```bash
# Find and delete the app data directory
# Path: ~/Library/Developer/CoreSimulator/Devices/[DEVICE_UDID]/data/Containers/Data/Application/[APP_UDID]

# Or use this command to find it:
find ~/Library/Developer/CoreSimulator/Devices -name "gift-horse" -type d
```

## Quick Reset Commands

### Android - Quick Uninstall
```bash
adb uninstall com.gifthorse.app
```

### iOS - Quick Reset
```bash
xcrun simctl erase all
```

## After Resetting

1. **Restart Expo dev server**:
   ```bash
   npm start
   ```

2. **Rebuild the app** (if needed):
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

3. **Verify clean state**:
   - App should show onboarding screen (first launch)
   - No previous login sessions
   - No cached data

## Testing Different States

### Test First-Time User Flow
1. Reset emulator (see above)
2. Launch app
3. Should see onboarding → can skip or complete → signup/login

### Test Logged-Out User (After Logout)
1. Log in to the app
2. Go to Settings tab
3. Tap "Sign Out"
4. Should see login screen (onboarding already seen)

### Test Onboarding Again (After Logout)
1. Log out (Settings → Sign Out)
2. The logout clears the onboarding flag, so next launch will show onboarding again
3. Or manually clear: `adb shell pm clear com.gifthorse.app` (Android) or reset simulator (iOS)

## Notes

- **AsyncStorage**: Cleared when app is uninstalled
- **Supabase Session**: Stored in AsyncStorage, cleared on uninstall
- **Onboarding Flag**: Stored in AsyncStorage, cleared on logout (by design) or uninstall
- **Profile Data**: Stored in Supabase database, persists across app reinstalls (unless you delete the user)

