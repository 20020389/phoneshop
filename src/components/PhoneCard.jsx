import PropType from 'prop-types';

export const PhoneCard = (props) => {
  return (
    <div className="w-[300px]  p-2 flex flex-col justify-between border-[1px] border-gray-400">
      <img
        className="w-full p-[10px_30px]"
        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2022/10/w300/xiaomi-redmi-note-12-xanh.png.webp"
        alt=""
      />
      <h2 className="text-[18px] font-bold mb-2">
        Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)
      </h2>
      <p className="mb-1">4.150.000 ₫</p>
      <button className="h-[30px] p-0 bg-yellow-500 text-white">mua</button>
    </div>
  );
};

PhoneCard.propTypes = {
  name: PropType.string,
};
