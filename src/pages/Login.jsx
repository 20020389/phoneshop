import { Box } from '@chakra-ui/react';
import End from '../components/end';
import Header1 from '../components/header1';
import Login from '../components/Login';
import { Auth } from '../components/auth/Auth';

export default function LoginPage() {
  return (
    <Box height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <Auth type="signin" />
        <End></End>
      </Box>
    </Box>
  );
}
