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
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
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
export function TransactionRow({ data, index, refresh }) {
  const toast = useToast();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  function deleteStore() {
    setDeleting(true);
    http
      .delete(`/api/transaction/${data.uid}`)
      .then(() => {
        toast({
          description: 'Xóa đơn hàng thành công',
          status: 'success',
        });
        refresh();
        setIsOpenDelete(false);
      })
      .catch(() => {
        toast({
          description: 'Xóa đơn hàng thất bại',
          status: 'error',
        });
      })
      .finally(() => setDeleting(false));
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
        <td className="font-[500] text-center">
          {data.status === 'PROCESSING' ? (
            <Badge colorScheme="blue">{data.status}</Badge>
          ) : data.status === 'REFUSE' ? (
            <Badge colorScheme="red">{data.status}</Badge>
          ) : (
            <Badge colorScheme="green">{data.status}</Badge>
          )}
        </td>
        <td className="font-[500] text-center">{data.store?.name}</td>
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
          <div className="w-full h-full flex items-center justify-center gap-3">
            <button
              className="text-red-400"
              onClick={() => setIsOpenDelete(true)}
            >
              <FaTrashAlt size="1.1em" />
            </button>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={isOpenDelete}
        onClose={() => {
          setIsOpenDelete(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Xóa cửa hàng</Text>
          </ModalHeader>
          <ModalBody>
            <Text>
              Bạn có chắc chắn muốn xóa đơn hàng với sản phẩm{' '}
              <span className="text-bold">{data.products?.at(0).name}</span>
            </Text>
          </ModalBody>
          <ModalFooter gap="10px">
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpenDelete(false);
              }}
            >
              Hủy
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteStore}
              isLoading={isDeleting}
            >
              Xóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
