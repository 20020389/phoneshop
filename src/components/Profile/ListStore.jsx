import { Input, InputGroup, InputLeftElement, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useListStore } from '../../hooks/useListStore';
import { MyButton } from '../button';
import { StoreHandle } from './StoreHanle';

/**
 * @param {{ user: User }} props
 */
export function ListStore({ user }) {
  const { stores, isLoading, mutate } = useListStore();
  const [isOpenAddStore, setIsOpenAddStore] = useState(false);

  return (
    <>
      <div className="shadow-[0px_5px_5px_rgba(0,_0,_0,_0.1)] bg-[white] flex-grow rounded-[10px] overflow-hidden">
        <div className="min-h-[400px]">
          <div className="w-full  p-[15px_20px_10px_20px] flex items-center justify-end gap-4">
            <InputGroup className="!w-min">
              <InputLeftElement className="!h-[35px]">
                <svg
                  viewBox="-1 -1 26 26"
                  focusable="false"
                  stroke="#9299a6"
                  className="w-4 h-4"
                >
                  <path
                    fill="#9299a6"
                    d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                  ></path>
                </svg>
              </InputLeftElement>
              <Input
                className="!w-[250px] !h-[35px] !bg-[white] !text-[0.9em]"
                placeholder="Tên cửa hàng"
              />
            </InputGroup>
            <MyButton
              onClick={() => setIsOpenAddStore(true)}
              className="!h-[35px]"
            >
              <span className="text-[0.9em]">Add Store</span>
            </MyButton>
            <button className="w-[30px] h-[30px] flex items-center justify-center">
              <MdRefresh size="25px" fill="#9299a6" />
            </button>
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr className="h-[50px] bg-[#f9e3aa]">
                  <th className="w-[80px]">#</th>
                  <th>Tên cửa hàng</th>
                  <th>Địa chỉ</th>
                  <th>Khu vực</th>
                  <th className="w-[120px]">Sản phẩm</th>
                  <th>Update At</th>
                  <th>Create At</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((item, index) => (
                  <tr key={item.id} className="h-[50px] border-t-[1px]">
                    <th className="font-[500]">{index + 1}</th>
                    <th className="font-[500]">{item.name}</th>
                    <th className="font-[500]">{item.location}</th>
                    <th className="font-[500]">{item.group}</th>
                    <th className="font-[500]">{item.productCount}</th>
                    <th className="font-[500]">
                      <Tooltip
                        placement="top"
                        maxW={150}
                        label={new Date(item.updateAt).toUTCString()}
                      >
                        {new Date(item.updateAt).toLocaleDateString()}
                      </Tooltip>
                    </th>
                    <th className="font-[500]">
                      <Tooltip
                        placement="top"
                        maxW={150}
                        label={new Date(item.createAt).toUTCString()}
                      >
                        {new Date(item.createAt).toLocaleDateString()}
                      </Tooltip>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <StoreHandle
        isOpen={isOpenAddStore}
        onClose={() => {
          setIsOpenAddStore(false);
          mutate();
        }}
      />
    </>
  );
}
