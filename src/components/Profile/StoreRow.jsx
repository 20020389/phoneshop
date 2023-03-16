import {
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
import { StoreHandle } from './StoreHanle';

export function StoreRow({ data, index, refresh }) {
  const toast = useToast();
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  function deleteStore() {
    setDeleting(true);
    http
      .delete(`/api/store/id/${data.uid}`)
      .then(() => {
        toast({
          description: 'Xóa cửa hàng thành công',
          status: 'success',
        });
        refresh();
        setIsOpenDelete(false);
      })
      .catch(() => {
        toast({
          description: 'Xóa cửa hàng thất bại',
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
          <Link to={`store/${data.uid}`}>{data.name}</Link>
        </td>
        <td className="font-[500] text-center">{data.location}</td>
        <td className="font-[500] text-center">{data.group}</td>
        <td className="font-[500] text-center">{data.productCount}</td>
        <td className="font-[500] text-center">
          <Tooltip
            placement="top"
            maxW={150}
            label={new Date(data.updateAt).toUTCString()}
          >
            {new Date(data.updateAt).toLocaleDateString()}
          </Tooltip>
        </td>
        <td className="font-[500] text-center">
          <Tooltip
            placement="top"
            maxW={150}
            label={new Date(data.createAt).toUTCString()}
          >
            {new Date(data.createAt).toLocaleDateString()}
          </Tooltip>
        </td>
        <td className="items-center">
          <div className="w-full h-full flex items-center justify-center gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="text-[#828791]"
            >
              <FaEdit size="1.2em" />
            </button>
            <button
              className="text-red-400"
              onClick={() => setIsOpenDelete(true)}
            >
              <FaTrashAlt size="1.1em" />
            </button>
          </div>
        </td>
      </tr>
      <StoreHandle
        isOpen={isOpenEdit}
        type="update"
        data={data}
        onClose={() => {
          setOpenEdit(false);
        }}
        onSubmitted={() => {
          setOpenEdit(false);
          refresh();
        }}
      />
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
              Bạn có chắc chắn muốn xóa{' '}
              <Text as="span" fontWeight="bold">
                {data.name}
              </Text>{' '}
              cùng {data.productCount} sản phẩm trong đó
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
