import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { http } from '../../lib/axios';
import { convertTime } from '../../lib/util';
import { BuyPhoneModal } from '../Phone/BuyPhoneModal';
import { StoreHandle } from './StoreHanle';

/**
 *
 * @param {{
 *  data: Transaction;
 *  index: number;
 *  refresh?: () => void
 * }} param0
 * @returns
 */
export function StoreTransactionRow({ data, index, refresh }) {
  const toast = useToast();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isUpdating, setUpdating] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('SUCCESS');

  function updateTransactionStatus(status) {
    setUpdating(true);
    http
      .post(`/api/store/id/${data.store?.uid}/transactions/${data.uid}`, {
        status,
      })
      .then(() => {
        toast({
          description: 'Cập nhật đơn hàng thành công',
          status: 'success',
        });
        refresh();
        setIsOpenUpdate(false);
      })
      .catch(() => {
        toast({
          description: 'Xóa đơn hàng thất bại',
          status: 'error',
        });
      })
      .finally(() => setUpdating(false));
  }

  return (
    <>
      <tr key={data.id} className="h-[50px] border-t-[1px]">
        <td className="font-[500] text-center">{index + 1}</td>
        <td className="font-[500] text-center">
          <BuyPhoneModal
            type="view"
            offer={data?.products?.at(0)}
            storeId={data?.store?.uid}
            userId="user"
            // @ts-ignore
            data={data.products.at(0)}
          >
            <div className="hover:text-blue-500 cursor-pointer">
              {data.products?.at(0)?.name}
            </div>
          </BuyPhoneModal>
        </td>
        <td className="font-[500] text-center">{data.user?.name}</td>
        <td className="font-[500] text-center">
          {data.status === 'PROCESSING' ? (
            <Badge colorScheme="blue" className="!p-[3px_10px] !text-[12px]">
              Đang chờ
            </Badge>
          ) : data.status === 'REFUSE' ? (
            <Badge colorScheme="red" className="!p-[3px_10px] !text-[12px]">
              Thất bại
            </Badge>
          ) : (
            <Badge colorScheme="green" className="!p-[3px_10px] !text-[12px]">
              Thành công
            </Badge>
          )}
        </td>

        <td className="font-[500] text-center">{data.store?.location}</td>
        <td className="font-[500] text-center">{data.store?.group}</td>
        <td className="font-[500] text-center">
          <Tooltip
            placement="top"
            maxW={150}
            label={convertTime(data.updateAt)}
          >
            {new Date(data.updateAt).toLocaleDateString()}
          </Tooltip>
        </td>
        <td className="font-[500] text-center">
          <Tooltip
            placement="top"
            maxW={150}
            label={convertTime(data.createAt)}
          >
            {new Date(data.createAt).toLocaleDateString()}
          </Tooltip>
        </td>
        <td className="items-center">
          {data.status === 'PROCESSING' && (
            <div className="w-full h-full flex items-center justify-center gap-3">
              <button
                className="text-green-400"
                onClick={() => {
                  setIsOpenUpdate(true);
                  setSelectedStatus('SUCCESS');
                }}
              >
                <BiCheck size="1.5em" />
              </button>
              <button
                className="text-red-400"
                onClick={() => {
                  setIsOpenUpdate(true);
                  setSelectedStatus('REFUSE');
                }}
              >
                <IoClose size="1.5em" />
              </button>
            </div>
          )}
        </td>
      </tr>
      <Modal
        isOpen={isOpenUpdate}
        onClose={() => {
          setIsOpenUpdate(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Cập nhật đơn hàng</Text>
          </ModalHeader>
          <ModalBody>
            <Text>
              Bạn có chắc chắn muốn cập nhật đơn hàng với sản phẩm{' '}
              <span className="font-bold">{data.products?.at(0).name}</span>{' '}
              thành{' '}
              <Badge
                colorScheme={selectedStatus === 'SUCCESS' ? 'green' : 'red'}
              >
                {selectedStatus === 'SUCCESS' ? 'Thành công' : 'Thất bại'}
              </Badge>
            </Text>
          </ModalBody>
          <ModalFooter gap="10px">
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpenUpdate(false);
              }}
            >
              Hủy
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => updateTransactionStatus(selectedStatus)}
              isLoading={isUpdating}
            >
              Đồng ý
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
