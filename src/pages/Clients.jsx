import { Box } from '@chakra-ui/react';
import Header1 from '../components/header1';
import Client from '../components/Client';
import End from '../components/end';
export default function Clients() {
  return (
    <Box height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <Client></Client>
        <End></End>
      </Box>
    </Box>
  );
}
