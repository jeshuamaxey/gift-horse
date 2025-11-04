import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Hook to detect if the user has enabled reduced motion preference
 * Returns true if reduced motion is enabled
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial state
    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (event) => {
        setReducedMotion(event);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}

