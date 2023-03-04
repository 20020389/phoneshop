import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { AiFillPhone } from 'react-icons/ai';
import { FaUserTag } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { IoIosShareAlt } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { EditProfile } from './EditProfile';

/**
 *
 * @param {{ user: User }} props
 */
export function StoreProfile({ user }) {
  const [isOpenEditModel, setOpenEditModel] = useState(false);

  return (
    <div className="relative bg-[#f8fafb]">
      <div className="p-[20px]">
        <div className="flex gap-7 flex-col">
          <div className="shadow-[0px_5px_5px_rgba(0,_0,_0,_0.1)] bg-[white] flex-grow rounded-[10px] overflow-hidden">
            <div className="min-h-[400px] pb-2">
              <div className="h-[200px] bg-gradient-to-r from-[#f9e3aa] to-[#f5cfcc]"></div>
              <div className="flex flex-col p-[0_30px] relative">
                <div className="h-[75px] translate-y-[-100%]">
                  <div className="w-[150px] h-[150px] text-[27px] !bg-white p-[5px] rounded-full relative overflow-hidden">
                    <Avatar
                      className="avt z-20"
                      name={user.name}
                      src={user.image}
                      size="full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 ml-5">
                  <h2 className="text-[22px] ml-[-1rem] font-[700] font-[Quicksand] capitalize">
                    {user.name ?? user.email}
                  </h2>
                  <div className="mt-4">
                    <span className="text-gray-500 flex items-center gap-2 font-[600] font-[Quicksand]">
                      <FaUserTag /> Quản lý của hàng
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="text-gray-500 flex items-center gap-2 font-[600] font-[Quicksand]">
                        <MdAlternateEmail /> {user.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 flex items-center gap-2 font-[600] font-[Quicksand]">
                        &#8226;
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 flex items-center gap-2 font-[600] font-[Quicksand]">
                        <AiFillPhone />{' '}
                        {user.phoneNumber ?? 'Chưa có thông tin'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-[20px_0] flex gap-4 ml-1">
                  <Button className="" variant="outline">
                    Liên hệ
                  </Button>
                  <Button className="!bg-[#5d83db] !text-white !gap-2 hover:!bg-[#799df1] active:!bg-[#3c6ee2]">
                    <IoIosShareAlt />
                    Chia sẻ
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Menu>
                    <MenuButton
                      as="button"
                      className="bg-transparent w-[30px] h-[30px] rounded-full hover:bg-[rgba(0,_0,_0,_0.05)]"
                    >
                      <span className="text-gray-500 text-[20px] flex items-center justify-center">
                        <BsThreeDotsVertical />
                      </span>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setOpenEditModel(true)}>
                        Chỉnh sửa thông tin
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="shadow-[0px_5px_5px_rgba(0,_0,_0,_0.1)] min-w-[400px] bg-[white] rounded-[10px] overflow-hidden">
            <div className="min-h-[400px] pb-2"></div>
          </div> */}
        </div>
      </div>
      <EditProfile
        user={user}
        isOpen={isOpenEditModel}
        onOpenChange={setOpenEditModel}
      />
    </div>
  );
}
