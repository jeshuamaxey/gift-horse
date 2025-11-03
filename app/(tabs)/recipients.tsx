import { useRecipients } from '@/hooks/useRecipients';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

function RecipientItem({ recipient }: { recipient: any }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.recipientItem}
      onPress={() => router.push(`/recipients/${recipient.id}`)}
    >
      <RecipientAvatar recipient={recipient} />
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{recipient.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

export default function RecipientsScreen() {
  const { data: recipients, isLoading, error } = useRecipients();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Recipients</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Recipients</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading recipients</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipients</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/recipients/new')}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {recipients && recipients.length > 0 ? (
        <FlatList
          data={recipients}
          renderItem={({ item }) => <RecipientItem recipient={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No recipients yet</Text>
          <Text style={styles.emptySubtext}>Add your first recipient to get started</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/recipients/new')}
          >
            <Text style={styles.emptyButtonText}>Add Recipient</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  initials: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
