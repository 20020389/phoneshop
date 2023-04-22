import { useMemo } from 'react';
import useSWR from 'swr';

/**
 *
 * @param {string} phoneId
 * @returns {{
 *  phoneData?: Phone;
 *  isLoading: boolean;
 *  error: any,
 *  mutate: () => void;
 * }}
 */
export function usePhone(phoneId) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/phones/id/${phoneId}`
  );

  const phoneData = useMemo(() => {
    const p = data;
    if (p && p.images && typeof p.images === 'string') {
      p.images = JSON.parse(p.images);
    }

    return p;
  }, [data]);

  return {
    phoneData,
    isLoading,
    error,
    mutate,
  };
}
