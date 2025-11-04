import { useRef, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { LIST_ANIMATION } from '@/utils/animations';

/**
 * Hook for animating list items with staggered fade-in
 * @param index - The index of the item in the list
 * @param enabled - Whether the animation should run (default: true)
 * @returns Animated style object to apply to the list item
 */
export function useListAnimation(index: number, enabled: boolean = true) {
  const opacity = useSharedValue(enabled ? 0 : 1);
  const translateY = useSharedValue(enabled ? LIST_ANIMATION.translateY : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (enabled && !hasAnimated.current && index < LIST_ANIMATION.maxItems) {
      hasAnimated.current = true;
      const delay = index * LIST_ANIMATION.stagger;
      
      opacity.value = withDelay(
        delay,
        withTiming(1, { duration: LIST_ANIMATION.duration })
      );
      
      translateY.value = withDelay(
        delay,
        withTiming(0, { duration: LIST_ANIMATION.duration })
      );
    }
  }, [enabled, index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}

