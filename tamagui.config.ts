import { createFont, createTamagui, createTheme, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';

// Design tokens from docs/12-design-philosophy.md
const tokens = createTokens({
  // Colors
  color: {
    // Primary (Brand/Accent)
    primary50: '#E5F2FF',
    primary100: '#B3DBFF',
    primary200: '#80C4FF',
    primary300: '#4DADFF',
    primary400: '#1A96FF',
    primary500: '#007AFF',
    primary600: '#0062CC',
    primary700: '#004999',
    primary800: '#003166',
    primary900: '#001933',
    
    // Neutrals (Grays)
    neutral50: '#F9FAFB',
    neutral100: '#F3F4F6',
    neutral200: '#E5E7EB',
    neutral300: '#D1D5DB',
    neutral400: '#9CA3AF',
    neutral500: '#6B7280',
    neutral600: '#4B5563',
    neutral700: '#374151',
    neutral800: '#1F2937',
    neutral900: '#111827',
    
    // Semantic colors
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
    
    // Light mode semantic
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    backgroundTertiary: '#F3F4F6',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    borderActive: '#007AFF',
    
    // Dark mode semantic
    backgroundDark: '#121212',
    backgroundSecondaryDark: '#1E1E1E',
    backgroundTertiaryDark: '#2A2A2A',
    textPrimaryDark: '#F9FAFB',
    textSecondaryDark: '#9CA3AF',
    textTertiaryDark: '#6B7280',
    borderDark: '#374151',
    borderActiveDark: '#4DADFF',
  },
  
  // Spacing (8pt grid)
  space: {
    0: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    
    // Touch targets
    touchMinimum: 44,
    touchComfortable: 48,
    touchGenerous: 56,
  },
  
  // Typography sizes
  size: {
    0: 0,
    1: 10,     // Numeric sizes for Tamagui components
    2: 13,
    3: 15,
    4: 17,     // Default body size
    5: 20,
    6: 22,
    7: 28,
    8: 34,
    9: 48,
    10: 64,
    
    // Named sizes from design philosophy
    tabBar: 10,
    small: 13,
    caption: 15,
    body: 17,
    bodyEmphasis: 17,
    button: 17,
    h3: 20,
    h2: 22,
    h1: 28,
    display: 34,
    
    // Touch targets (for width/height)
    touchMinimum: 44,
    touchComfortable: 48,
    touchGenerous: 56,
  },
  
  // Border radius
  radius: {
    0: 0,
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  // Z-index
  zIndex: {
    0: 0,
    low: 1,
    medium: 10,
    high: 100,
    modal: 1000,
  },
});

// Font configuration for system fonts
const bodyFont = createFont({
  family: 'System',
  size: {
    1: 10,
    2: 13,
    3: 15,
    4: 17,
    5: 20,
    6: 22,
    7: 28,
    8: 34,
    true: 17, // default
  },
  lineHeight: {
    1: 14,
    2: 18,
    3: 21,
    4: 24,
    5: 28,
    6: 31,
    7: 39,
    8: 48,
  },
  weight: {
    4: '400',   // regular
    6: '600',   // semibold
    7: '700',   // bold
    true: '400', // default
  },
  letterSpacing: {
    4: 0,
    7: -0.5,
  },
});

const headingFont = createFont({
  family: 'System',
  size: {
    1: 20,
    2: 22,
    3: 28,
    4: 34,
    5: 48,
    6: 64,
    true: 28, // default
  },
  lineHeight: {
    1: 28,
    2: 31,
    3: 39,
    4: 48,
    5: 67,
    6: 90,
  },
  weight: {
    6: '600',
    7: '700',
    true: '700', // default
  },
  letterSpacing: {
    3: -0.5,
    4: -1,
  },
});

// Theme definitions - using standard Tamagui structure
const lightTheme = createTheme({
  // Background colors
  background: '#FFFFFF',
  background0: '#FFFFFF',
  background025: '#F9FAFB',
  background05: '#F9FAFB',
  background075: '#F3F4F6',
  backgroundHover: '#F3F4F6',
  backgroundPress: '#E5E7EB',
  backgroundFocus: '#F3F4F6',
  backgroundStrong: '#E5E7EB',
  backgroundTransparent: 'rgba(255,255,255,0)',
  
  // Text colors
  color: '#111827',
  color0: '#000000',
  color025: '#111827',
  color05: '#111827',
  color075: '#1F2937',
  colorHover: '#000000',
  colorPress: '#000000',
  colorFocus: '#000000',
  colorTransparent: 'rgba(17,24,39,0)',
  
  // Border colors  
  borderColor: '#E5E7EB',
  borderColor0: '#E5E7EB',
  borderColorHover: '#D1D5DB',
  borderColorFocus: '#007AFF',
  borderColorPress: '#0062CC',
  
  // Semantic colors
  color1: '#111827',
  color2: '#1F2937',
  color3: '#374151',
  color4: '#4B5563',
  color5: '#6B7280',
  color6: '#9CA3AF',
  color7: '#D1D5DB',
  color8: '#E5E7EB',
  color9: '#F3F4F6',
  color10: '#F9FAFB',
  color11: '#FFFFFF',
  color12: '#FFFFFF',
  
  // Shadows
  shadowColor: '#000000',
  shadowColorHover: '#000000',
  shadowColorPress: '#000000',
  shadowColorFocus: '#000000',
  
  // Semantic action colors
  primary: '#007AFF',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
});

const darkTheme = createTheme({
  // Background colors
  background: '#121212',
  background0: '#121212',
  background025: '#1E1E1E',
  background05: '#1E1E1E',
  background075: '#2A2A2A',
  backgroundHover: '#2A2A2A',
  backgroundPress: '#374151',
  backgroundFocus: '#2A2A2A',
  backgroundStrong: '#374151',
  backgroundTransparent: 'rgba(18,18,18,0)',
  
  // Text colors
  color: '#F9FAFB',
  color0: '#FFFFFF',
  color025: '#F9FAFB',
  color05: '#F9FAFB',
  color075: '#F3F4F6',
  colorHover: '#FFFFFF',
  colorPress: '#FFFFFF',
  colorFocus: '#FFFFFF',
  colorTransparent: 'rgba(249,250,251,0)',
  
  // Border colors
  borderColor: '#374151',
  borderColor0: '#374151',
  borderColorHover: '#4B5563',
  borderColorFocus: '#4DADFF',
  borderColorPress: '#80C4FF',
  
  // Semantic colors (reversed for dark mode)
  color1: '#F9FAFB',
  color2: '#F3F4F6',
  color3: '#E5E7EB',
  color4: '#D1D5DB',
  color5: '#9CA3AF',
  color6: '#6B7280',
  color7: '#4B5563',
  color8: '#374151',
  color9: '#2A2A2A',
  color10: '#1E1E1E',
  color11: '#121212',
  color12: '#121212',
  
  // Shadows
  shadowColor: '#000000',
  shadowColorHover: '#000000',
  shadowColorPress: '#000000',
  shadowColorFocus: '#000000',
  
  // Semantic action colors
  primary: '#007AFF',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
});

// Create configuration
const config = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  shorthands,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;

