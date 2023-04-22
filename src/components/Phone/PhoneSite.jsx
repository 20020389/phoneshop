import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePhone } from '../../hooks/usePhone';
import { formatPrice } from '../../lib/util';
import { TiShoppingCart } from 'react-icons/ti';

const convertToMillions = (amount) => {
  return Math.floor(amount / 1000000) + ' triệu';
};

export function PhoneSite() {
  const { id } = useParams();

  const { phoneData } = usePhone(id);

  console.log(phoneData);

  const renderRangePrice = useMemo(() => {
    if (!phoneData || !Array.isArray(phoneData?.phoneoffers)) {
      return <></>;
    }

    let min = phoneData.phoneoffers[0].price;

    return `(Giá ~ ${convertToMillions(min)})`;
  }, [phoneData?.phoneoffers]);

  const renderPrice = useMemo(() => {
    if (!phoneData || !Array.isArray(phoneData?.phoneoffers)) {
      return <></>;
    }

    return formatPrice(phoneData.phoneoffers[0].price);
  }, [phoneData?.phoneoffers]);

  const renderColors = useMemo(() => {
    if (!phoneData || !Array.isArray(phoneData?.phoneoffers)) {
      return <></>;
    }

    return phoneData.phoneoffers.map((offer) => (
      <div
        className={`w-[30px] h-[30px]`}
        style={{ backgroundColor: offer.color }}
      ></div>
    ));
  }, [phoneData]);

  const renderStorages = useMemo(() => {
    if (!phoneData || !Array.isArray(phoneData?.phoneoffers)) {
      return <></>;
    }

    return phoneData.phoneoffers.map((offer, index) => (
      <div
        key={index}
        className={`h-[30px] border-[1px] border-[rgba(0,_0,_0,_0.15)] pr-[20px] pl-[17px] flex items-center`}
      >
        {offer.storage}
      </div>
    ));
  }, [phoneData]);

  if (!phoneData) {
    return <></>;
  }

  return (
    <div className="min-h-[80vh] w-[1100px] mx-auto pt-10 flex-col flex">
      <div className="mb-4">
        <h2 className="text-[20px] font-bold">
          {phoneData.name} {renderRangePrice}
        </h2>
      </div>
      <div className="flex gap-4">
        <div className="flex w-[300px] flex-col">
          <div className="w-[250px] h-[250px]">
            <img className="object-contain" src={phoneData.images[0]} alt="" />
          </div>
        </div>
        <div className="flex grow-[1] flex-col gap-2">
          <div>
            <h2 className="text-[20px] font-bold text-[#ac0719]">
              {renderPrice}
            </h2>
            <p className="font-bold">
              Chọn phiên bản để xem giá và chi nhánh còn hàng:
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <div className="h-[30px] flex items-center font-[600]">
                Màu sắc
              </div>
              <div className="h-[30px] flex items-center font-[600]">
                Bộ nhớ
              </div>
              <div className="h-[30px] flex items-center font-[600]">
                Gói bảo hành
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <div className="flex">{renderColors}</div>
              </div>
              <div className="flex items-center">
                <div className="flex">{renderStorages}</div>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  <div
                    className={`h-[30px] border-[1px] border-[rgba(0,_0,_0,_0.15)] pr-[20px] pl-[17px] flex items-center`}
                  >
                    BHV 12 Tháng
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="mr-1 font-[600]">Thời gian bảo hành:</div>
            <div className="font-bold">BH Thường 12 Tháng</div>
            <div>
              (
              <Link to="#" className="text-[#747bff]">
                Xem chi tiết
              </Link>
              )
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="mr-1 font-[600]">
              Giao hàng tận nơi miễn phí trong 30 phút
            </div>
            <div>
              (
              <Link to="#" className="text-[#747bff]">
                Xem chi tiết
              </Link>
              )
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="mr-1 font-[600]">
              Hotline: 0969.120.120 (HN) | 0965.123.123 (HCM) | 096.123.9797
              (ĐN)
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="flex gap-2 w-[calc(50%_-_4px)] h-[50px] items-center justify-center text-[white] rounded-[10px] bg-[#5d83db]">
              <TiShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
            <button className="flex gap-2 w-[calc(50%_-_4px)] h-[50px] items-center justify-center text-[white] rounded-[10px] bg-[#fa9d4d]">
              Mua ngay
            </button>
          </div>
          <div>
            <button className="flex flex-col w-[100%] h-[50px] items-center justify-center text-[white] rounded-[10px] bg-[#5d83db]">
              MUA TRẢ GÓP 0%
              <span className="text-[0.8em]">
                (Duyệt HS 5 phút, Trả góp qua thẻ)
              </span>
            </button>
          </div>
        </div>
        <div className="flex grow-[1] flex-col"></div>
      </div>
    </div>
  );
}
