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

/**
 * @param {{
 *    isOpen: boolean;
 *    onClose: () => void;
 *    type?: "create" | "update"
 *    data?: StoreData
 *    onSubmitted: () => void;
 * }} param0
 */
export function StoreHandle({ isOpen, onClose, type, data, onSubmitted }) {
  const key = useKey(isOpen);

  return (
    <StoreHandleState
      key={key}
      isOpen={isOpen}
      onClose={onClose}
      type={type}
      data={data}
      onSubmitted={onSubmitted}
    />
  );
}

/**
 * @param {{
 *    isOpen: boolean;
 *    onClose: () => void;
 *    type?: "create" | "update"
 *    data?: StoreData
 *    onSubmitted: () => void;
 * }} param0
 */
function StoreHandleState({
  isOpen,
  onClose,
  type = 'create',
  data,
  onSubmitted,
}) {
  const { register, handleSubmit, error, isSubmitting } = useMyForm({
    defaultValue: data,
  });
  const toast = useToast();

  async function submit(e, { setSubmitting }) {
    const request =
      type == 'update'
        ? http.put(`/api/store/id/${data.uid}`, e)
        : http.post('/api/store', e);

    request
      .then(() => {
        toast({
          description: 'Thêm cửa hàng thành công',
          status: 'success',
        });
        onSubmitted();
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
            <MyButton isLoading={isSubmitting} mt="20px" type="submit">
              {type === 'update' ? 'Cập nhật' : 'Thêm cửa hàng'}
            </MyButton>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
