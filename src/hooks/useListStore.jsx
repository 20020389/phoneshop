import useSWR from 'swr';

export function useListStore() {
  const { data, isLoading, error, mutate } = useSWR('/api/user/stores');

  return {
    stores: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
