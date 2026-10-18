import { type Transition, type Variants } from "framer-motion";

/**
 * LIELWAINBERG.COM — Motion Design System Tokens
 * Engineered for cinematic fluidity, structural precision, and zero-jank responsiveness.
 */

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.28,
  slow: 0.45,
  cinematic: 0.75,
  reveal: 0.6,
} as const;

export const MOTION_EASINGS = {
  // Snappy, authoritative deceleration
  out: [0.16, 1, 0.3, 1] as const,
  // Smooth, organic transition between states
  inOut: [0.65, 0, 0.35, 1] as const,
  // Soft camera glide curve
  cinematic: [0.22, 1, 0.36, 1] as const,
  // Subtle tactile spring
  spring: { type: "spring", stiffness: 320, damping: 28 } as const,
  // Gentle floating spring
  springGentle: { type: "spring", stiffness: 180, damping: 24 } as const,
  // Snappy micro-interaction spring
  springMicro: { type: "spring", stiffness: 480, damping: 32 } as const,
};

export const TRANSITIONS = {
  fade: {
    duration: MOTION_DURATIONS.normal,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
  reveal: {
    duration: MOTION_DURATIONS.reveal,
    ease: MOTION_EASINGS.cinematic,
  } satisfies Transition,
  page: {
    duration: MOTION_DURATIONS.slow,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
};

export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITIONS.fade },
  } satisfies Variants,

  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.reveal,
    },
  } satisfies Variants,

  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.reveal,
    },
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: MOTION_DURATIONS.slow,
        ease: MOTION_EASINGS.out,
      },
    },
  } satisfies Variants,

  staggerContainer: (staggerChildren = 0.08, delayChildren = 0): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),

  // Subtle magnetic hover for cards and interactive surfaces
  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -4,
      scale: 1.008,
      transition: {
        duration: MOTION_DURATIONS.fast,
        ease: MOTION_EASINGS.out,
      },
    },
  } satisfies Variants,

  // Button tactile press
  buttonPress: {
    rest: { scale: 1 },
    tap: {
      scale: 0.97,
      transition: { duration: MOTION_DURATIONS.instant },
    },
  } satisfies Variants,
};
