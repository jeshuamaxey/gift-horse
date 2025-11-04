import { useThemeColors } from '@/utils/themeHelpers';
import { Stack } from 'expo-router';

export default function RecipientsLayout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          color: colors.textPrimary,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Recipient',
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: 'New Recipient',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

