import { useCreateRecipient } from '@/hooks/useRecipients';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function NewRecipientScreen() {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState<number | null>(null);
  const [birthdayDay, setBirthdayDay] = useState<number | null>(null);
  const [birthdayYear, setBirthdayYear] = useState<number | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const createRecipient = useCreateRecipient();

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    // Validate that if month or day is set, both must be set
    if ((birthdayMonth !== null || birthdayDay !== null) && (birthdayMonth === null || birthdayDay === null)) {
      Alert.alert('Error', 'Please select both month and day for the birthday');
      return;
    }

    try {
      await createRecipient.mutateAsync({
        name: name.trim(),
        emoji: emoji || null,
        birthday_month: birthdayMonth,
        birthday_day: birthdayDay,
        birthday_year: birthdayYear,
      });
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create recipient');
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const formatBirthday = () => {
    if (birthdayMonth === null || birthdayDay === null) {
      return 'Tap to add birthday';
    }
    const monthName = months[birthdayMonth - 1];
    const day = birthdayDay;
    const year = birthdayYear ? `, ${birthdayYear}` : '';
    return `${monthName} ${day}${year}`;
  };

  // Popular emojis for quick selection
  const popularEmojis = ['🎂', '🎁', '🎉', '❤️', '👶', '👧', '👦', '👨', '👩', '👴', '👵', '🐶', '🐱'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Emoji</Text>
          <TouchableOpacity
            style={styles.emojiButton}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {emoji ? (
              <Text style={styles.emojiDisplay}>{emoji}</Text>
            ) : (
              <Text style={styles.emojiPlaceholder}>Tap to add emoji</Text>
            )}
          </TouchableOpacity>
          
          {showEmojiPicker && (
            <View style={styles.emojiPicker}>
              <View style={styles.emojiGrid}>
                {popularEmojis.map((e) => (
                  <TouchableOpacity
                    key={e}
                    style={styles.emojiOption}
                    onPress={() => {
                      setEmoji(e);
                      setShowEmojiPicker(false);
                    }}
                  >
                    <Text style={styles.emojiOptionText}>{e}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={styles.removeEmojiButton}
                onPress={() => {
                  setEmoji('');
                  setShowEmojiPicker(false);
                }}
              >
                <Text style={styles.removeEmojiText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Birthday</Text>
          <Text style={styles.helperText}>Select month and day (year is optional)</Text>
          
          <View style={styles.birthdayRow}>
            <TouchableOpacity
              style={styles.birthdayButton}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={styles.birthdayButtonText}>
                {birthdayMonth ? months[birthdayMonth - 1] : 'Month'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.birthdayButton}
              onPress={() => setShowDayPicker(true)}
            >
              <Text style={styles.birthdayButtonText}>
                {birthdayDay ? birthdayDay.toString() : 'Day'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.birthdayButton}
              onPress={() => setShowYearPicker(true)}
            >
              <Text style={styles.birthdayButtonText}>
                {birthdayYear ? birthdayYear.toString() : 'Year (optional)'}
              </Text>
            </TouchableOpacity>
          </View>

          {(birthdayMonth !== null || birthdayDay !== null || birthdayYear !== null) && (
            <View style={styles.birthdayDisplay}>
              <Text style={styles.birthdayDisplayText}>{formatBirthday()}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setBirthdayMonth(null);
                  setBirthdayDay(null);
                  setBirthdayYear(null);
                }}
              >
                <Text style={styles.removeButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          )}

          {showMonthPicker && (
            <View style={styles.pickerContainer}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.pickerOption,
                    birthdayMonth === index + 1 && styles.pickerOptionSelected,
                  ]}
                  onPress={() => {
                    setBirthdayMonth(index + 1);
                    setShowMonthPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      birthdayMonth === index + 1 && styles.pickerOptionTextSelected,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {showDayPicker && (
            <View style={styles.pickerContainer}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.pickerOption,
                    birthdayDay === day && styles.pickerOptionSelected,
                  ]}
                  onPress={() => {
                    setBirthdayDay(day);
                    setShowDayPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      birthdayDay === day && styles.pickerOptionTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {showYearPicker && (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={[
                  styles.pickerOption,
                  birthdayYear === null && styles.pickerOptionSelected,
                ]}
                onPress={() => {
                  setBirthdayYear(null);
                  setShowYearPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    birthdayYear === null && styles.pickerOptionTextSelected,
                  ]}
                >
                  No year
                </Text>
              </TouchableOpacity>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.pickerOption,
                    birthdayYear === year && styles.pickerOptionSelected,
                  ]}
                  onPress={() => {
                    setBirthdayYear(year);
                    setShowYearPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      birthdayYear === year && styles.pickerOptionTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, createRecipient.isPending && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={createRecipient.isPending}
        >
          {createRecipient.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
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
  content: {
    padding: 16,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  emojiButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emojiDisplay: {
    fontSize: 32,
  },
  emojiPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  emojiPicker: {
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiOption: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  emojiOptionText: {
    fontSize: 24,
  },
  removeEmojiButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  removeEmojiText: {
    color: '#ff3b30',
    fontSize: 14,
  },
  birthdayRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  birthdayButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  birthdayButtonText: {
    fontSize: 14,
    color: '#000',
  },
  birthdayDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 8,
  },
  birthdayDisplayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#ff3b30',
    fontSize: 14,
  },
  pickerContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerOptionSelected: {
    backgroundColor: '#e3f2fd',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#000',
  },
  pickerOptionTextSelected: {
    fontWeight: '600',
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
