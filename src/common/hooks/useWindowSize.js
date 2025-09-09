import { useState, useEffect } from 'react';

/**
 * Returns width and height of current window width.
 * Updates accordingly when window resizes.
 */
const breakpoint = (width) => {
  if (width < 600) return 'small';
  if (width >= 1200) return 'large';
  return 'medium';
};
export function useWindowSize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    breakpoint: breakpoint(window.innerWidth),
  });

  useEffect(() => {
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize({
        height,
        width,
        breakpoint: breakpoint(width),
      });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
