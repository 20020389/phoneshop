import { useMemo } from 'react';
import useSWR from 'swr';

/**
 *
 * @param {string} storeId
 * @returns {{
 *  phones: Phone[],
 *  isLoading: boolean;
 *  error: boolean;
 *  mutate: () => void;
 * }}
 */
export function useNewestPhone() {
  const { data, isLoading, error, mutate } = useSWR(`/api/phones/newest`);

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
