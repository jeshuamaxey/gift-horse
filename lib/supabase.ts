import type { Database } from '@/types/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

let supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Handle localhost for emulators/simulators
// Android emulator: 127.0.0.1 -> 10.0.2.2 (special IP that maps to host)
// iOS simulator: localhost usually works, but we can also use the host IP
if (__DEV__ && supabaseUrl.includes('127.0.0.1')) {
  if (Platform.OS === 'android') {
    // Android emulator needs special IP to access host machine
    supabaseUrl = supabaseUrl.replace('127.0.0.1', '10.0.2.2');
  } else if (Platform.OS === 'ios') {
    // iOS simulator can use localhost, but if that doesn't work, 
    // you can use your machine's IP address instead
    // For now, we'll try localhost first (it usually works on iOS)
    // If it doesn't work, you can replace 127.0.0.1 with your actual IP (e.g., 192.168.x.x)
  }
  // For web, 127.0.0.1 works fine
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

