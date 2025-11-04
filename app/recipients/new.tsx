import { Button, Input, Text } from '@/components/design-system';
import { useCreateRecipient } from '@/hooks/useRecipients';
import { useThemeColors } from '@/utils/themeHelpers';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView, Text as RNText, TouchableOpacity, View } from 'react-native';
import { XStack, YStack } from 'tamagui';

export default function NewRecipientScreen() {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState<number | null>(null);
  const [birthdayDay, setBirthdayDay] = useState<number | null>(null);
  const [birthdayYear, setBirthdayYear] = useState<number | null>(null);
  const [activePicker, setActivePicker] = useState<'month' | 'day' | 'year' | 'emoji' | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const createRecipient = useCreateRecipient();
  const colors = useThemeColors();

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

  const bgColor = colors.background;
  const borderColor = colors.border;
  const primaryColor = colors.primary;
  const textSecondaryColor = colors.textSecondary;
  const errorColor = colors.error;
  // Selected state background with 10% opacity
  const selectedBgColor = 'rgba(0, 122, 255, 0.1)';

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bgColor }}
      contentContainerStyle={{ backgroundColor: bgColor }}
    >
      <YStack padding="$md" gap="$lg">
        <YStack gap="$xs">
          <Input
            label="Name *"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </YStack>

        <YStack gap="$xs">
          <Text variant="caption" color="secondary">
            Emoji
          </Text>
          <TouchableOpacity
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <YStack
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="$sm"
              padding="$md"
              alignItems="center"
              backgroundColor={bgColor}
              style={{ backgroundColor: bgColor }}
            >
              {emoji ? (
                <RNText style={{ fontSize: 32 }}>{emoji}</RNText>
              ) : (
                <Text variant="body" color="secondary">
                  Tap to add emoji
                </Text>
              )}
            </YStack>
          </TouchableOpacity>
          
          {showEmojiPicker && (
            <YStack
              marginTop="$sm"
              padding="$md"
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="$sm"
              backgroundColor={bgColor}
              style={{ backgroundColor: bgColor }}
            >
              <XStack flexWrap="wrap" gap="$sm">
                {popularEmojis.map((e) => (
                  <TouchableOpacity
                    key={e}
                    onPress={() => {
                      setEmoji(e);
                      setShowEmojiPicker(false);
                    }}
                  >
                    <YStack
                      width={48}
                      height={48}
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={bgColor}
                      borderRadius="$sm"
                      borderWidth={1}
                      borderColor={borderColor}
                      style={{ backgroundColor: bgColor }}
                    >
                      <RNText style={{ fontSize: 24 }}>{e}</RNText>
                    </YStack>
                  </TouchableOpacity>
                ))}
              </XStack>
              <TouchableOpacity
                style={{ marginTop: 12, padding: 12, alignItems: 'center' }}
                onPress={() => {
                  setEmoji('');
                  setShowEmojiPicker(false);
                }}
              >
                <Text variant="caption" color="error">
                  Remove
                </Text>
              </TouchableOpacity>
            </YStack>
          )}
        </YStack>

        <YStack gap="$xs">
          <Text variant="caption" color="secondary">
            Birthday
          </Text>
          <Text variant="small" color="tertiary">
            Select month and day (year is optional)
          </Text>
          
          <XStack gap="$sm" marginTop="$xs">
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setActivePicker('month')}
            >
              <YStack
                flex={1}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="$sm"
                padding="$md"
                backgroundColor={bgColor}
                alignItems="center"
                style={{ backgroundColor: bgColor }}
              >
                <Text variant="caption">
                  {birthdayMonth ? months[birthdayMonth - 1] : 'Month'}
                </Text>
              </YStack>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setActivePicker('day')}
            >
              <YStack
                flex={1}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="$sm"
                padding="$md"
                backgroundColor={bgColor}
                alignItems="center"
                style={{ backgroundColor: bgColor }}
              >
                <Text variant="caption">
                  {birthdayDay ? birthdayDay.toString() : 'Day'}
                </Text>
              </YStack>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setActivePicker('year')}
            >
              <YStack
                flex={1}
                borderWidth={1}
                borderColor={borderColor}
                borderRadius="$sm"
                padding="$md"
                backgroundColor={bgColor}
                alignItems="center"
                style={{ backgroundColor: bgColor }}
              >
                <Text variant="caption">
                  {birthdayYear ? birthdayYear.toString() : 'Year (optional)'}
                </Text>
              </YStack>
            </TouchableOpacity>
          </XStack>

          {(birthdayMonth !== null || birthdayDay !== null || birthdayYear !== null) && (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              padding="$sm"
              backgroundColor={bgColor}
              borderRadius="$sm"
              marginTop="$sm"
              style={{ backgroundColor: bgColor }}
            >
              <Text variant="body" fontWeight="500">
                {formatBirthday()}
              </Text>
              <TouchableOpacity
                style={{ padding: 8 }}
                onPress={() => {
                  setBirthdayMonth(null);
                  setBirthdayDay(null);
                  setBirthdayYear(null);
                }}
              >
                <Text variant="caption" color="error">
                  Clear
                </Text>
              </TouchableOpacity>
            </XStack>
          )}

          {/* Month Picker Modal */}
          <Modal
            visible={activePicker === 'month'}
            transparent
            animationType="slide"
            onRequestClose={() => setActivePicker(null)}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setActivePicker(null)}
              />
              <View
                style={{
                  backgroundColor: bgColor,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  maxHeight: '80%',
                }}
              >
                <YStack
                  padding="$md"
                  borderBottomWidth={1}
                  borderBottomColor={borderColor}
                  alignItems="center"
                  backgroundColor={bgColor}
                  style={{ backgroundColor: bgColor }}
                >
                  <Text variant="h3">Select Month</Text>
                </YStack>
                <FlatList
                  data={months.map((month, index) => ({ month, index: index + 1 }))}
                  keyExtractor={(item) => item.index.toString()}
                  style={{ maxHeight: 400 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBirthdayMonth(item.index);
                        setActivePicker(null);
                      }}
                    >
                      <YStack
                        padding="$md"
                        borderBottomWidth={1}
                        borderBottomColor={borderColor}
                        backgroundColor={
                          birthdayMonth === item.index ? selectedBgColor : bgColor
                        }
                        style={{
                          backgroundColor:
                            birthdayMonth === item.index ? selectedBgColor : bgColor,
                        }}
                      >
                        <Text
                          variant="body"
                          fontWeight={birthdayMonth === item.index ? '600' : '400'}
                          color={birthdayMonth === item.index ? 'primary' : 'primary'}
                        >
                          {item.month}
                        </Text>
                      </YStack>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>

          {/* Day Picker Modal */}
          <Modal
            visible={activePicker === 'day'}
            transparent
            animationType="slide"
            onRequestClose={() => setActivePicker(null)}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setActivePicker(null)}
              />
              <View
                style={{
                  backgroundColor: bgColor,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  maxHeight: '80%',
                }}
              >
                <YStack
                  padding="$md"
                  borderBottomWidth={1}
                  borderBottomColor={borderColor}
                  alignItems="center"
                  backgroundColor={bgColor}
                  style={{ backgroundColor: bgColor }}
                >
                  <Text variant="h3">Select Day</Text>
                </YStack>
                <FlatList
                  data={Array.from({ length: 31 }, (_, i) => i + 1)}
                  keyExtractor={(item) => item.toString()}
                  style={{ maxHeight: 400 }}
                  renderItem={({ item: day }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBirthdayDay(day);
                        setActivePicker(null);
                      }}
                    >
                      <YStack
                        padding="$md"
                        borderBottomWidth={1}
                        borderBottomColor={borderColor}
                        backgroundColor={
                          birthdayDay === day ? selectedBgColor : bgColor
                        }
                        style={{
                          backgroundColor:
                            birthdayDay === day ? selectedBgColor : bgColor,
                        }}
                      >
                        <Text
                          variant="body"
                          fontWeight={birthdayDay === day ? '600' : '400'}
                          color={birthdayDay === day ? 'primary' : 'primary'}
                        >
                          {day}
                        </Text>
                      </YStack>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>

          {/* Year Picker Modal */}
          <Modal
            visible={activePicker === 'year'}
            transparent
            animationType="slide"
            onRequestClose={() => setActivePicker(null)}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setActivePicker(null)}
              />
              <View
                style={{
                  backgroundColor: bgColor,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  maxHeight: '80%',
                }}
              >
                <YStack
                  padding="$md"
                  borderBottomWidth={1}
                  borderBottomColor={borderColor}
                  alignItems="center"
                  backgroundColor={bgColor}
                  style={{ backgroundColor: bgColor }}
                >
                  <Text variant="h3">Select Year</Text>
                </YStack>
                <FlatList
                  data={[{ year: null, label: 'No year' }, ...years.map((year) => ({ year, label: year.toString() }))]}
                  keyExtractor={(item) => item.year?.toString() ?? 'null'}
                  style={{ maxHeight: 400 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBirthdayYear(item.year);
                        setActivePicker(null);
                      }}
                    >
                      <YStack
                        padding="$md"
                        borderBottomWidth={1}
                        borderBottomColor={borderColor}
                        backgroundColor={
                          birthdayYear === item.year ? selectedBgColor : bgColor
                        }
                        style={{
                          backgroundColor:
                            birthdayYear === item.year ? selectedBgColor : bgColor,
                        }}
                      >
                        <Text
                          variant="body"
                          fontWeight={birthdayYear === item.year ? '600' : '400'}
                          color={birthdayYear === item.year ? 'primary' : 'primary'}
                        >
                          {item.label}
                        </Text>
                      </YStack>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </YStack>

        <Button
          variant="primary"
          onPress={handleSave}
          disabled={createRecipient.isPending}
          fullWidth
        >
          {createRecipient.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text variant="button" color="white">
              Save
            </Text>
          )}
        </Button>
      </YStack>
    </ScrollView>
  );
}

