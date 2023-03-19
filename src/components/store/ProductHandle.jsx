import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useKey } from '../../hooks/useKey';
import { useMyForm } from '../../hooks/useMyForm';
import { UploadImage } from '../../upload/Upload';

/**@param {ProductHandleProps} p */
export function ProductHandle({ isOpen, onClose, type = 'create' }) {
  const key = useKey();

  return (
    <ProductHandleState
      key={key}
      isOpen={isOpen}
      onClose={onClose}
      type={type}
    />
  );
}
/**@param {ProductHandleProps} p */
function ProductHandleState({ isOpen, onClose, type = 'create' }) {
  /**@type {UploadRef} */
  const uploadRef = useRef(null);
  const { register, handleSubmit } = useMyForm();

  async function submit() {
    const images = await uploadRef.current?.submit();
    console.log(images);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          {type === 'create' ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">Ảnh:</h2>
              <UploadImage ref={uploadRef} />
            </div>
            <div className="mt-3 w-full flex justify-end">
              <Button type="submit" colorScheme="blue">
                submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
