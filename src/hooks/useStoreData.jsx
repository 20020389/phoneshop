import useSWR from 'swr';

/**
 *
 * @param {string} storeId
 * @returns {{
 *  data: StoreData;
 *  isLoading: boolean;
 *  error: Error;
 *  mutate: () => void;
 * }}
 */
export function useStoreData(storeId) {
  const { data, isLoading, error, mutate } = useSWR(`/api/store/id/${storeId}`);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
