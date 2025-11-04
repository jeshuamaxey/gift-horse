import { ComponentProps } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Card } from './Card';
import { CARD_PRESS } from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type AnimatedCardProps = ComponentProps<typeof Card> & {
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'none';
};

export function AnimatedCard({ 
  children, 
  onPress, 
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  ...props 
}: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const reducedMotion = useReducedMotion();

  // Use instant animation (< 100ms) if reduced motion is enabled
  const animationDuration = reducedMotion ? 50 : CARD_PRESS.duration;

  const tap = Gesture.Tap()
    .enabled(!disabled && !!onPress)
    .onBegin(() => {
      if (reducedMotion) {
        // Instant state change for reduced motion
        scale.value = 1;
      } else {
        scale.value = withTiming(CARD_PRESS.scale, { 
          duration: animationDuration 
        });
      }
    })
    .onEnd(() => {
      if (reducedMotion) {
        scale.value = 1;
      } else {
        scale.value = withSpring(1, CARD_PRESS.spring);
      }
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      // Ensure we return to scale 1 if gesture is cancelled
      if (!reducedMotion) {
        scale.value = withSpring(1, CARD_PRESS.spring);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!onPress) {
    // If no onPress handler, return regular Card
    return <Card {...props}>{children}</Card>;
  }

  return (
    <GestureDetector gesture={tap}>
      <Animated.View 
        style={animatedStyle}
        accessible={!!onPress}
        accessibilityRole={onPress ? accessibilityRole : 'none'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled }}
      >
        <Card {...props}>{children}</Card>
      </Animated.View>
    </GestureDetector>
  );
}

