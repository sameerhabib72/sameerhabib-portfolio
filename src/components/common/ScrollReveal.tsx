import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { smoothEase } from '../../utils/animationVariants';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  withBlur?: boolean;
  className?: string;
}

/**
 * ScrollReveal Component
 * Wraps content with IntersectionObserver-driven entrance animations.
 * Provides a luxurious blur-to-sharp fade with smooth cubic-bezier easing.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 28,
  duration = 0.65,
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  withBlur = true,
  className = '',
  ...motionProps
}) => {
  const [containerRef, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce
  });

  // Calculate transform offsets based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialTransform();

  return (
    <motion.div
      ref={containerRef}
      initial={{
        opacity: 0,
        ...initialOffset,
        filter: withBlur ? 'blur(6px)' : 'none'
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)'
            }
          : {
              opacity: 0,
              ...initialOffset,
              filter: withBlur ? 'blur(6px)' : 'none'
            }
      }
      transition={{
        duration,
        delay,
        ease: smoothEase
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
