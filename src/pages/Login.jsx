import { Box } from '@chakra-ui/react';
import End from '../components/end';
import Header1 from '../components/header1';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <Box width="100vw" height="100vh">
      <Box width={'95%'} height="100%" position={'relative'} left={'2.5%'}>
        <Header1></Header1>
        <Login name="Đăng nhập"></Login>
        <End></End>
      </Box>
    </Box>
  );
}
