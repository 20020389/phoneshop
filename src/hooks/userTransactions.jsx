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
export function userTransactions() {
  const { data, isLoading, error, mutate } = useSWR('/api/transaction');

  return {
    transactions: data ?? [],
    isLoading,
    error,
    mutate,
  };
}
