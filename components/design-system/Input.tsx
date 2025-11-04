import { ComponentProps } from 'react';
import { useColorScheme } from 'react-native';
import { Input as TamaguiInput, YStack, styled, useTheme } from 'tamagui';
import { Text } from './Text';

// Styled input with focus and error states
const StyledInput = styled(TamaguiInput, {
  name: 'Input',
  borderRadius: '$sm',  // 8pt from design philosophy
  fontSize: '$4',       // 16pt
  paddingVertical: '$md',
  paddingHorizontal: '$md',
  borderWidth: 1,
  minHeight: '$touchComfortable', // 48pt
  
  focusStyle: {
    borderWidth: 2,
    outlineStyle: 'none',
  },
  
  variants: {
    error: {
      true: {
        borderWidth: 2,
      },
    },
  },
});

type InputProps = ComponentProps<typeof StyledInput> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export function Input({ 
  label,
  error,
  helperText,
  ...props 
}: InputProps) {
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
  
  // Get colors with theme-aware fallbacks for iOS compatibility - ALWAYS return valid colors
  const textColor = getThemeColor(() => theme.color?.get(), isDark ? '#F9FAFB' : '#111827');
  const bgColor = getThemeColor(() => theme.background?.get(), isDark ? '#121212' : '#FFFFFF');
  const defaultBorder = isDark ? '#374151' : '#E5E7EB';
  const borderColorValue = error 
    ? getThemeColor(() => theme.error?.get(), '#FF3B30')
    : getThemeColor(() => theme.borderColor?.get(), defaultBorder);
    
  const focusBorderColor = error
    ? getThemeColor(() => theme.error?.get(), '#FF3B30')
    : getThemeColor(() => theme.primary?.get(), '#007AFF');
  
  const placeholderColor = getThemeColor(() => theme.color6?.get(), isDark ? '#6B7280' : '#9CA3AF');
  
  return (
    <YStack gap="$xs">
      {label && (
        <Text variant={'caption' as const} color={'secondary' as const}>
          {label}
        </Text>
      )}
      
      <StyledInput
        backgroundColor={bgColor}
        borderColor={borderColorValue}
        color={textColor}
        placeholderTextColor={placeholderColor}
        focusStyle={{
          borderColor: focusBorderColor,
        }}
        error={!!error}
        style={{ color: textColor }} // Explicitly set color in style for iOS compatibility
        {...props}
      />
      
      {(error || helperText) && (
        <Text 
          variant={'small' as const}
          color={error ? ('error' as const) : ('tertiary' as const)}
        >
          {error || helperText}
        </Text>
      )}
    </YStack>
  );
}

