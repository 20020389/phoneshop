import React, { memo, useMemo } from 'react';
import { useSWRConfig } from 'swr';

import '../CSS/body.css';
import { useNewestPhone } from '../hooks/useNewestPhone';
import { PhoneProduct } from './store/Phone';

/**
 *
 * @param {{
 *  refetchCart?: () => void;
 * }} props
 * @returns
 */
function Body({}) {
  const { phones, mutate: refetchPhones } = useNewestPhone();
  const { mutate } = useSWRConfig();

  function refetchCart() {
    mutate('/api/user/cart');
  }

  const renderPhones = useMemo(() => {
    if (!phones || phones.length === 0) {
      return <></>;
    }

    return phones.map((phone) => (
      <PhoneProduct key={phone.uid} refetch={refetchCart} data={phone} />
    ));
  }, [phones]);

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="phone-grid">{renderPhones}</div>
    </div>
  );
}
export default memo(Body);
