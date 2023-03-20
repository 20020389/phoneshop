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
  const offersRef = useRef(null);
  const { register, handleSubmit, error } = useMyForm();

  async function submit(e) {
    // const images = await uploadRef.current?.submit();
    // console.log(images);
    const offers = await offersRef.current?.submit();
    console.log(offers, offersRef);
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
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
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
