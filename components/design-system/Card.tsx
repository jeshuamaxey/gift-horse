import { ComponentProps } from 'react';
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
  ...props 
}: CardProps) {
  const theme = useTheme();
  
  return (
    <StyledCard
      backgroundColor={theme.background?.get()}
      borderColor={bordered ? theme.borderColor?.get() : undefined}
      bordered={bordered}
      {...props}
    >
      {children}
    </StyledCard>
  );
}

