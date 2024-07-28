import { useWindowSize } from './useWindowSize';

export const useMediaQuery = () => {
  const { width } = useWindowSize();

  return {
    isMobile: width <= 425,
    isTablet: width > 425 && width <= 768,
    isDesktop: width > 768,
  };
};
