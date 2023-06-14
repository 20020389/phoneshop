import {
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/header1.css';
import { useStore } from '../lib/zustand';
import Cart from './Cart';
import { SearchPhone } from './SearchPhone';

/**
 *
 * @param {{
 *  refetchCart?: () => void;
 * }} props
 * @returns
 */
function Header1({}) {
  const header = useRef(null);
  const user = useStore((store) => store.user);
  const navigate = useNavigate();

  const [headerOnTop, setHeaderOnTop] = useState(true);

  function handleResize() {
    if (header.current) {
      /**
       * @type {HTMLDivElement}
       */
      const navbar = header.current;

      if (headerOnTop && navbar.offsetTop > 0) {
        setHeaderOnTop(false);
      } else if (!headerOnTop && navbar.offsetTop == 0) {
        setHeaderOnTop(true);
      }
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  }, [headerOnTop]);

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div
      ref={header}
      className={`sticky z-10 top-0 w-full 
            ${headerOnTop ? '' : 'drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]'}`}
    >
      <div className="header2 flex justify-between items-center p-[0_30px]">
        <div
          id="logo"
          className="flex items-center"
          onClick={() => navigate('/')}
        >
          <div>
            <img
              src="/image/logo.jpg"
              className="object-contain min-w-[40px] h-[40px] rounded-[100%]"
              alt=""
            />
          </div>
          <div id="NameLogo" className="!h-min !m-0 font-['Bubblegum_Sans']">
            DragonSmartphone
          </div>
        </div>
        <div className="absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]">
          <SearchPhone />
        </div>

        {!user ? (
          <>
            <div className="flex items-center gap-5 text-[15px] font-[Quicksand]">
              <Link
                to="/register"
                className="text-[rgba(0,_0,_0,_0.6)] font-bold hover:underline"
              >
                Đăng kí
              </Link>
              <Link to="/login" className="hover:text-white">
                <div className="bg-[#5d83db] p-[5px_20px] rounded-[5px] text-[white]">
                  Đăng nhập
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="inline-flex gap-2 items-center h-full w-min capitalize">
            {user.role === 'DEFAULT' && <Cart />}
            <span className="font-[Quicksand] font-[700] whitespace-nowrap text-right min-w-[100px]">
              {user.name}
            </span>
            <Menu>
              <MenuButton className="hover:border-transparent focus:outline-none">
                <Avatar size="xs" name={user.name} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>
                  Trang cá nhân
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  className="rounded-none hover:border-transparent focus:outline-none"
                >
                  logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(Header1);
