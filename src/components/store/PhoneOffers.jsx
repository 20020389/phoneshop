import { Button } from '@chakra-ui/react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiPlus } from 'react-icons/bi';
import { Offer } from './Offer';

function PhoneOffersBase({ defaultValue, onChange }, ref) {
  /**@type {State<PhoneOfferType[]>} */
  const [offers, setOffers] = useState(defaultValue ?? []);
  const offersRef = useRef([]);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const list = [];
      for (let item of offersRef.current) {
        list.push(await item.submit());
      }
      return list;
    },
  }));

  const renderOffers = useMemo(() => {
    return offers.map((item, index) => {
      return (
        <Offer
          ref={(el) => (offersRef.current[index] = el)}
          key={index}
          index={index}
          defaultValue={item}
          onChange={(e, i) => {
            updateOffers((prev) => {
              const newList = [...prev];
              newList[i] = e;
              return newList;
            });
          }}
        />
      );
    });
  }, [offers]);

  function addOffer() {
    updateOffers((prev) => [
      ...prev,
      {
        color: '#ffffff',
        count: 0,
        price: 0,
        storage: '',
      },
    ]);
  }

  /**@type {State<PhoneOfferType[]>['1']} */
  function updateOffers(o) {
    setOffers(o);
    onChange(o);
  }

  return (
    <div className="relative z-[2000]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Offers:</h2>
          <Button
            className="flex justify-center p-[10px_20px] gap-2"
            onClick={addOffer}
          >
            <BiPlus size="20px" />
            Thêm offers
          </Button>
        </div>
        <div className="mt-2">
          <div className="flex items-center offer__table-header">
            <div className="w-[10%] text-center">#</div>
            <div className="w-[22.5%] text-center">Giá</div>
            <div className="w-[22.5%] text-center">Số lượng</div>
            <div className="w-[22.5%] text-center">Màu sắc</div>
            <div className="w-[22.5%] text-center">Bộ nhớ</div>
          </div>
          {renderOffers}
        </div>
      </div>
    </div>
  );
}

const PhoneOffers = forwardRef(PhoneOffersBase);

export { PhoneOffers };
