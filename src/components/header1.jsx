import { Avatar } from '@chakra-ui/react';
import React from 'react';
import '../CSS/header1.css';
import { useStore } from '../lib/zustand';

function Header1() {
  const { user, loading, setUser, setLoading } = useStore();

  return (
    <div className="header">
      <div className="header1 flex justify-between p-[0_20px]">
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
        {!user ? (
          <>
            <div id="sign1">
              <a href="http://localhost:3000/register">Đăng kí |</a>
            </div>
            <div id="sign2">
              <a href="http://localhost:3000/login">Đăng nhập</a>
            </div>
          </>
        ) : (
          <div className="inline-flex gap-2 items-center h-full w-min">
            {user.name}
            <Avatar size="xs" name={user.name} />
          </div>
        )}
      </div>
      <div className="header2">
        <div id="logo" onclick="window.location.href='/'">
          <div id="imgLogo">
            <img src="/image/logo.jpg" alt="" />
          </div>
          <div id="NameLogo">DragonSmartphone</div>
        </div>
        <div id="search">
          <input placeholder="Search..."></input>
        </div>
      </div>
    </div>
  );
}
export default Header1;
