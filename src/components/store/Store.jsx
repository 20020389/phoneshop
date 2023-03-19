import { Button, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useStoreData } from '../../hooks/useStoreData';
import { UploadImage } from '../../upload/Upload';
import { MyButton } from '../button';
import { ProductHandle } from './ProductHandle';

export function Store() {
  const uploadRef = useRef(null);
  const query = useParams();
  const { data } = useStoreData(query.storeid);
  const [isOpenAddProduct, setOpenAddProduct] = useState(false);

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
        <div>
          <MyButton onClick={() => setOpenAddProduct(true)}>
            Thêm sản phẩm
          </MyButton>
        </div>
      </div>
      <div></div>
      <ProductHandle
        isOpen={isOpenAddProduct}
        onClose={() => setOpenAddProduct(false)}
      />
    </div>
  );
}