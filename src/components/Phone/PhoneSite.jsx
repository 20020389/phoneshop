import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePhone } from '../../hooks/usePhone';
import { formatPrice } from '../../lib/util';
import { TiShoppingCart } from 'react-icons/ti';
import { Divider } from '@chakra-ui/react';
import { useNewestPhone } from '../../hooks/useNewestPhone';
import { PhoneProduct } from '../store/Phone';

const convertToMillions = (amount) => {
  return Math.floor(amount / 1000000) + ' triệu';
};

/**@type {PhoneProfile[]} */
const phoneProfile = [
  {
    title: 'Màn hình',
    content:
      'Samsung GOLED độ nét cao, 120Hz, 1200 nits (tối đa) 6.67 inches, Full HD+ (1080 x 2400 pixels), tỷ lệ 20:9',
  },
  {
    title: 'Hệ điều hành',
    content: 'Android 12, MIUI 13',
  },
  {
    title: 'Camera sau',
    content: `48 MP, (góc rộng), 0.8µm, PDAF \n2 MP, f/2.4, (độ sâu) \nQuay phim: 1080p@30/60fps`,
  },
  {
    title: 'Camera trước',
    content: '8 MP, f/2.0, (góc rộng), 1/4", 1.12µm \nQuay phim: 1080p@30fps',
  },
  {
    title: 'CPU',
    content:
      'Qualcomm SM4375 Snapdragon 4 Gen 1 (6 nm) \n 8 nhân (2x2.0 GHz & 6x1.8 GHz) \n GPU: Adreno 619',
  },
  {
    title: 'RAM',
    content: '4-8GB',
  },
  {
    title: 'Bộ nhớ trong',
    content: '128-256GB \nUFS 2.2',
  },
  {
    title: 'Thẻ SIM',
    content: '2 SIM, NanoSIM',
  },
  {
    title: 'Dung lượng pin',
    content: 'Li-Po 5000 mAh \nSạc nhanh 33W',
  },
  {
    title: 'Thiết kế',
    content: 'Thanh + Cảm ứng',
  },
];

/**@type {Array<PhoneDescription>} */
const phoneDescription = [
  {
    title: '',
    content: `Là mẫu điện thoại được trình làng vào ngày 27/10/2022. Ngoài sở hữu thiết kế đẹp mắt, máy còn có thông số kỹ thuật ấn tượng: Chip mạnh hỗ trợ 5G, màn hình siêu đẹp, pin trâu camera chất lượng. Trong các mẫu điện thoại Note 12 Series, Redmi Note 12 là sản phẩm chủ đạo kỳ vọng mang lại doanh thu cực đỉnh cho hãng.
  Trong sự kiện ra mắt, gã khổng lồ công nghệ Trung Quốc cũng trình làng mẫu Redmi Note 12 Pro với chip Dimensity 1080 mạnh mẽ, camera 50MP OIS, màn hình OLED 1 tỷ màu và mức giá vô cùng rẻ.
  Chúng ta nhận thấy rằng, Xiaomi Note 12 được trang bị chip Snapdragon 4 Gen 1 hoàn toàn mới hỗ trợ 5G, cùng pin 5000mAh kèm sạc nhanh 33W. Sau đây là phần so sánh của Note 12 với người tiền nhiệm của nó.`,
  },
  {
    title: 'Đánh giá',
    content:
      'Sau đây là bài đánh giá chi tiết về điện thoại Xiaomi thuộc dòng Note 12 để Quý khách có quyết định nâng cấp lên phiên bản mới này hay không?',
  },
  {
    title: 'Màn hình siêu đẹp',
    content:
      'Siêu phâm giá rẻ Note 12 sử dụng tấm nền Samsung GOLED độ nét cao, thực chất đây là tấm nền AMOLED do Samsung cung cấp, có độ tương phản rất tốt với 4500000:1 cho phép tái tạo hình ảnh chất lượng siêu cao.',
  },
  {
    title: 'Chip và GPU mạnh mẽ',
    content:
      'Xiaomi Note 12 trang bị bên trong bộ xử lý Snapdragon 4 Gen 1 chip đầu 4 mới nhất. Đây là con chip được sản xuất trên tiến trình 6nm của TSMC. Bộ xử lý này hỗ trợ 8 nhân CPU xung chip lên tới 2.0GHz và GPU Adreno 619. với cấu trúc như vậy, máy có thể xử lý mọi tác vụ cơ bản và chơi game nhẹ, trung bình hoàn toàn mượt mà. Thiết bị cũng được hỗ trợ kết nối 5G siêu tốc.',
  },
];

/**
 *
 * @param {{
 *  user?: User
 * }} param0
 * @returns
 */
export function PhoneSite({ user }) {
  const { id } = useParams();

  const { phoneData } = usePhone(id);

  const { phones } = useNewestPhone({ max: 2 });

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

    return phoneData.phoneoffers.map((offer, index) => (
      <div
        key={index}
        className={`w-[30px] h-[30px] border-[1px] border-[rgba(0,_0,_0,_0.15)]`}
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

  const renderProfile = useMemo(() => {
    if (!phoneProfile) {
      return <></>;
    }

    return phoneProfile.map((profile, index) => (
      <tr key={index}>
        <td
          className="p-[8px_5px] whitespace-nowrap text-[14px] font-bold border-[2px] border-[rgba(0,_0,_0,_0.07)]"
          dangerouslySetInnerHTML={{
            __html: profile.title?.replace('\n', '<br />'),
          }}
        />
        <td
          className="p-[8px_5px] text-[14px] border-[2px] border-[rgba(0,_0,_0,_0.07)]"
          dangerouslySetInnerHTML={{
            __html: profile.content?.replaceAll('\n', '<br />'),
          }}
        />
      </tr>
    ));
  }, [phoneProfile]);

  const renderDescription = useMemo(() => {
    if (!phoneDescription) {
      return <></>;
    }

    return phoneDescription.map((description, index) => {
      return (
        <div key={index}>
          {description.title !== '' && (
            <div className="font-bold text-[#c69a39] my-4">
              {description.title}
            </div>
          )}
          <div
            className="leading-7"
            dangerouslySetInnerHTML={{
              __html: description.content?.replaceAll(
                '\n',
                '<div style="height:15px;" ></div>'
              ),
            }}
          ></div>
        </div>
      );
    });
  }, [phoneDescription]);

  if (!phoneData) {
    return <></>;
  }

  return (
    <div className="min-h-[80vh] w-[1200px] mx-auto pt-10 flex-col flex">
      <div className="mb-4">
        <h2 className="text-[20px] font-bold">
          {phoneData.name} {renderRangePrice}
        </h2>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="flex w-[300px] flex-col">
          <div className="w-[250px] h-[250px]">
            <img className="object-contain" src={phoneData.images[0]} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[500px]">
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
              <div className="flex items-center gap-2">
                <div className="flex gap-2">{renderColors}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">{renderStorages}</div>
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
        {/* <div className="flex w-[400px] flex-col pl-5">
          <div className="p-[10px_5px] text-center font-bold border-[2px] border-b-[0] border-[rgba(0,_0,_0,_0.07)]">
            Thông số kỹ thuật
          </div>
          <table className="border-collapse">{renderProfile}</table>
        </div> */}
        <div className="flex w-[300px] items-end  flex-col pl-5">
          <div>
            <h2 className="font-bold p-[10px_10px] text-[17px]">
              Các sản phẩm mới nhất
            </h2>
          </div>
          <div className="flex flex-col gap-1 w-[200px] overflow-y-auto scrollbar max-h-[400px]">
            {phones &&
              phones.map((phone) => (
                <PhoneProduct key={phone.uid} data={phone} size="sm" />
              ))}
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-10 mb-10">
        <div className="">
          <div>
            <Divider />
            <h2 className="font-bold p-[10px_10px] text-[17px]">
              Thông tin chi tiết {phoneData.name} {renderRangePrice}
            </h2>
            <Divider />
          </div>
          <div className="flex flex-col gap-2 mt-4">{renderDescription}</div>
        </div>
        <div className="flex min-w-[400px] w-[400px] flex-col pl-5">
          <div className="p-[10px_5px] text-center font-bold border-[2px] border-b-[0] border-[rgba(0,_0,_0,_0.07)]">
            Thông số kỹ thuật
          </div>
          <table className="border-collapse">{renderProfile}</table>
        </div>
      </div>
    </div>
  );
}
