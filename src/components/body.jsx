import React, { useMemo } from 'react';

import Div from './div';
import '../CSS/body.css';
import { useNavigate } from 'react-router-dom';
import { useNewestPhone } from '../hooks/useNewestPhone';
import { Phone } from './store/Phone';

function Body() {
  const { phones, mutate: refetchPhones } = useNewestPhone();
  const renderPhones = useMemo(() => {
    if (!phones || phones.length === 0) {
      return <></>;
    }

    return phones.map((phone) => (
      <Phone key={phone.uid} data={phone} refetch={refetchPhones} />
    ));
  }, [phones]);

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="phone-grid">{renderPhones}</div>
    </div>
  );
}
export default Body;
