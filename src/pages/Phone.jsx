import { Box } from '@chakra-ui/react';
import End from '../components/end';
import Header1 from '../components/header1';
import { PhoneSite } from '../components/Phone/PhoneSite';

export default function PhonePage() {
  return (
    <Box height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <PhoneSite />
        <End></End>
      </Box>
    </Box>
  );
}
