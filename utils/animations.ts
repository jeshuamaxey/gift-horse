// Animation utilities and constants
// Based on docs/12-design-philosophy.md animation specifications

export const ANIMATION_DURATIONS = {
  instant: 150,      // Button press
  fast: 200,         // Toggle, checkbox
  normal: 300,       // State changes (default)
  transition: 350,   // Screen navigation
  max: 500,          // Never exceed
} as const;

export const SPRING_CONFIGS = {
  gentle: {
    damping: 20,
    stiffness: 90,
  },
  snappy: {
    damping: 15,
    stiffness: 200,
  },
  bouncy: {
    damping: 10,
    stiffness: 150,
  },
} as const;

// List item entry animation - subtle and fast
export const LIST_ANIMATION = {
  duration: 200, // 200ms - faster, less noticeable
  stagger: 30, // 30ms per item - faster stagger
  translateY: 8, // 8px - much less movement (was 20px)
  maxItems: 20, // Maximum items to animate
} as const;

// Card press feedback
export const CARD_PRESS = {
  scale: 0.95,
  duration: ANIMATION_DURATIONS.instant, // 150ms
  spring: SPRING_CONFIGS.snappy, // damping: 15, stiffness: 200
} as const;

// Screen transitions
export const SCREEN_TRANSITION = {
  duration: ANIMATION_DURATIONS.transition, // 350ms
  easing: 'decelerate' as const,
} as const;

// Status change
export const STATUS_CHANGE = {
  duration: ANIMATION_DURATIONS.normal, // 300ms
} as const;

