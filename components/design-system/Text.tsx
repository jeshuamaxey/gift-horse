import { Text as RNText, TextProps as RNTextProps, TextStyle, useColorScheme } from 'react-native';
import { useTheme } from 'tamagui';

type ColorVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
type TypographyVariant = 'largeTitle' | 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'bodyEmphasis' | 'caption' | 'small' | 'button';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  children: React.ReactNode;
  color?: ColorVariant | string;
  variant?: TypographyVariant;
  style?: TextStyle;
  // Common Tamagui-like props
  fontSize?: number | string;
  fontWeight?: TextStyle['fontWeight'];
  textAlign?: TextStyle['textAlign'];
  marginBottom?: number | string;
  marginTop?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  lineHeight?: number;
}

export function Text({ 
  color: colorProp = 'primary',
  variant = 'body',
  children,
  style,
  fontSize,
  fontWeight,
  textAlign,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  lineHeight,
  ...props 
}: TextProps) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Typography variant styles
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'largeTitle':
        return { fontSize: 34, fontWeight: '700', lineHeight: 48 };
      case 'display':
        return { fontSize: 34, fontWeight: '700', lineHeight: 48 };
      case 'h1':
        return { fontSize: 28, fontWeight: '700', lineHeight: 39 };
      case 'h2':
        return { fontSize: 22, fontWeight: '600', lineHeight: 31 };
      case 'h3':
        return { fontSize: 20, fontWeight: '600', lineHeight: 28 };
      case 'body':
        return { fontSize: 17, fontWeight: '400', lineHeight: 24 };
      case 'bodyEmphasis':
        return { fontSize: 17, fontWeight: '600', lineHeight: 24 };
      case 'caption':
        return { fontSize: 15, fontWeight: '400', lineHeight: 21 };
      case 'small':
        return { fontSize: 13, fontWeight: '400', lineHeight: 18 };
      case 'button':
        return { fontSize: 17, fontWeight: '600' };
      default:
        return { fontSize: 17, fontWeight: '400', lineHeight: 24 };
    }
  };
  
  // Get theme color based on variant - with fix for theme mismatch
  const getColor = (): string => {
    let themeColor: string | undefined;
    
    switch (colorProp) {
      case 'secondary':
        themeColor = theme.color5?.get();
        // Fix: If theme doesn't match color scheme, use correct color
        if (isDark && themeColor === '#6B7280') themeColor = '#9CA3AF';
        if (!isDark && themeColor === '#9CA3AF') themeColor = '#6B7280';
        break;
      case 'tertiary':
        themeColor = theme.color6?.get();
        if (isDark && themeColor === '#9CA3AF') themeColor = '#6B7280';
        if (!isDark && themeColor === '#6B7280') themeColor = '#9CA3AF';
        break;
      case 'error':
        themeColor = theme.error?.get();
        break;
      case 'success':
        themeColor = theme.success?.get();
        break;
      case 'primary':
        themeColor = theme.color?.get();
        // Fix: If theme doesn't match color scheme, use correct color
        if (isDark && themeColor === '#111827') themeColor = '#F9FAFB';
        if (!isDark && themeColor === '#F9FAFB') themeColor = '#111827';
        break;
      default:
        // If it's a direct color string, use it
        if (typeof colorProp === 'string' && colorProp.length > 0) {
          return colorProp;
        }
        themeColor = theme.color?.get();
        if (isDark && themeColor === '#111827') themeColor = '#F9FAFB';
        if (!isDark && themeColor === '#F9FAFB') themeColor = '#111827';
        break;
    }
    
    // If theme returned a valid color, use it. Otherwise use a simple fallback
    if (typeof themeColor === 'string' && themeColor.length > 0) {
      return themeColor;
    }
    
    // Simple fallback only if theme fails
    return isDark ? '#F9FAFB' : '#111827';
  };
  
  const variantStyle = getVariantStyle();
  const finalColor = getColor();
  
  // Convert Tamagui-like spacing tokens to numbers
  const convertSpacing = (val?: number | string): number | undefined => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const spacingMap: Record<string, number> = {
        '$xs': 4, '$sm': 8, '$md': 16, '$lg': 24, '$xl': 32, '$xxl': 48
      };
      return spacingMap[val] || undefined;
    }
    return undefined;
  };
  
  // Build final style - SIMPLIFIED
  const finalStyle: TextStyle = {
    ...variantStyle,
    color: finalColor,
    ...(fontSize && { fontSize: typeof fontSize === 'number' ? fontSize : variantStyle.fontSize }),
    ...(fontWeight && { fontWeight }),
    ...(textAlign && { textAlign }),
    ...(lineHeight && { lineHeight }),
    ...(marginBottom && { marginBottom: convertSpacing(marginBottom) }),
    ...(marginTop && { marginTop: convertSpacing(marginTop) }),
    ...(marginLeft && { marginLeft: convertSpacing(marginLeft) }),
    ...(marginRight && { marginRight: convertSpacing(marginRight) }),
    ...(style || {}), // Apply custom style last
  };
  
  // Ensure color is set (style might have overridden it with undefined)
  if (!finalStyle.color) {
    finalStyle.color = finalColor;
  }
  
  
  return (
    <RNText
      style={finalStyle}
      {...props}
    >
      {children}
    </RNText>
  );
}

