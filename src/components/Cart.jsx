import {
  Button,
  Checkbox,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { GrFormClose } from 'react-icons/gr';
import { useCartData } from '../hooks/useCart';

// /**
//  *
//  * @param {{
//  *  data: Cart<string>
//  *  update?: () => void;
//  * }} param0
//  */
function Cart({}, ref) {
  const { cart, mutate: refetchCart } = useCartData();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [buyItems, setBuyItems] = useState([]);

  useImperativeHandle(ref, () => ({
    refetch: refetchCart,
  }));

  function updateIndex(index, value) {
    setBuyItems((prev) => {
      const list = [...prev];
      list[index] = value;
      return list;
    });
  }

  function setAllBuyItem(value) {
    setBuyItems((prev) => {
      const listCheckbox = [...prev];
      const listCart = Array.isArray(cart) ? cart : [];
      listCart.forEach((_, index) => {
        listCheckbox[index] = value;
      });
      console.log(listCheckbox);
      return listCheckbox;
    });
  }

  const renderCart = useMemo(() => {
    /**@type {Cart<string>} */
    const list = Array.isArray(cart) ? cart : [];

    return list.map((item, i) => {
      let images = item.images;
      if (images && typeof images == 'string') {
        images = JSON.parse(images);
      }

      return (
        <div
          className="h-[50px] flex gap-2 items-center justify-between"
          key={item.uid}
        >
          <div className="flex gap-2 items-center">
            <Checkbox
              isChecked={buyItems[i]}
              onChange={(e) => updateIndex(i, e.target.checked)}
            />
            <div className="w-[40px] h-[40px]">
              <img
                src={images[0]}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>{item.name}</div>
          </div>
          {item.count && (
            <div className="pl-2 flex items-center">
              <GrFormClose />
              {item.count}
            </div>
          )}
        </div>
      );
    });
  }, [cart, buyItems]);

  const isCheckAll = useMemo(() => {
    if (buyItems.length == 0) {
      return false;
    }
    return buyItems.every((item) => item);
  }, [buyItems]);

  const canBuy = useMemo(() => {
    if (buyItems.length == 0) {
      return false;
    }
    return !buyItems.every((item) => !item);
  }, [buyItems]);

  return (
    <div className="mr-1">
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <button
            className="relative w-[40px] h-[40px] rounded-full flex items-center justify-center
                      cursor-pointer"
          >
            <RiShoppingCartLine size="20px" />
            {cart && (
              <span className="absolute top-0 right-0 translate-x-[20%]  translate-y-[-30%]">
                <span className="p-[0px_6px] bg-[red] text-[white] text-[0.75em] rounded-full">
                  {cart.length}
                </span>
              </span>
            )}
          </button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent className="overflow-visible !w-min !pr-[100px] !bg-transparent !border-none !shadow-none">
            <PopoverArrow />
            <div className="bg-white min-h-[200px] min-w-[600px] p-[15px_20px] rounded-[5px]">
              <div className="">
                <div className="font-bold text-center">Giỏ hàng của bạn</div>
                <Divider className="!mt-3 !mb-2" />
                <div className="w-full h-full">{renderCart}</div>
                <Divider className="!mt-2 !mb-3" />
                <div className="w-full flex items-center justify-between">
                  <div>
                    <Checkbox
                      isChecked={isCheckAll}
                      onChange={(e) => setAllBuyItem(e.target.checked)}
                    >
                      {isCheckAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                    </Checkbox>
                  </div>
                  <div>
                    <Button
                      colorScheme="purple"
                      className="!h-[35px]"
                      isDisabled={!canBuy}
                    >
                      Mua
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Portal>
      </Popover>
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_0.4)]"
              onClick={onClose}
            >
              <div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}

export default memo(forwardRef(Cart));
