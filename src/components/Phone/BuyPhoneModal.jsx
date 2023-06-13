import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Box,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../../lib/axios';

/**
 *
 * @param {{
 *  offer: PhoneOffer;
 *  userId: string;
 *  storeId: string;
 *  data: Phone;
 *  children: any
 *  type?: 'submit' | 'view'
 * }} param0
 */
export function BuyPhoneModal({
  offer,
  storeId,
  userId,
  data,
  children,
  type = 'submit',
}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast({ duration: 5000 });
  const [loading, setLoading] = useState(false);

  function openModal() {
    if (userId) {
      onOpen();
    } else {
      if (confirm('Bạn phải đăng nhập để mua hàng')) {
        navigate('/login');
      }
    }
  }

  function createTransaction() {
    if (type === 'view') {
      return onClose();
    }
    if (offer) {
      setLoading(true);
      http
        .post('/api/transaction', {
          offerId: offer?.uid,
          storeId: storeId,
        })
        .then((res) => {
          toast({
            title: 'Thông báo',
            description: (
              <div>
                Đặt hàng thành công, vui lòng kiểm tra{' '}
                <button
                  className="underline hover:text-blue-300 cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  danh sách đơn hàng
                </button>
              </div>
            ),
            status: 'success',
          });
          onClose();
        })
        .catch(
          /**@param {import('axios').AxiosError} err */ (err) => {
            toast({
              title: 'Thông báo',
              description: err.response?.data?.message ?? 'Đặt hàng thất bại',
              status: 'error',
            });
          }
        )
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      <div className="contents" onClick={openModal}>
        {children}
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {type === 'view' ? 'Thông tin đơn hàng' : 'Xác nhận đơn hàng'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {/* Bạn có chắc chắn muốn mua điện thoại{' '} với giá{' '}
              <span className="text-blue-600 font-[600]">
                {convertToVnd(offer?.price)} đồng.
              </span> */}
              <div className="flex gap-[15px]">
                <div className="flex flex-col">
                  <div className="h-[40px] font-[600] flex items-center">
                    Tên:
                  </div>
                  <div className="h-[40px] font-[600] flex items-center">
                    Màu:
                  </div>
                  <div className="h-[40px] font-[600] flex items-center">
                    Bộ nhớ:
                  </div>
                  <div className="h-[40px] font-[600] flex items-center">
                    Giá:
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-[40px] flex items-center">{data?.name}</div>
                  <div className="h-[40px] flex items-center">
                    <div
                      className={`w-[30px] h-[30px] border-[1px] border-[rgba(0,_0,_0,_0.15)]`}
                      style={{ backgroundColor: offer?.color }}
                    ></div>
                  </div>
                  <div className="h-[40px] flex items-center">
                    <div className="h-[30px] border-[1px] border-[rgba(0,_0,_0,_0.15)] pr-[20px] pl-[17px] flex items-center">
                      {offer?.storage}
                    </div>
                  </div>
                  <div className="h-[40px] flex items-center">
                    {convertToVnd(offer?.price)} đồng
                  </div>
                </div>
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              {type === 'view' ? (
                <Button
                  colorScheme="orange"
                  disabled={loading}
                  onClick={createTransaction}
                  ml={3}
                >
                  Xong
                </Button>
              ) : (
                <>
                  <Button ref={cancelRef} onClick={onClose} disabled={loading}>
                    Hủy
                  </Button>
                  <Button
                    colorScheme="orange"
                    disabled={loading}
                    onClick={createTransaction}
                    ml={3}
                  >
                    Xác nhận
                  </Button>
                </>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function convertToVnd(price) {
  if (!price) {
    return '';
  }

  if (price < 1000) {
    return price;
  } else if (price < 1000000) {
    return Math.floor(price / 1000) + ' nghìn ' + convertToVnd(price % 1000);
  } else if (price < 1000000000) {
    return (
      Math.floor(price / 1000000) + ' triệu ' + convertToVnd(price % 1000000)
    );
  } else {
    return (
      Math.floor(price / 1000000000) + ' tỷ ' + convertToVnd(price % 1000000000)
    );
  }
}
