import lodash, { isArray, isNull, isUndefined } from 'lodash';
import { useMemo } from 'react';
import ImageLoader from '../ImageLoader';
import { Rating } from 'react-simple-star-rating';
import { Tooltip } from '@chakra-ui/react';
import { util } from '../../lib/util';
import { BsThreeDotsVertical } from 'react-icons/bs';

/**
 *
 * @param {{
 *    data: Phone | undefined
 * }} props
 */
export function Phone({ data }) {
  const image = useMemo(() => {
    if (isArray(data.images)) {
      return data.images[0];
    }

    return data.images;
  }, [data.images]);

  const offer = useMemo(() => {
    if (data.phoneoffers && Array.isArray(data.phoneoffers)) {
      return {
        price:
          util.formatPrice(
            lodash.min(data.phoneoffers.map((item) => item.price)).toString(),
            '.'
          ) + 'VNĐ',
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
              <button className="p-[2px] duration-300">
                <BsThreeDotsVertical />
              </button>
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
    </div>
  );
}
