import { Button, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useListPhone } from '../../hooks/useListPhone';
import { useStoreData } from '../../hooks/useStoreData';
import { UploadImage } from '../../upload/Upload';
import { MyButton } from '../button';
import { Phone } from './Phone';
import { ProductHandle } from './ProductHandle';

export function Store() {
  const uploadRef = useRef(null);
  const query = useParams();
  const { data } = useStoreData(query.storeid);
  const { phones, mutate: refetchPhones } = useListPhone(query.storeid);
  const [isOpenAddProduct, setOpenAddProduct] = useState(false);

  const renderPhones = useMemo(() => {
    if (!phones || phones.length === 0) {
      return <></>;
    }

    return phones.map((phone) => (
      <Phone key={phone.uid} data={phone} refetch={refetchPhones} />
    ));
  }, [phones]);

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaHome className="mt-[-3px] mr-2" />
          <Link to="/profile">Profile</Link>
          <FiChevronRight />
          <Text fontWeight="500">{data.name}</Text>
        </div>
        <div className="flex items-center gap-2">
          <Link to="transactions">
            <Button className="" variant="outline">
              Danh sách giao dịch
            </Button>
          </Link>
          <MyButton onClick={() => setOpenAddProduct(true)}>
            Thêm sản phẩm
          </MyButton>
        </div>
      </div>
      <div className="flex flex-col min-h-[600px]">
        <div className="phone-grid">{renderPhones}</div>
      </div>
      <ProductHandle
        storeId={query.storeid}
        isOpen={isOpenAddProduct}
        onClose={() => setOpenAddProduct(false)}
        refetch={refetchPhones}
      />
    </div>
  );
}
