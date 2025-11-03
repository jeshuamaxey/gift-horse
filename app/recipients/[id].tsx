import { useGiftIdeasByRecipient } from '@/hooks/useGiftIdeas';
import { useDeleteRecipient, useRecipient } from '@/hooks/useRecipients';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function RecipientAvatar({ recipient }: { recipient: { name: string; emoji: string | null } }) {
  if (recipient.emoji) {
    return (
      <View style={styles.avatar}>
        <Text style={styles.emoji}>{recipient.emoji}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.avatar}>
      <Text style={styles.initials}>{getInitials(recipient.name)}</Text>
    </View>
  );
}

function GiftIdeaCard({ giftIdea }: { giftIdea: any }) {
  const router = useRouter();
  
  const stateColors: Record<string, string> = {
    idea: '#007AFF',
    acquired: '#34C759',
    gifted: '#8E8E93',
    abandoned: '#FF3B30',
  };

  return (
    <TouchableOpacity
      style={styles.giftCard}
      onPress={() => router.push(`/gifts/${giftIdea.id}` as any)}
    >
      {giftIdea.image_url && (
        <View style={styles.giftImage}>
          {/* Image will be implemented with expo-image later */}
          <Ionicons name="image" size={24} color="#999" />
        </View>
      )}
      <View style={styles.giftContent}>
        <Text style={styles.giftTitle}>{giftIdea.title}</Text>
        {giftIdea.price && (
          <Text style={styles.giftPrice}>${giftIdea.price}</Text>
        )}
      </View>
      <View style={[styles.stateBadge, { backgroundColor: stateColors[giftIdea.state] || '#999' }]}>
        <Text style={styles.stateBadgeText}>{giftIdea.state}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function RecipientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: recipient, isLoading: recipientLoading } = useRecipient(id);
  const { data: giftIdeas, isLoading: ideasLoading } = useGiftIdeasByRecipient(id);
  const deleteRecipient = useDeleteRecipient();


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
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (!recipient) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Recipient not found</Text>
        </View>
      </View>
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

  // For now, just show all gift ideas (grouping by occasion will be implemented later)
  const groupedIdeas = giftIdeas || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <RecipientAvatar recipient={recipient} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{recipient.name}</Text>
          {birthday && (
            <Text style={styles.birthday}>Birthday: {birthday}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/recipients/${id}/edit`)}
        >
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addGiftButton}
          onPress={() => router.push(`/gifts/new?recipientId=${id}` as any)}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addGiftButtonText}>Add Gift Idea</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gift Ideas</Text>
        {groupedIdeas.length > 0 ? (
          <FlatList
            data={groupedIdeas}
            renderItem={({ item }) => <GiftIdeaCard giftIdea={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.giftList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="gift-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No gift ideas yet</Text>
            <Text style={styles.emptySubtext}>Add your first gift idea for this recipient</Text>
          </View>
        )}
      </View>

      <View style={styles.dangerZone}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#ff3b30" />
          <Text style={styles.deleteButtonText}>Delete Recipient</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 32,
  },
  initials: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  birthday: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  actions: {
    padding: 16,
  },
  addGiftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  addGiftButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  giftList: {
    gap: 12,
  },
  giftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  giftImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  giftContent: {
    flex: 1,
  },
  giftTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  giftPrice: {
    fontSize: 14,
    color: '#666',
  },
  stateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stateBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  dangerZone: {
    padding: 16,
    paddingBottom: 32,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
    gap: 8,
  },
  deleteButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
});

