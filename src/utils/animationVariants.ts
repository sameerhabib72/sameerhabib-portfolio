import { Variants } from 'motion/react';

/**
 * Standard cubic-bezier curves for polished UI animations
 */
export const smoothEase = [0.22, 1, 0.36, 1] as const; // easeOutCubic
export const gentleSpring = [0.16, 1, 0.3, 1] as const; // gentle natural deceleration

/**
 * Container variant that staggers all its direct or nested motion children
 */
export const staggerContainer = (staggerDelay = 0.1, initialDelay = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/**
 * Fast container stagger for dense items like pills, badges, or list items
 */
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

/**
 * Fade up animation for headings, cards, and section blocks
 */
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/**
 * Soft fade up for smaller typography or badges
 */
export const softFadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

/**
 * Slide and fade from the left
 */
export const slideInLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/**
 * Slide and fade from the right
 */
export const slideInRightVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/**
 * Scale and fade up for project cards and highlighted modules
 */
export const cardRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/**
 * Timeline node pop-in animation
 */
export const timelineDotVariant: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

/**
 * Subtle hover & tap micro-interaction props for Primary CTA buttons
 */
export const primaryButtonHoverProps = {
  whileHover: {
    scale: 1.03,
    y: -1.5,
    transition: { type: 'spring', stiffness: 450, damping: 25 },
  },
  whileTap: {
    scale: 0.975,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
  },
};

/**
 * Subtle hover & tap micro-interaction props for Secondary CTA buttons
 */
export const secondaryButtonHoverProps = {
  whileHover: {
    scale: 1.025,
    y: -1,
    transition: { type: 'spring', stiffness: 450, damping: 25 },
  },
  whileTap: {
    scale: 0.98,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
  },
};

/**
 * Subtle hover & tap micro-interaction props for subtle / icon / pill buttons
 */
export const subtleButtonHoverProps = {
  whileHover: {
    scale: 1.04,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  whileTap: {
    scale: 0.96,
  },
};

