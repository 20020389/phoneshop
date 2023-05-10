import { useMemo } from 'react';
import useSWR from 'swr';

/**
 *
 * @param {{
 * max?: number}} storeId
 * @returns {{
 *  phones: Phone[],
 *  isLoading: boolean;
 *  error: boolean;
 *  mutate: () => void;
 * }}
 */
export function useNewestPhone({ max } = {}) {
  const url = max ? `/api/phones/newest?limit=${max}` : '/api/phones/newest';
  const { data, isLoading, error, mutate } = useSWR(url);

  console.log(data);

  const listPhone = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item) => {
      try {
        item.images = JSON.parse(item.images);
      } catch (error) {}
      return item;
    });
  }, [data]);

  return {
    phones: listPhone,
    isLoading,
    error,
    mutate,
  };
}
