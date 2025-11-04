import type { Database } from '@/types/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

let supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (__DEV__) {
  console.log('[Supabase] Environment variable loaded:', supabaseUrl);
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// NETWORK CONFIGURATION FOR LOCAL DEVELOPMENT
// ============================================
// This handles connecting to your local Supabase instance from different environments:
//
// 1. PHYSICAL DEVICES (phones/tablets):
//    - Must use your laptop's local network IP (e.g., 192.168.0.110:54321)
//    - Set EXPO_PUBLIC_SUPABASE_URL in .env to: http://YOUR_LOCAL_IP:54321
//    - Both laptop and device must be on the same Wi-Fi network
//
// 2. EMULATORS:
//    - Android Emulator: Uses 10.0.2.2 as special IP to reach host machine
//    - iOS Simulator: Can use 127.0.0.1 (localhost)
//
// 3. WEB: 127.0.0.1 works fine

if (__DEV__ && supabaseUrl.includes('127.0.0.1')) {
  // Only remap localhost for emulators
  // Physical devices MUST use actual local IP (e.g., 192.168.0.110)
  if (Platform.OS === 'android') {
    // Android emulator needs special IP to access host machine
    supabaseUrl = supabaseUrl.replace('127.0.0.1', '10.0.2.2');
    console.log('[Supabase] Android Emulator detected - Using 10.0.2.2');
  } else if (Platform.OS === 'ios') {
    // iOS simulator can use localhost
    console.log('[Supabase] iOS Simulator detected - Using 127.0.0.1');
  }
} else if (__DEV__) {
  // Physical device or custom IP
  console.log(`[Supabase] Using URL: ${supabaseUrl}`);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

