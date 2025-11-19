export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

import { useCallback, useRef } from "react";

/**
 * 用法：const debouncedFn = useDebounce(fn, delay)
 */
export function useDebounce(fn, delay = 300) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const debounced = useRef();
  if (!debounced.current) {
    debounced.current = debounce((...args) => fnRef.current(...args), delay);
  }
  return useCallback((...args) => debounced.current(...args), [delay]);
}

// throttle.js
export function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 用法：const throttledFn = useThrottle(fn, delay)
 */
export function useThrottle(fn, delay = 300) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const throttled = useRef();
  if (!throttled.current) {
    throttled.current = throttle((...args) => fnRef.current(...args), delay);
  }
  return useCallback((...args) => throttled.current(...args), [delay]);
}
