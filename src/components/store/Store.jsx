import { Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useStoreData } from '../../hooks/useStoreData';

export function Store() {
  const query = useParams();
  const { data } = useStoreData(query.storeid);

  console.log(data);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="flex items-center">
        <FaHome className="mt-[-3px] mr-2" />
        <Link to="/profile">Profile</Link>
        <FiChevronRight />
        <Text fontWeight="500">{data.name}</Text>
      </div>
    </>
  );
}
