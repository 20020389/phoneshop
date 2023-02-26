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
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/header1.css';
import { useStore } from '../lib/zustand';

function Header1() {
  const header = useRef(null);
  const { user, loading, setUser, setLoading } = useStore();
  const navigate = useNavigate();

  const [headerOnTop, setHeaderOnTop] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [logouting, setLogouting] = useState(false);

  useEffect(() => {
    function handle() {
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

    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, [headerOnTop]);

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
          onclick="window.location.href='/'"
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
          <InputGroup>
            <Input
              background="white"
              placeholder="Tìm kiếm..."
              borderWidth="2px"
              _hover={{ borderColor: '#CBD5E0' }}
              _focus={{ boxShadow: 'none', borderColor: '#80befc' }}
              className="!w-[300px] !h-[43px]"
            />
            <InputRightElement className="!h-full">
              <button
                className="w-full h-full flex items-center justify-center 
                    cursor-pointer hover:border-transparent focus:outline-none"
                onClick={() => navigate('/search/content')}
              >
                <svg
                  viewBox="-1 -1 26 26"
                  focusable="false"
                  stroke="#9299a6"
                  className="w-5 h-5"
                >
                  <path
                    fill="#9299a6"
                    d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                  ></path>
                </svg>
              </button>
            </InputRightElement>
          </InputGroup>
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
            <Menu
              isOpen={menuOpen}
              onOpen={() => setMenuOpen(true)}
              onCLose={() => setMenuOpen(false)}
              // closeOnSelect={false}
            >
              <MenuButton className="hover:border-transparent focus:outline-none">
                <Avatar size="xs" name={user.name} />
              </MenuButton>
              <MenuList>
                <MenuItem className="rounded-none hover:border-transparent focus:outline-none">
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
export default Header1;
