import { Box } from '@chakra-ui/react';
import Header1 from '../components/header1';
import Information from '../components/Information';
import ViewPr from '../components/ViewPr';
import End from '../components/end';
export default function Product() {
  return (
    <Box width="100vw" height="100vh">
      <Box width={'100%'} height="100%" position={'relative'}>
        <Header1></Header1>
        <ViewPr></ViewPr>
        <Information></Information>
        <End></End>
      </Box>
    </Box>
  );
}
