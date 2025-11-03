import { View, Text, StyleSheet } from 'react-native';

export default function UnassignedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unassigned Ideas</Text>
      <Text style={styles.subtitle}>Unassigned ideas list coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

