import { Redirect } from 'expo-router';

export default function Index() {
  // This is the app entry point - redirect to tabs
  // The RootLayoutNav in _layout.tsx will handle auth/onboarding routing
  return <Redirect href="/(tabs)" />;
}
