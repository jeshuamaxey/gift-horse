import { ComponentProps } from 'react';
import { Platform } from 'react-native';
import { YStack, styled, useTheme } from 'tamagui';

// Card component with elevation from design philosophy
const StyledCard = styled(YStack, {
  name: 'Card',
  borderRadius: '$md',  // 12-16pt from design philosophy
  padding: '$md',
  
  variants: {
    elevation: {
      low: {
        // 2dp shadow from design philosophy
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        // 4dp shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4,
      },
      high: {
        // 8dp shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 8,
        elevation: 8,
      },
      none: {},
    },
    
    bordered: {
      true: {
        borderWidth: 1,
      },
    },
  },
  
  defaultVariants: {
    elevation: 'low',
  },
});

type CardProps = ComponentProps<typeof StyledCard> & {
  children: React.ReactNode;
};

export function Card({ 
  children,
  bordered = false,
  style,
  ...props 
}: CardProps) {
  const theme = useTheme();
  
  // Extract elevation from props, defaulting to 'low' if not specified
  const elevation = (props.elevation as 'low' | 'medium' | 'high' | 'none') || 'low';
  
  // iOS shadows are more prominent, so we reduce opacity and radius on iOS
  const getShadowOverrides = () => {
    if (Platform.OS !== 'ios' || elevation === 'none') {
      return {};
    }
    
    const shadowOverrides: Record<string, { shadowOpacity: number; shadowRadius: number }> = {
      low: { shadowOpacity: 0.04, shadowRadius: 1 },
      medium: { shadowOpacity: 0.06, shadowRadius: 2 },
      high: { shadowOpacity: 0.08, shadowRadius: 4 },
    };
    
    return shadowOverrides[elevation] || {};
  };
  
  const shadowOverrides = getShadowOverrides();
  
  return (
    <StyledCard
      backgroundColor={theme.background?.get()}
      borderColor={bordered ? theme.borderColor?.get() : undefined}
      bordered={bordered}
      style={[
        style,
        shadowOverrides,
      ]}
      {...props}
    >
      {children}
    </StyledCard>
  );
}

