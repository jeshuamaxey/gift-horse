import { useColorScheme } from 'react-native';
import { useTheme } from 'tamagui';

/**
 * Get theme colors with automatic correction for theme mismatch issues.
 * This fixes the case where Tamagui returns wrong theme colors.
 */
export function useThemeColors() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getBackground = () => {
    let bg = theme.background?.get();
    // Fix: If theme doesn't match color scheme, use correct color
    if (isDark && bg === '#FFFFFF') return '#121212';
    if (!isDark && bg === '#121212') return '#FFFFFF';
    return bg || (isDark ? '#121212' : '#FFFFFF');
  };

  const getTextColor = () => {
    let color = theme.color?.get();
    // Fix: If theme doesn't match color scheme, use correct color
    if (isDark && color === '#111827') return '#F9FAFB';
    if (!isDark && color === '#F9FAFB') return '#111827';
    return color || (isDark ? '#F9FAFB' : '#111827');
  };

  const getTextColorSecondary = () => {
    let color = theme.color5?.get();
    // Fix: If theme doesn't match color scheme, use correct color
    if (isDark && color === '#6B7280') return '#9CA3AF';
    if (!isDark && color === '#9CA3AF') return '#6B7280';
    return color || (isDark ? '#9CA3AF' : '#6B7280');
  };

  const getBorderColor = () => {
    let border = theme.borderColor?.get();
    // Fix: If theme doesn't match color scheme, use correct color
    if (isDark && border === '#E5E7EB') return '#374151';
    if (!isDark && border === '#374151') return '#E5E7EB';
    return border || (isDark ? '#374151' : '#E5E7EB');
  };

  return {
    background: getBackground(),
    text: getTextColor(),
    textSecondary: getTextColorSecondary(),
    border: getBorderColor(),
    primary: theme.primary?.get() || '#007AFF',
    error: theme.error?.get() || '#FF3B30',
    isDark,
  };
}

