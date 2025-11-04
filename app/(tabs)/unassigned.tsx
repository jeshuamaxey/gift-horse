import { Text } from '@/components/design-system';
import { useThemeColors } from '@/utils/themeHelpers';
import { YStack } from 'tamagui';

export default function UnassignedScreen() {
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
        Unassigned Ideas
      </Text>
      <Text variant="body" color="secondary">
        Unassigned ideas list coming soon
      </Text>
    </YStack>
  );
}

