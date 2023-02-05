import { Box, Text } from '@chakra-ui/react';
import { Table, Tr, Td } from '@chakra-ui/react';
export default function Information() {
  return (
    <Box
      width={'70%'}
      height="600px"
      position={'relative'}
      left="15%"
      // backgroundColor={'rgb(231, 228, 225)'}
    >
      <Box width={'100%'} height='40px' border={'1px solid brown'} textAlign='center'>
      <Text position={'relative'} top={'6px'} fontSize='25px' color={'brown'} fontWeight='1000' >Thông số kỹ thuật</Text>
      </Box>
      <Table
        border={'1px solid brown'}
        width="80%"
        height={'80%'}
        marginLeft="10%"
        marginTop={'15px'}
      >
        <Tr border={'1px solid brown'} >
          <Td width={'150px'} fontWeight='1000' position={'relative'} left={'10px'} border={'1px solid brown'}>Màn hình: </Td>
          <Td position={'relative'} left={'10px'}>
            IPS LCD, 90Hz, tỷ lệ 20:9 6.58 inches, Full HD+ (1080 x 2408 pixels)
          </Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Hệ điều hành:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'} >Android 11, MIUI 13</Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Camera sau:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>
            50 MP, f/1.8, (góc rộng), PDAF 2 MP, f/2.4, (đo chiều sâu) <br /> 
            Quay phim: 1080p@30fps
          </Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Camera trước:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>5 MP, f/2.0 Quay phim: 1080p@30fps</Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>CPU:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>
            MediaTek MT6833 Dimensity 700 5G (7 nm) 8 nhân (2x2.2 GHz & 6x2.0
            GHz)<br/> GPU: Mali-G57 MC2
          </Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>RAM:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>4GB</Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Bộ nhớ trong:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>64-128GB</Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Thẻ SIM:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>2 SIM, Nano SIM</Td>
        </Tr>
        <Tr border={'1px solid brown'}>
          <Td position={'relative'} fontWeight='1000' left={'10px'} border={'1px solid brown'}>Dung lượng pin:</Td>
          <Td position={'relative'} left={'10px'} border={'1px solid brown'}>Li-Po 5000 mAh Sạc nhanh 18W</Td>
        </Tr>
      </Table>
    </Box>
  );
}
