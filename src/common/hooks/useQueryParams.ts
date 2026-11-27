import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

export const useQueryParams = (): Record<string, string> => {
  const { search } = useLocation();

  return useMemo(() => {
    const query = new URLSearchParams(search);
    const p: Record<string, string> = {};
    query.forEach((v, k) => {
      p[k] = v;
    });

    return p;
  }, [search]);
};
