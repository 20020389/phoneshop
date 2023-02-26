import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BiLockAlt } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';

export function SignIn() {
  return (
    <form className="p-5 flex flex-col gap-3">
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <FiUser size="25px" />
        </InputLeftElement>
        <input
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          placeholder="Email"
          className="!h-[55px] w-full !shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] !pl-[50px] !outline-none
                focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset] !border-none !rounded-none"
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <BiLockAlt size="25px" />
        </InputLeftElement>
        <input
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          placeholder="Mật khẩu"
          type="password"
          className="!h-[55px] w-full !shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] !pl-[50px] !outline-none
                  focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset] !border-none !rounded-none"
        />
      </InputGroup>
      <div className="mt-[15px]">
        <Checkbox colorScheme="orange">Nhớ tài khoản</Checkbox>
      </div>
      <div className="flex justify-end ">
        <button className="h-55px bg-[#e9a920] p-[15px_20px] shadow-[0px_0px_15px] shadow-[#f3af5589] rounded-[3px] text-white">
          Đăng Nhập
        </button>
      </div>
    </form>
  );
}
