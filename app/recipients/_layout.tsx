import { Stack } from 'expo-router';

export default function RecipientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
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

