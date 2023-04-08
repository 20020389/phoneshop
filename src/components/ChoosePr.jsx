import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    src: '/trademark/iPhone-1.png',
    to: '/search?trademark=iphone',
  },
  {
    src: '/trademark/Appo.png',
    to: '/search?trademark=appo',
  },
  {
    src: '/trademark/Huawei-1.png',
    to: '/search?trademark=huawei',
  },
  {
    src: '/trademark/logo_realme.jpg',
    to: '/search?trademark=realme',
  },
  {
    src: '/trademark/oneplus.png',
    to: '/search?trademark=oneplus',
  },
  {
    src: '/trademark/Samsung-1.png',
    to: '/search?trademark=samsung',
  },
  {
    src: '/trademark/vivologo_akm4.jpg',
    to: '/search?trademark=vivo',
  },
  {
    src: '/trademark/xiaomi.png',
    to: '/search?trademark=xiaomi',
  },
];

function ChoosePr() {
  return (
    <Box width={'100%'}>
      <div className="w-full mt-8 mb-8 flex gap-5 overflow-hidden">
        {items.map((item, key) => (
          <Link to={item.to} key={key} className="contents">
            <div
              className="w-[calc(100%/8)] h-max flex items-center 
                            p-[10px_15px] justify-center border-[1px] border-[rgba(0,_0,_0,_0.1)]"
            >
              <img
                src={item.src}
                alt=""
                className="object-contain w-full h-auto"
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="ourPr mb-5">
        <h2>Các sản phẩm mới nhất</h2>
      </div>
    </Box>
  );
}

export default memo(ChoosePr);
