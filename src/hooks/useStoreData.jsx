import useSWR from 'swr';

export function useStoreData(storeId) {
  const { data, isLoading, error, mutate } = useSWR(`/api/store/id/${storeId}`);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
