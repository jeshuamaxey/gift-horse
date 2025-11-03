import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ONBOARDING_KEY = '@onboarding_seen';

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();

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
            // Clear onboarding flag so user can see onboarding again if they want
            await AsyncStorage.removeItem(ONBOARDING_KEY);
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const handleClearOnboarding = () => {
    Alert.alert(
      'Clear Onboarding',
      'This will show the onboarding screen next time you log out. Useful for testing.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            await AsyncStorage.removeItem(ONBOARDING_KEY);
            Alert.alert('Success', 'Onboarding flag cleared. You will see onboarding after logging out.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile?.email || user?.email}</Text>
          </View>

          {profile?.full_name && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{profile.full_name}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Development</Text>
          
          <TouchableOpacity
            style={styles.devButton}
            onPress={handleClearOnboarding}
          >
            <Ionicons name="refresh-outline" size={20} color="#666" />
            <Text style={styles.devButtonText}>Reset Onboarding Flag</Text>
          </TouchableOpacity>
          <Text style={styles.devHelperText}>
            Clears the onboarding flag so you can test the onboarding flow again
          </Text>
        </View>

        <View style={styles.version}>
          <Text style={styles.versionText}>Gift Horse v1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
    gap: 8,
  },
  logoutButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
  devButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
    marginBottom: 8,
  },
  devButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  devHelperText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  version: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

