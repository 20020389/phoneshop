import { Avatar } from '@chakra-ui/react';
import React from 'react';
import '../CSS/header1.css';
import { useStore } from '../lib/zustand';

function Header1() {
  const { user, loading, setUser, setLoading } = useStore();

  return (
    <div className="sticky z-10 top-0 w-full">
      {/* <div className="header1 flex justify-between p-[0_20px]">
        <div id="sdt">
          <span>
            Hotline:<span id="so"> 0865.564.002</span>
          </span>
        </div>
        <div id="address">
          <span>
            Địa chỉ: <span id="DChi">234 Hoàng Quốc Việt-Bắc Từ Liêm-HN</span>
          </span>
        </div>
      </div> */}
      <div className="header2 flex justify-between items-center p-[0_30px]">
        <div
          id="logo"
          className="flex items-center"
          onclick="window.location.href='/'"
        >
          <div>
            <img
              src="/image/logo.jpg"
              className="object-contain min-w-[40px] h-[40px] rounded-[100%]"
              alt=""
            />
          </div>
          <div id="NameLogo" className="!h-min !m-0">
            DragonSmartphone
          </div>
        </div>
        <div
          id="search"
          className="flex items-center p-[7px_15px] !h-min !m-0 bg-white rounded-[5px]"
        >
          <input
            placeholder="Search..."
            className="bg-transparent !m-0 grow"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {!user ? (
          <>
            <div className="flex gap-2 text-[18px]">
              <div>
                <a href="http://localhost:3000/register">Đăng kí</a>
              </div>
              |
              <div>
                <a href="http://localhost:3000/login">Đăng nhập</a>
              </div>
            </div>
          </>
        ) : (
          <div className="inline-flex gap-2 items-center h-full w-min">
            {user.name}
            <Avatar size="xs" name={user.name} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Header1;
