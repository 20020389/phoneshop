import lodash, { isArray, isNull, isUndefined } from 'lodash';
import { useMemo, useState } from 'react';
import ImageLoader from '../ImageLoader';
import { Rating } from 'react-simple-star-rating';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { util } from '../../lib/util';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { http } from '../../lib/axios';
import { useStore } from '../../lib/zustand';
import { Link } from 'react-router-dom';

/**
 *
 * @param {{
 *    data: Phone | undefined;
 *    refetch?: () => void;
 * }} props
 */
export function Phone({ data, refetch }) {
  const [isOpenDeletePhone, setOpenDelete] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const image = useMemo(() => {
    if (isArray(data.images)) {
      return data.images[0];
    }

    return data.images;
  }, [data.images]);

  const offer = useMemo(() => {
    if (data.phoneoffers && Array.isArray(data.phoneoffers)) {
      return {
        price: util.formatPrice(
          lodash.min(data.phoneoffers.map((item) => item.price)).toString()
        ),
        count: data.phoneoffers.reduce((prev, current) => {
          return prev + current.count;
        }, 0),
      };
    }

    return {
      count: 0,
      price: 'Chưa có',
    };
  }, [data.phoneoffers]);

  const rating = useMemo(() => {
    const r = parseFloat(data.rating?.toString());
    if (isUndefined(r) || isNull(r) || isNaN(r)) {
      return 0;
    }

    return r;
  }, [data.rating]);

  function deletePhone() {
    setDeleting(true);
    http
      .delete(`/api/phone/id/${data.uid}`)
      .then(() => {
        setDeleting(false);
        setOpenDelete(false);
        refetch && refetch();
      })
      .catch((e) => {
        console.log(e);
        setDeleting(false);
      });
  }

  return (
    <div className="p-[10px]">
      <div className="w-full h-full overflow-hidden">
        <div className="w-full bg-white h-[250px] rounded-[5px] p-[25px_25px] border-[1px] border-[rgba(0,_0,_0,_0.05)] shadow-sm">
          <ImageLoader src={image} />
        </div>
        <div className="p-[10px_0px] flex flex-col gap-1 card">
          <div className="flex relative justify-between items-start gap-2">
            <h2 className="font-bold">{data.name}</h2>
            <div className="w-[30px] flex items-center">
              <Menu>
                <MenuButton className="p-[2px] duration-300">
                  <BsThreeDotsVertical />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setOpenDelete(true)}>
                    Xóa sản phẩm
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <Rating
                size={15}
                style={{ pointerEvents: 'none' }}
                initialValue={rating}
                allowFraction
              />
            </div>
            <div className="p-[0_6px] text-[0.7em] bg-[#2d3748] text-gray-100 rounded-[2px]">
              {rating || 'chưa có'}
            </div>
          </div>
          <div className="text-[0.9em] font-[600]">Giá: {offer.price}</div>
          <div className="text-[0.9em] font-[600]">Số lượng: {offer.count}</div>
        </div>
      </div>
      <Modal isOpen={isOpenDeletePhone} onClose={() => setOpenDelete(false)}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Xóa sản phẩn</ModalHeader>
          <ModalBody>
            Bạn có chắc chắn muốn xóa sản phẩm {data.name} không ?
          </ModalBody>
          <ModalFooter gap="10px">
            <Button onClick={() => setOpenDelete(false)}>Không</Button>
            <Button
              colorScheme="red"
              isLoading={isDeleting}
              onClick={() => deletePhone()}
            >
              Có
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

/**
 *
 * @param {{
 *    data: Phone | undefined;
 *    refetch?: () => void;
 *    size?: "sm" | "md"
 * }} props
 */
export function PhoneProduct({ data, refetch, size = 'md' }) {
  const toast = useToast();
  const user = useStore((store) => store.user);

  const image = useMemo(() => {
    if (isArray(data.images)) {
      return data.images[0];
    }

    return data.images;
  }, [data.images]);

  const offer = useMemo(() => {
    if (data.phoneoffers && Array.isArray(data.phoneoffers)) {
      return {
        price: util.formatPrice(
          lodash.min(data.phoneoffers.map((item) => item.price)).toString()
        ),
        count: data.phoneoffers.reduce((prev, current) => {
          return prev + current.count;
        }, 0),
      };
    }

    return {
      count: 0,
      price: 'Chưa có',
    };
  }, [data.phoneoffers]);

  const rating = useMemo(() => {
    const r = parseFloat(data.rating?.toString());
    if (isUndefined(r) || isNull(r) || isNaN(r)) {
      return 0;
    }

    return r;
  }, [data.rating]);

  function addPhoneToCart() {
    if (user.role !== 'DEFAULT') {
      toast({
        description: 'Bạn không phải là người mua hàng',
        status: 'error',
        title: 'Thất bại',
        position: 'bottom-left',
        isClosable: true,
      });
    }

    http
      .post('/api/user/cart', {
        phoneId: data.uid,
      })
      .then((res) => {
        toast({
          description: 'Thêm sản phẩm vào giỏ hàng thành công',
          status: 'success',
          position: 'bottom-left',
          isClosable: true,
        });
        refetch && refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`p-[10px] ${size == 'md' ? 'text-[16px]' : 'text-[14px]'}`}>
      <div className="w-full h-full">
        <div
          className={`w-full bg-[white] ${
            size == 'md' ? 'h-[250px]' : 'h-[150px]'
          } rounded-[10px] p-[25px_25px]
                        border-[1px] border-[rgba(0,_0,_0,_0.05)] 
                        shadow-[2px_2px_6px_rgba(0,_0,_0,_0.1),-1px_-1px_3px_rgba(0,_0,_0,_0.05)]`}
        >
          <ImageLoader src={image} />
        </div>
        <div className="p-[10px_0px] flex flex-col gap-1 ">
          <div className="flex relative justify-between items-start gap-2">
            <h2 className="font-bold text-[1em]">{data.name}</h2>
            <div className="w-[30px] flex items-center"></div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <Rating
                size={size === 'md' ? 15 : 13}
                style={{ pointerEvents: 'none' }}
                initialValue={rating}
                allowFraction
              />
            </div>
            <div className="p-[0_6px] text-[0.7em] bg-[#2d3748] text-gray-100 rounded-[2px]">
              {rating || 'chưa có'}
            </div>
          </div>
          <div className="text-[0.9em] font-[600]">Giá: {offer.price}</div>
          <div className="text-[0.9em] font-[600]">
            <Link to={`/phones/${data.uid}`}>
              <button
                className={`${
                  size === 'md' ? 'p-[8px_30px]' : 'p-[5px_20px]'
                } rounded-[20px] border-[2px] border-[#f1c489] mt-3 hover:bg-[#e29f48] hover:text-white hover:border-[#e29f48]`}
                // onClick={addPhoneToCart}
              >
                Xem chi tiết
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
