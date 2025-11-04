import { ComponentProps } from 'react';
import { Text as RNText } from 'react-native';
import { YStack, styled, useTheme } from 'tamagui';
import { Text } from './Text';

// Avatar component for emoji or initials display
const StyledAvatar = styled(YStack, {
  name: 'Avatar',
  borderRadius: '$full',  // Circular from design philosophy
  justifyContent: 'center',
  alignItems: 'center',
  
  variants: {
    size: {
      small: {
        width: 32,
        height: 32,
      },
      medium: {
        width: 48,
        height: 48,
      },
      large: {
        width: 64,
        height: 64,
      },
      xlarge: {
        width: 96,
        height: 96,
      },
    },
  },
  
  defaultVariants: {
    size: 'medium',
  },
});

// Helper to get initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type AvatarProps = ComponentProps<typeof StyledAvatar> & {
  name?: string;
  emoji?: string | null;
};

export function Avatar({ 
  name,
  emoji,
  size = 'medium',
  ...props 
}: AvatarProps) {
  const theme = useTheme();
  
  // Font size based on avatar size
  const getFontSize = () => {
    switch (size) {
      case 'small': return '$3';
      case 'large': return '$6';
      case 'xlarge': return '$8';
      case 'medium':
      default: return '$4';
    }
  };
  
  // Emoji font size (slightly larger)
  const getEmojiFontSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      case 'xlarge': return 48;
      case 'medium':
      default: return 24;
    }
  };
  
  return (
    <StyledAvatar
      size={size}
      backgroundColor={theme.background05?.get()}
      overflow="visible"
      {...props}
    >
      {emoji ? (
        <RNText style={{ fontSize: getEmojiFontSize(), lineHeight: getEmojiFontSize() }}>
          {emoji}
        </RNText>
      ) : (
        <Text 
          variant={'bodyEmphasis' as const}
          fontSize={getFontSize()}
          color={'secondary' as const}
        >
          {name ? getInitials(name) : '?'}
        </Text>
      )}
    </StyledAvatar>
  );
}

