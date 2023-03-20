import { Button } from '@chakra-ui/react';
import lodash from 'lodash';
import {
  forwardRef,
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
        const data = { ...(await item.submit()) };
        delete data.key;
        list.push(data);
      }
      return list;
    },
  }));

  const renderOffers = useMemo(() => {
    return offers.map((item, index) => {
      return (
        <Offer
          ref={(el) => (offersRef.current[index] = el)}
          key={item.key}
          index={index}
          defaultValue={item}
          onChange={(e, i) => {
            updateOffers((prev) => {
              const newList = [...prev];
              newList[i] = e;
              return newList;
            });
          }}
          onCopy={() => {
            addOffer(index);
          }}
          onDelete={() => {
            updateOffers((prev) => {
              return prev.filter((_, i) => index !== i);
            });
          }}
        />
      );
    });
  }, [offers]);

  function addOffer(index) {
    if (index !== undefined && offers[index]) {
      updateOffers((prev) =>
        insert(prev, index, {
          key: lodash.random(1, 1000),
          color: offers[index].color,
          count: offers[index].count,
          price: offers[index].price,
          storage: offers[index].storage,
        })
      );
    } else {
      updateOffers((prev) => [
        ...prev,
        {
          key: lodash.random(1, 1000),
          color: '#ffffff',
          count: 0,
          price: 0,
          storage: '',
        },
      ]);
    }
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
            <div className="w-[5%] text-center">#</div>
            <div className="w-[22%] text-center">Giá</div>
            <div className="w-[22%] text-center">Số lượng</div>
            <div className="w-[22%] text-center">Màu sắc</div>
            <div className="w-[22%] text-center">Bộ nhớ</div>
            <div className="w-[7%] text-center"></div>
          </div>
          {renderOffers}
        </div>
      </div>
    </div>
  );
}

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),

  newItem,

  ...arr.slice(index),
];

const PhoneOffers = forwardRef(PhoneOffersBase);

export { PhoneOffers };
