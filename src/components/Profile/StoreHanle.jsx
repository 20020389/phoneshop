import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  FormLabel,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useKey } from '../../hooks/useKey';
import { useMyForm } from '../../hooks/useMyForm';
import { http } from '../../lib/axios';
import { MyButton } from '../button';

export function StoreHandle({ isOpen, onClose }) {
  const key = useKey(isOpen);

  return <StoreHandleState key={key} isOpen={isOpen} onClose={onClose} />;
}

function StoreHandleState({ isOpen, onClose }) {
  const { register, handleSubmit, error, isSubmitting } = useMyForm();
  const toast = useToast();

  async function submit(e, { setSubmitting }) {
    console.log(e);
    http
      .post('/api/store', e)
      .then(() => {
        toast({
          description: 'Thêm cửa hàng thành công',
          status: 'success',
        });
        onClose();
      })
      .catch((e) => {
        console.log(e);
        toast({
          description: 'Thêm cửa hàng thất bại',
          status: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm cửa hàng</ModalHeader>
        <ModalBody pb="20px">
          <form onSubmit={handleSubmit(submit)} className="flex gap-3 flex-col">
            <div>
              <FormLabel>Tên cửa hàng</FormLabel>
              <Input type="text" {...register('name', { required: true })} />
              <Text fontSize="0.8em" color="red.400">
                {error.name}
              </Text>
            </div>
            <div>
              <FormLabel>Địa chỉ</FormLabel>
              <Input
                type="text"
                {...register('location', { required: true })}
              />
              <Text fontSize="0.8em" color="red.400">
                {error.location}
              </Text>
            </div>
            <div>
              <FormLabel>Khu vực</FormLabel>
              <Select
                {...register('group', { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  Chọn khu vực
                </option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              </Select>
              <Text fontSize="0.8em" color="red.400">
                {error.group}
              </Text>
            </div>
            <MyButton isLoading={isSubmitting} type="submit">
              submit
            </MyButton>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
