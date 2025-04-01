import { useState, useEffect } from 'react';

import { KEYS } from '../../helpers/constants';

// Custom hook to manage search parameters in the URL
export const useStoreCurrentBook = () => {
  const [params, setParams] = useState({
    currentBook: 1,
    currentPage: 10,
  });

  // Sync state with URL when the component loads or the URL changes
  useEffect(() => {
    const currentBook = localStorage.getItem(KEYS.CURRENT_BOOK) || '';
    const currentPage = localStorage.getItem(KEYS.CURRENT_PAGE) || '';

    setParams({
      currentBook,
      currentPage,
    });
  }, []);

  // Handle setting new parameters
  const setParamValues = (keyValuePair) => {
    const updatedParams = { ...params };
    Object.entries(keyValuePair).forEach(([key, value]) => {
      updatedParams[key] = value;
      localStorage.setItem(key, value);
    });
    setParams(updatedParams);
  };

  return [params, setParamValues];
};
