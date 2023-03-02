import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLockAlt } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export function SignIn() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState({});
  const [showPass, setShowPass] = useState(false);

  function submit(e) {
    if (!e.email || e.email === '') {
      updateError('email', 'Email không hợp lệ');
      return;
    }

    if (!e.password || e.password == '') {
      updateError('password', 'Mật khẩu không hợp lệ');
      return;
    }

    axios
      .post('/api/signin', e)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        location.replace('/');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          let message = err.response.data?.message ?? '';
          message = message.toLocaleLowerCase();
          console.log(message);

          if (message.includes('no elements')) {
            updateError('email', 'Tài khoản không tồn tại');
          }

          if (message.includes('email')) {
            updateError('email', 'Email không hợp lệ');
          }

          if (message.toLowerCase().includes('wrong password')) {
            updateError('password', 'Mật khẩu không chính xác');
          } else if (message.toLowerCase().includes('password')) {
            updateError(
              'password',
              'Mật khẩu phải có tối thiểu 6 ký tự và ít nhất 1 số'
            );
          }
        }
      });
  }

  function updateError(field, value) {
    setError({ ...error, [field]: value });
  }

  return (
    <form className="p-5 flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <FiUser size="25px" />
        </InputLeftElement>
        <input
          {...register('email')}
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          onChange={(e) => {
            register('email').onChange(e);
            updateError('email', '');
          }}
          placeholder="Email"
          className={`!h-[55px] w-full !pl-[50px] !outline-none
          ${
            error.email
              ? '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset]'
              : '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset]'
          } 
          !border-none !rounded-none`}
        />
      </InputGroup>
      {error.email && error.email !== '' && (
        <div className="text-[red]">{error.email}</div>
      )}
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <BiLockAlt size="25px" />
        </InputLeftElement>
        <input
          {...register('password')}
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          onChange={(e) => {
            register('password').onChange(e);
            updateError('password', '');
          }}
          type={showPass ? 'text' : 'password'}
          placeholder="Mật khẩu"
          className={`!h-[55px] w-full !pl-[50px] !outline-none
          ${
            error.password
              ? '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset]'
              : '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset]'
          } 
          !border-none !rounded-none`}
        />
        <InputRightElement className="!h-full">
          <button
            type="button"
            className="h-full text-gray-600"
            onClick={() => setShowPass((prev) => !prev)}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </InputRightElement>
      </InputGroup>
      {error.password && error.password !== '' && (
        <div className="text-[red]">{error.password}</div>
      )}
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
