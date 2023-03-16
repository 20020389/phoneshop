import {
  Avatar,
  AvatarBadge,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsCameraFill } from 'react-icons/bs';
import { http } from '../../lib/axios';
import { uploadFile } from '../../lib/upload';
import { useStore } from '../../lib/zustand';

/**
 * @param {ProfileProps} props
 */
export function EditProfile({ isOpen, onOpenChange }) {
  const { user, setUser } = useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
  const imageRef = useRef(document.createElement('input'));
  const avatarRef = useRef(null);
  const toast = useToast();

  /** @type {EditProfileUseForm} */
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    file: undefined,
    src: undefined,
  });
  const [error, setError] = useState({
    name: undefined,
    phoneNumber: undefined,
    global: undefined,
  });

  useEffect(() => {
    imageRef.current.type = 'file';
    imageRef.current.accept = 'image/*';
    function hanle(e) {
      /**@type {HTMLInputElement} */
      const target = e.target;

      if (target.files.length > 0) {
        setImage((prev) => {
          if (prev.src) {
            URL.revokeObjectURL(prev.src);
          }
          return {
            file: target.files[0],
            src: URL.createObjectURL(target.files[0]),
          };
        });

        if (avatarRef.current) {
          avatarRef.current.setAttribute('data-loaded', 'true');
        }
      } else {
        setImage((prev) => {
          return {
            file: undefined,
            src: undefined,
          };
        });

        if (avatarRef.current) {
          avatarRef.current.removeAttribute('data-loaded');
        }
      }
    }

    imageRef.current.addEventListener('change', hanle);

    return () => {
      imageRef.current.removeEventListener('change', hanle);
    };
  }, [imageRef.current]);

  useEffect(() => {
    return () => {
      if (image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  function picker(e) {
    e.stopPropagation();
    imageRef.current.click();
  }

  async function submit(e) {
    if (e.name == '') {
      updateError('name', 'Tên không hợp lệ');
      return;
    }

    const phoneReg = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);

    if (!phoneReg.test(e.phoneNumber)) {
      updateError('phoneNumber', 'Số điện thoại không hợp lệ');
      return;
    }

    setLoading(true);

    if (image.src) {
      try {
        e.image = await uploadFile(image.file, user.image);
      } catch (error) {
        console.log(error);
        toast({
          description: 'Upload failed',
          status: 'error',
        });
      }
    }
    try {
      const res = await http.post('/api/user', e);
      const data = res.data;
      setUser(data.data);
      onOpenChange(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        updateError('global', err.response.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function updateError(field, value) {
    setError({ ...error, global: undefined, [field]: value });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thông tin cá nhân</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          paddingBottom="18px"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col gap-3 pb-5">
            <div className="flex justify-center">
              <Avatar
                key={image.src ?? user.image}
                ref={avatarRef}
                size="2xl"
                name={user.name}
                src={image.src ?? user.image}
                className="border-[3px] !border-gray-200 cursor-pointer"
                onClick={picker}
              >
                <AvatarBadge
                  w="26px"
                  h="26px"
                  overflow="hidden"
                  border="none"
                  transform="translate(-25%, -25%)"
                >
                  <div className="text-[16px] bg-gray-300 w-full h-full flex items-center justify-center">
                    <BsCameraFill className="fill-[rgba(0,_0,_0,_0.7)]" />
                  </div>
                </AvatarBadge>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-[500] text-gray-500">Email</span>
              <Input
                defaultValue={user.email}
                readOnly
                placeholder="Ex: person@gmail.com"
                border="2px solid"
                borderColor="gray.300"
                height="45px"
                _focus={{ boxShadow: 'none', borderColor: '#80BEFC' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-[500] text-gray-500">Tên</span>
              <Tooltip
                label={error.name}
                bg="red.500"
                hasArrow
                placement="top"
                isOpen={error.name != undefined}
              >
                <Input
                  {...register('name')}
                  onChange={(e) => {
                    register('name').onChange(e);
                    updateError('name', undefined);
                  }}
                  defaultValue={user.name}
                  placeholder="Ex: John Dove"
                  border="2px solid"
                  borderColor={!error.name ? 'gray.300' : 'red.300'}
                  height="45px"
                  _hover={{
                    borderColor: !error.name ? 'gray.400' : 'red.300',
                  }}
                  _focus={{
                    boxShadow: 'none',
                    borderColor: !error.name ? '#80BEFC' : 'red.300',
                  }}
                />
              </Tooltip>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-[500] text-gray-500">Số điện thoại</span>
              <Tooltip
                label={error.phoneNumber}
                bg="red.500"
                hasArrow
                placement="top"
                isOpen={error.phoneNumber != undefined}
              >
                <Input
                  {...register('phoneNumber')}
                  onChange={(e) => {
                    register('phoneNumber').onChange(e);
                    updateError('phoneNumber', undefined);
                  }}
                  defaultValue={user.phoneNumber}
                  placeholder="Chưa có thông tin"
                  border="2px solid"
                  borderColor={!error.phoneNumber ? 'gray.300' : 'red.300'}
                  height="45px"
                  _hover={{
                    borderColor: !error.phoneNumber ? 'gray.400' : 'red.300',
                  }}
                  _focus={{
                    boxShadow: 'none',
                    borderColor: !error.phoneNumber ? '#80BEFC' : 'red.300',
                  }}
                />
              </Tooltip>
            </div>
          </div>
          {error.global && <div className="text-red-500">{error.global}</div>}
          <div className="flex justify-end items-center gap-3">
            <Button
              colorScheme="red"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Cập nhật
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
