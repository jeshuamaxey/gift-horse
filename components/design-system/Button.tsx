import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'react-native';
import { Button as TamaguiButton, useTheme } from 'tamagui';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  hapticFeedback?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function Button({ 
  onPress, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  hapticFeedback = true,
  accessibilityLabel,
  accessibilityHint,
  children,
}: ButtonProps) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Validate if a color string is actually valid
  const isValidColor = (color: any): color is string => {
    return typeof color === 'string' && color.length > 0 && color !== 'transparent';
  };
  
  // Helper to safely get theme color with validation
  const getThemeColor = (themeGetter: (() => string | undefined) | undefined, fallback: string): string => {
    try {
      const color = themeGetter?.();
      return isValidColor(color) ? color : fallback;
    } catch {
      return fallback;
    }
  };
  
  // Get theme colors based on variant with theme-aware fallbacks - ALWAYS return valid colors
  const getColors = () => {
    const textColor = isDark ? '#F9FAFB' : '#111827';
    const borderColor = isDark ? '#374151' : '#E5E7EB';
    
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: getThemeColor(() => theme.color?.get(), textColor),
          borderColor: getThemeColor(() => theme.borderColor?.get(), borderColor),
          borderWidth: 1,
        };
      case 'destructive':
        return {
          backgroundColor: 'transparent',
          color: getThemeColor(() => theme.error?.get(), '#FF3B30'),
          borderColor: getThemeColor(() => theme.error?.get(), '#FF3B30'),
          borderWidth: 1,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: getThemeColor(() => theme.color?.get(), textColor),
          borderWidth: 0,
        };
      case 'primary':
      default:
        return {
          backgroundColor: getThemeColor(() => theme.primary?.get(), '#007AFF'),
          color: '#FFFFFF',
        };
    }
  };
  
  // Get size values
  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return {
          minHeight: 44,
          paddingHorizontal: '$sm',
          size: '$3',
        };
      case 'large':
        return {
          minHeight: 56,
          paddingHorizontal: '$lg',
          size: '$5',
        };
      case 'medium':
      default:
        return {
          minHeight: 48,
          paddingHorizontal: '$md',
          size: '$4',
        };
    }
  };
  
  const colors = getColors();
  const sizeProps = getSizeProps();
  
  const handlePress = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress?.();
  };
  
  return (
    <TamaguiButton
      onPress={handlePress}
      borderRadius="$sm"
      fontWeight="600"
      width={fullWidth ? '100%' : undefined}
      alignSelf={fullWidth ? 'stretch' : undefined}
      position="relative"
      opacity={disabled ? 0.6 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      pressStyle={{
        scale: 0.95,
        opacity: 0.9,
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      {...colors}
      {...sizeProps}
    >
      {children}
    </TamaguiButton>
  );
}

