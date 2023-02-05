import { Box, Input, Text, Button } from "@chakra-ui/react";

export default function Client(){
    return(
        <Box width={'90%'} height={'490px'} 
             position={'relative'} left={'5%'} top='20px'
        >
            <Text color={'brown'} fontSize='20px' fontWeight={'1000'}>Thông tin mua hàng </Text>
            <Box width={'70%'} height={'85%'} border='1px solid brown' borderRadius={'10px'}
             position={'relative'} left={'15%'} top='20px'>
               <Text color={'brown'} marginTop='10px' fontSize='20px' fontWeight={'1000'} textAlign='center'>Thông tin khách hàng</Text>
               <Input width={'70%'} height='40px' marginTop={'30px'} outline='none !important' placeholder="Email..." bg='aliceblue' borderRadius={'5px'} marginLeft='15%'></Input>
               <Input width={'70%'} height='40px' marginTop={'30px'} outline='none !important' placeholder="Số điện thoại..." bg='aliceblue' borderRadius={'5px'} marginLeft='15%'></Input>
               <Input width={'70%'} height='40px' marginTop={'30px'} outline='none !important' placeholder="Địa chỉ giao hàng..." bg='aliceblue' borderRadius={'5px'} marginLeft='15%'></Input>
               <Input width={'70%'} height='40px' marginTop={'30px'} outline='none !important' placeholder="Lưu Ý khi giao hàng..." bg='aliceblue' borderRadius={'5px'} marginLeft='15%'></Input>
               <a href="" ><Button color={'white'} fontWeight={'1000'} position={'relative'} left={'40%'} width={'20%'} height='50px' bg='rgb(219, 64, 53)' marginTop={'30px'}>Gửi</Button></a>
            </Box>
        </Box>
    )
}