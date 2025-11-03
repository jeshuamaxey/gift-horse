import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const queryClient = new QueryClient();

const ONBOARDING_KEY = '@onboarding_seen';

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem(ONBOARDING_KEY);
      setHasSeenOnboarding(seen === 'true');
      setHasCheckedOnboarding(true);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loading || !hasCheckedOnboarding) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboarding = segments[0] === 'onboarding';

    // Re-check onboarding status when navigating from onboarding
    if (inAuthGroup && !hasSeenOnboarding) {
      AsyncStorage.getItem(ONBOARDING_KEY).then((seen) => {
        if (seen === 'true') {
          setHasSeenOnboarding(true);
        }
      });
    }

    if (!session) {
      // Not authenticated
      if (!hasSeenOnboarding && !inOnboarding && !inAuthGroup) {
        // Show onboarding if not seen and not already on onboarding or auth
        router.replace('/onboarding');
      } else if (hasSeenOnboarding && !inAuthGroup && !inOnboarding) {
        // Show login if onboarding seen and not on auth/onboarding screens
        router.replace('/auth/login');
      }
      // If already on auth or onboarding, don't redirect (let user navigate)
    } else {
      // Authenticated
      if (inAuthGroup || inOnboarding) {
        router.replace('/(tabs)');
      }
    }
  }, [session, loading, segments, hasSeenOnboarding, hasCheckedOnboarding, router]);

  if (loading || !hasCheckedOnboarding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
}
