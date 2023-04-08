import useSWR from 'swr';

export function useCartData() {
  const { data, isLoading, error, mutate } = useSWR(`/api/user/cart`);

  return {
    cart: data,
    isLoading,
    error,
    mutate,
  };
}
