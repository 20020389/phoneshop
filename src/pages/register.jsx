import { Box } from '@chakra-ui/react';
import { Auth } from '../components/auth/Auth';
import End from '../components/end';
import Header1 from '../components/header1';
import Registerr from '../components/Registerr';
export default function Register() {
  return (
    <Box height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <Auth type="signup" />
        <End></End>
      </Box>
    </Box>
  );
}
