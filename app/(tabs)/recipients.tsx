import { Avatar, Button, Text } from '@/components/design-system';
import { useRecipients } from '@/hooks/useRecipients';
import { useThemeColors } from '@/utils/themeHelpers';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { XStack, YStack } from 'tamagui';

function RecipientItem({ recipient }: { recipient: any }) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/recipients/${recipient.id}`)}
    >
      <XStack
        alignItems="center"
        padding="$md"
        backgroundColor={colors.background}
        borderRadius="$md"
        marginBottom="$sm"
        borderWidth={1}
        borderColor={colors.border}
        style={{ backgroundColor: colors.background }}
      >
        <Avatar 
          name={recipient.name}
          emoji={recipient.emoji}
          size="medium"
        />
        <YStack flex={1} marginLeft="$sm">
          <Text variant="body" fontWeight="500">
            {recipient.name}
          </Text>
        </YStack>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </XStack>
    </TouchableOpacity>
  );
}

export default function RecipientsScreen() {
  const { data: recipients, isLoading, error } = useRecipients();
  const router = useRouter();
  const colors = useThemeColors();

  const bgColor = colors.background;
  const textColorSecondary = colors.textSecondary;
  const borderColor = colors.border;
  const primaryColor = colors.primary;

  if (isLoading) {
    return (
      <YStack flex={1} backgroundColor={bgColor} style={{ backgroundColor: bgColor }}>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          padding="$md"
          paddingTop={60}
          borderBottomWidth={1}
          borderBottomColor={borderColor}
        >
          <Text variant="largeTitle">Recipients</Text>
        </XStack>
        <YStack flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </YStack>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} backgroundColor={bgColor} style={{ backgroundColor: bgColor }}>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          padding="$md"
          paddingTop={60}
          borderBottomWidth={1}
          borderBottomColor={borderColor}
        >
          <Text variant="largeTitle">Recipients</Text>
        </XStack>
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$lg">
          <Text variant="body" color="error">
            Error loading recipients
          </Text>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor={bgColor} style={{ backgroundColor: bgColor }}>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        padding="$md"
        paddingTop={60}
        borderBottomWidth={1}
        borderBottomColor={borderColor}
      >
        <Text variant="largeTitle">Recipients</Text>
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => router.push('/recipients/new')}
        >
          <Ionicons name="add" size={24} color={primaryColor} />
        </TouchableOpacity>
      </XStack>

      {recipients && recipients.length > 0 ? (
        <FlatList
          data={recipients}
          renderItem={({ item }) => <RecipientItem recipient={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$lg">
          <Ionicons name="people-outline" size={64} color={textColorSecondary} />
          <Text variant="h3" marginTop="$md" marginBottom="$xs">
            No recipients yet
          </Text>
          <Text 
            variant="body" 
            color="secondary"
            textAlign="center"
            marginBottom="$lg"
          >
            Add your first recipient to get started
          </Text>
          <Button
            variant="primary"
            onPress={() => router.push('/recipients/new')}
          >
            Add Recipient
          </Button>
        </YStack>
      )}
    </YStack>
  );
}
