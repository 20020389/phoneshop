import { useMemo } from 'react';
import useSWR from 'swr';

/**
 *
 * @returns {{
 *  transactions?: Transaction[];
 *  isLoading: boolean;
 *  error: any,
 *  mutate: () => void;
 * }}
 */
export function useStoreTransaction(storeId) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/store/id/${storeId}/transactions`
  );

  return {
    transactions: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
