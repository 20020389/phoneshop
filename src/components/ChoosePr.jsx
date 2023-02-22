import { Box } from '@chakra-ui/react';
import But from './button';
export default function ChoosePr() {
  return (
    <Box width={'100%'} height="100px">
      <Box
        width="100%"
        height={'52px'}
        marginTop="20px"
        display="flex"
        justifyContent="space-between"
      >
        <But Name="Apple"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        {/* <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But>
        <But Name="Samsung"></But> */}
      </Box>
      <div className="ourPr">
        <h2>OUR PRODUCT</h2>
      </div>
    </Box>
  );
}
