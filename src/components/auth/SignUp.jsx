import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';
import { BiLockAlt } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { RiFolderUserLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export function SignUp() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState({});
  const toast = useToast();

  function submit(e) {
    console.log(e);
    if (e.password !== e.password_cf || e.password_cf == '') {
      updateError('password_cf', 'Mật khẩu xác nhận không chính xác');
      return;
    }

    axios
      .post('/api/signup', e)
      .then((res) => {
        toast({
          description: 'Đăng ký thành công',
          position: 'bottom-left',
          status: 'success',
        });
        localStorage.setItem('token', res.data.token);
        location.replace('/');
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          /**
           * @type {string}
           */
          let message = e.response.data?.message ?? '';
          message = message.toLocaleLowerCase();
          console.log(message);
          if (message.includes('email')) {
            if (message.includes('duplicate')) {
              updateError('email', 'Email đã được đăng ký');
            } else {
              updateError('email', 'Email không hợp lệ');
            }
          }

          if (message.toLowerCase().includes('password')) {
            updateError(
              'password',
              'Mật khẩu phải có tối thiểu 6 ký tự và ít nhất 1 số'
            );
          }

          if (message.toLowerCase().includes('role')) {
            updateError('role', 'Vui lòng chọn kiểu người dùng');
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
          readOnly
          {...register('email')}
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
          readOnly
          type="password"
          {...register('password')}
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          onChange={(e) => {
            register('password').onChange(e);
            updateError('password', '');
          }}
          placeholder="Mật khẩu"
          className={`!h-[55px] w-full !pl-[50px] !outline-none
          ${
            error.password
              ? '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset]'
              : '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset]'
          } 
          !border-none !rounded-none`}
        />
      </InputGroup>
      {error.password && error.password !== '' && (
        <div className="text-[red]">{error.password}</div>
      )}
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <BiLockAlt size="25px" />
        </InputLeftElement>
        <input
          readOnly
          type="password"
          {...register('password_cf')}
          onFocus={(e) => {
            e.target.removeAttribute('readonly');
          }}
          onChange={(e) => {
            register('password_cf').onChange(e);
            updateError('password_cf', '');
          }}
          placeholder="Xác nhận mật khẩu"
          className={`!h-[55px] w-full !pl-[50px] !outline-none
          ${
            error.password_cf
              ? '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset]'
              : '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset]'
          } 
          !border-none !rounded-none`}
        />
      </InputGroup>
      {error.password_cf && error.password_cf !== '' && (
        <div className="text-[red]">{error.password_cf}</div>
      )}
      <InputGroup>
        <InputLeftElement className="!h-full !w-[50px]">
          <RiFolderUserLine size="25px" />
        </InputLeftElement>
        <select
          {...register('role')}
          defaultValue=""
          onChange={(e) => {
            register('role').onChange(e);
            updateError('role', '');
          }}
          className={`!h-[55px] w-full !pl-[50px] !outline-none
          ${
            error.role
              ? '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#ff3a3a_inset]'
              : '!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset] focus:!shadow-[0px_0px_5px_rgba(0,_0,_0,_0.2)_inset,_0px_-2px_0_#f1c489_inset]'
          } 
          !border-none !rounded-none`}
        >
          <option disabled value="" className="text-gray-600">
            Kiểu người dùng
          </option>
          <option value="DEFAULT">Người mua hàng</option>
          <option value="STORE">Người bán hàng</option>
        </select>
      </InputGroup>
      {error.role && error.role !== '' && (
        <div className="text-[red]">{error.role}</div>
      )}
      {/* <div className="">
        <Checkbox colorScheme="orange">Đồng ý với các điều khoản</Checkbox>
      </div> */}
      <div className="flex justify-end">
        <button className="h-55px bg-[#e9a920] p-[15px_20px] shadow-[0px_0px_15px] shadow-[#f3af5589] rounded-[3px] text-white">
          Đăng Ký
        </button>
      </div>
    </form>
  );
}
