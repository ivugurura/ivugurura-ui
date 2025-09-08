import { useState, useEffect, useCallback } from 'react';

/**
 * Returns width and height of current window width.
 * Updates accordingly when window resizes.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    breakpoint: 'medium',
  });

  const breakpoint = useCallback(() => {
    const w = window.innerWidth;
    if (w < 600) return 'small';
    if (w < 1024) return 'medium';
    return 'large';
  }, []);

  useEffect(() => {
    function onResize() {
      const bp = breakpoint();
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
        breakpoint: bp,
      });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return size;
}
