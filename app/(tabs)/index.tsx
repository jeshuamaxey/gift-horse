import { Text } from '@/components/design-system';
import { useThemeColors } from '@/utils/themeHelpers';
import { YStack } from 'tamagui';

export default function AddGiftScreen() {
  const colors = useThemeColors();
  const bgColor = colors.background;

  return (
    <YStack 
      flex={1} 
      justifyContent="center" 
      alignItems="center" 
      padding="$lg"
      backgroundColor={bgColor}
      style={{ backgroundColor: bgColor }}
    >
      <Text variant="h2" marginBottom="$sm">
        Add Gift
      </Text>
      <Text variant="body" color="secondary">
        Quick capture screen coming soon
      </Text>
    </YStack>
  );
}

