import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Custom React Hook for IntersectionObserver-based scroll animations.
 * Provides reliable, hardware-accelerated visibility triggers with optional
 * one-time latching, custom thresholds, and reduced-motion safety.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean, IntersectionObserverEntry | null] {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
    disabled = false,
    onIntersect
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    // Respect user's reduced-motion accessibility preference
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // If already triggered once, do not re-observe
    if (triggerOnce && hasTriggeredRef.current) {
      setIsInView(true);
      return;
    }

    // Fallback if browser lacks IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (!firstEntry) return;

        setEntry(firstEntry);

        if (firstEntry.isIntersecting) {
          setIsInView(true);
          hasTriggeredRef.current = true;
          onIntersect?.(firstEntry);

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled, onIntersect]);

  return [elementRef, isInView, entry];
}
