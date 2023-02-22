import { Box, Text, Input, Button, Link, styled } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useStore } from '../lib/zustand';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = styled('form');

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const { user, setUser } = useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  function submitForm(e) {
    axios.post('/api/signin', e).then((res) => {
      const data = res.data;

      localStorage.setItem('token', data.token);
      setUser(data.data);
    });
  }

  return (
    <Box
      width={'70%'}
      height="360px"
      position={'relative'}
      left="15%"
      top={'20px'}
      // bg='blue'
    >
      <Text color={'brown'} marginTop="15px" fontSize="20px" fontWeight="1000">
        {props.name}
      </Text>
      <Form
        width={'400px'}
        height="290px"
        border={'1px solid gray'}
        borderRadius="10px"
        marginLeft="30%"
        position="relative"
        top={'20px'}
        onSubmit={handleSubmit(submitForm)}
      >
        <Text
          fontSize={'25px'}
          marginTop="15px"
          color="brown"
          fontWeight={'1000'}
          textAlign="center"
        >
          {props.name}
        </Text>
        <br />
        <Input
          marginLeft={'50px'}
          outline="none !important"
          width={'300px'}
          height="35px"
          borderRadius={'4px'}
          placeholder="Email hoặc số điện thoại"
          padding="10px 15px"
          bg={'aliceblue'}
          {...register('email')}
        ></Input>
        <Input
          marginLeft={'50px'}
          marginTop="15px"
          outline="none !important"
          width={'300px'}
          height="35px"
          borderRadius={'4px'}
          padding="10px 15px"
          placeholder="Mật khẩu"
          bg={'aliceblue'}
          {...register('password')}
        ></Input>
        <Button
          width={'300px'}
          height="50px"
          bg="rgb(219, 64, 53)"
          marginTop={'20px'}
          marginLeft="50px"
          color={'white'}
          type="submit"
        >
          Gửi
        </Button>
      </Form>
    </Box>
  );
}
