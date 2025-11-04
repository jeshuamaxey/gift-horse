import { Avatar, Button, Card, Text } from '@/components/design-system';
import { useGiftIdeasByRecipient } from '@/hooks/useGiftIdeas';
import { useDeleteRecipient, useRecipient } from '@/hooks/useRecipients';
import { useThemeColors } from '@/utils/themeHelpers';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { XStack, YStack } from 'tamagui';

function GiftIdeaCard({ giftIdea }: { giftIdea: any }) {
  const router = useRouter();
  const colors = useThemeColors();
  
  const stateColors: Record<string, string> = {
    idea: colors.primary,
    acquired: colors.success,
    gifted: colors.textSecondary,
    abandoned: colors.error,
  };

  const stateColor = stateColors[giftIdea.state] || colors.textSecondary;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/gifts/${giftIdea.id}` as any)}
    >
      <Card
        bordered
        backgroundColor={colors.background}
        style={{ backgroundColor: colors.background }}
        marginBottom="$sm"
      >
        <XStack alignItems="center" gap="$md">
          {giftIdea.image_url && (
            <YStack
              width={48}
              height={48}
              borderRadius="$sm"
              backgroundColor={colors.border}
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: colors.border }}
            >
              <Ionicons name="image" size={24} color={colors.textSecondary} />
            </YStack>
          )}
          <YStack flex={1} gap="$xs">
            <Text variant="body" fontWeight="500">
              {giftIdea.title}
            </Text>
            {giftIdea.price && (
              <Text variant="caption" color="secondary">
                ${giftIdea.price}
              </Text>
            )}
          </YStack>
          <YStack
            paddingHorizontal="$sm"
            paddingVertical="$xs"
            borderRadius="$xs"
            backgroundColor={stateColor}
            style={{ backgroundColor: stateColor }}
          >
            <Text
              variant="small"
              color="white"
              style={{ color: '#FFFFFF', textTransform: 'capitalize' }}
            >
              {giftIdea.state}
            </Text>
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );
}

export default function RecipientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: recipient, isLoading: recipientLoading } = useRecipient(id);
  const { data: giftIdeas, isLoading: ideasLoading } = useGiftIdeasByRecipient(id);
  const deleteRecipient = useDeleteRecipient();
  const colors = useThemeColors();

  const handleDelete = () => {
    Alert.alert(
      'Delete Recipient',
      `Are you sure you want to delete ${recipient?.name}? This will not delete their gift ideas.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRecipient.mutateAsync(id);
              router.back();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete recipient');
            }
          },
        },
      ]
    );
  };

  if (recipientLoading || ideasLoading) {
    return (
      <YStack
        flex={1}
        backgroundColor={colors.background}
        style={{ backgroundColor: colors.background }}
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" />
      </YStack>
    );
  }

  if (!recipient) {
    return (
      <YStack
        flex={1}
        backgroundColor={colors.background}
        style={{ backgroundColor: colors.background }}
        justifyContent="center"
        alignItems="center"
        padding="$lg"
      >
        <Text variant="body" color="error">
          Recipient not found
        </Text>
      </YStack>
    );
  }

  const formatBirthday = () => {
    if (!recipient.birthday_month || !recipient.birthday_day) {
      return null;
    }
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[recipient.birthday_month - 1];
    const day = recipient.birthday_day;
    const year = recipient.birthday_year ? `, ${recipient.birthday_year}` : '';
    return `${monthName} ${day}${year}`;
  };

  const birthday = formatBirthday();
  const bgColor = colors.background;
  const borderColor = colors.border;
  const primaryColor = colors.primary;
  const textSecondaryColor = colors.textSecondary;

  // For now, just show all gift ideas (grouping by occasion will be implemented later)
  const groupedIdeas = giftIdeas || [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bgColor }}
      contentContainerStyle={{ backgroundColor: bgColor }}
    >
      <YStack
        padding="$md"
        borderBottomWidth={1}
        borderBottomColor={borderColor}
        backgroundColor={bgColor}
        style={{ backgroundColor: bgColor }}
      >
        <XStack alignItems="center" gap="$md">
          <Avatar
            name={recipient.name}
            emoji={recipient.emoji}
            size="large"
          />
          <YStack flex={1} gap="$xs">
            <Text variant="h2" fontWeight="700">
              {recipient.name}
            </Text>
            {birthday && (
              <Text variant="caption" color="secondary">
                Birthday: {birthday}
              </Text>
            )}
          </YStack>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => router.push(`/recipients/${id}/edit`)}
          >
            <Ionicons name="create-outline" size={24} color={primaryColor} />
          </TouchableOpacity>
        </XStack>
      </YStack>

      <YStack padding="$md">
        <Button
          variant="primary"
          onPress={() => router.push(`/gifts/new?recipientId=${id}` as any)}
          fullWidth
        >
          <XStack gap="$sm" alignItems="center">
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text variant="button" color="white">
              Add Gift Idea
            </Text>
          </XStack>
        </Button>
      </YStack>

      <YStack padding="$md">
        <Text variant="h3" marginBottom="$md">
          Gift Ideas
        </Text>
        {groupedIdeas.length > 0 ? (
          <FlatList
            data={groupedIdeas}
            renderItem={({ item }) => <GiftIdeaCard giftIdea={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <YStack alignItems="center" padding="$xl" gap="$sm">
            <Ionicons name="gift-outline" size={48} color={textSecondaryColor} />
            <Text variant="body" fontWeight="600" marginTop="$md">
              No gift ideas yet
            </Text>
            <Text variant="caption" color="secondary" textAlign="center">
              Add your first gift idea for this recipient
            </Text>
          </YStack>
        )}
      </YStack>

      <YStack padding="$md" paddingBottom="$xxl">
        <Button
          variant="destructive"
          onPress={handleDelete}
          fullWidth
        >
          <XStack gap="$sm" alignItems="center">
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text variant="button" color="error">
              Delete Recipient
            </Text>
          </XStack>
        </Button>
      </YStack>
    </ScrollView>
  );
}


