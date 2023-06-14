import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useKey } from '../../hooks/useKey';
import { useMyForm } from '../../hooks/useMyForm';
import { UploadImage } from '../../upload/Upload';
import { GithubPicker, TwitterPicker } from 'react-color';
import { BiPlus } from 'react-icons/bi';
import { Offer } from './Offer';
import { PhoneOffers } from './PhoneOffers';
import { http } from '../../lib/axios';

/**@param {ProductHandleProps} p */
export function ProductHandle({
  storeId,
  isOpen,
  onClose,
  type = 'create',
  refetch,
}) {
  const key = useKey(isOpen);

  return (
    <ProductHandleState
      storeId={storeId}
      key={key}
      isOpen={isOpen}
      onClose={onClose}
      type={type}
      refetch={refetch}
    />
  );
}
/**@param {ProductHandleProps} p */
function ProductHandleState({
  isOpen,
  onClose,
  type = 'create',
  storeId,
  refetch,
}) {
  /**@type {UploadRef} */
  const uploadRef = useRef(null);
  const offersRef = useRef(null);
  const { register, handleSubmit, error } = useMyForm();

  const [uploading, setUploading] = useState(false);

  async function submit(e) {
    setUploading(true);
    try {
      const images = await uploadRef.current?.submit();
      const offers = await offersRef.current?.submit();
      e.images = JSON.stringify(images);
      e.phoneoffers = offers;
      http
        .post(`/api/store/id/${storeId}/phones`, e)
        .then((res) => {
          console.log(res);
          onClose();
          refetch && refetch();
        })
        .catch((err) => {
          setUploading(false);
        });
    } catch (error) {
    } finally {
      setUploading(false);
    }
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
        <ModalBody display="flex">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-between flex-grow-[1]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold">Ảnh:</h2>
                <UploadImage ref={uploadRef} />
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold">Tên:</h2>
                <Input
                  {...register('name', { required: true, name: 'tên' })}
                  placeholder="Eg: Iphone 14 Pro Max"
                />
                <p className="text-[0.8em] text-red-400">{error.name}</p>
              </div>
              <PhoneOffers ref={offersRef} {...register('offers')} />
            </div>
            <div className="mt-3 w-full flex justify-end">
              <Button isLoading={uploading} type="submit" colorScheme="blue">
                submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
