import { Button, Text } from '@/components/design-system';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useThemeColors } from '@/utils/themeHelpers';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView } from 'react-native';
import { XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const colors = useThemeColors();
  const router = useRouter();

  const bgColor = colors.background;
  const borderColor = colors.border;
  const errorColor = colors.error;

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }} contentContainerStyle={{ backgroundColor: bgColor }}>
      <YStack padding="$md" paddingTop={60}>
        {/* Account Section */}
        <YStack marginBottom="$xl">
          <Text variant="h2" marginBottom="$md">
            Account
          </Text>
          
          <YStack 
            paddingVertical="$sm" 
            borderBottomWidth={1} 
            borderBottomColor={borderColor}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text variant="body" color="secondary">
                Email
              </Text>
              <Text variant="body" fontWeight="500">
                {profile?.email || user?.email}
              </Text>
            </XStack>
          </YStack>

          {profile?.full_name && (
            <YStack 
              paddingVertical="$sm" 
              borderBottomWidth={1} 
              borderBottomColor={borderColor}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <Text variant="body" color="secondary">
                  Name
                </Text>
                <Text variant="body" fontWeight="500">
                  {profile.full_name}
                </Text>
              </XStack>
            </YStack>
          )}
        </YStack>

        {/* Actions Section */}
        <YStack marginBottom="$xl">
          <Text variant="h2" marginBottom="$md">
            Actions
          </Text>
          
          <Button 
            variant="destructive" 
            onPress={handleLogout}
            fullWidth
          >
            <XStack gap="$sm" alignItems="center">
              <Ionicons name="log-out-outline" size={20} color={errorColor} />
              <Text variant="button" color="error">
                Sign Out
              </Text>
            </XStack>
          </Button>
        </YStack>

        {/* Dev Tools Section - Only visible in dev mode */}
        {__DEV__ && (
          <YStack marginBottom="$xl">
            <Text variant="h2" marginBottom="$md">
              Developer Tools
            </Text>
            
            <Button 
              variant="secondary" 
              onPress={() => router.push('/components-showcase')}
              fullWidth
            >
              <XStack gap="$sm" alignItems="center">
                <Ionicons name="layers-outline" size={20} color={colors.primary} />
                <Text variant="button">
                  Component Showcase
                </Text>
              </XStack>
            </Button>
          </YStack>
        )}

        {/* Version */}
        <YStack alignItems="center" paddingVertical="$lg">
          <Text variant="caption" color="secondary">
            Gift Horse v1.0.0
          </Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
}

