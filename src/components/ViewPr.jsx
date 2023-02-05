import { Box, Button, Text } from "@chakra-ui/react";


export default function ViewPr(){
    return(
        <Box
         width={'70%'}
         height='100%'
         position={'relative'}
         left='15%'
         //  bg='yellow'
         >
            <Box 
            width='100%'
            height='35px'
            // bg='blue'
            >
                <Text marginTop={'10px'} fontSize='20px' fontWeight='1000' color={'brown'}>Điện thoại Iphone14 ProMax</Text>
            </Box>
           <Box
             float={'left'}
             width='40%'
             height={'550px'}
            //  bg='gray'
           >
                <img src="/image/ip14PR.jpg" width={'100%'}   alt="" />
                <b >Danh sách cửa hàng</b>
                <ul>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                    <li>120 Thái Hà, Q. Đống Đa</li>
                </ul> 
           </Box>
            <Box
           float={'left'}
            width={'55%'}
            height='700px'
            marginLeft={'3%'}
            // bg='aliceblue'
           >
              <b >Giá:  </b><br />
              <Text color='red' fontSize='25px'marginTop={'10px'} fontWeight={'1000px'}>40.000.000đ</Text><br />
              <Text marginTop={'-15px'} fontWeight={'1000'} >Chọn phiên bản và màu sắc</Text>
              <p>Màu sắc: </p> 
              <Button height={'25px'}  outline= '0 !important' bg='purple' marginLeft={'70px'} float={'left'}></Button>
              <Button height={'25px'} bg='blue' outline= '0 !important' marginLeft={'20px'} float={'left'}></Button>
              <Button height={'25px'} bg='pink' outline= '0 !important'  marginLeft={'20px'}></Button><br />
              <Text marginTop={'10px'} float='left' outline= '0 !important'>Bộ nhớ</Text>
              <Button width={'80px'} height='30px' outline= '0 !important' backgroundColor={'aliceblue'} border='0.01px solid gray' margin='8px 0 0 20px'>4-256</Button>
              <Button width={'80px'} height='30px' outline= '0 !important' backgroundColor={'aliceblue'} border='0.01px solid gray' margin='8px 0 0 20px'>4-256</Button><br />
              <Text marginTop={'10px'} float='left'>Gói bảo hành</Text>
              <Button width={'120px'} height='30px' outline= '0 !important' backgroundColor={'aliceblue'} border='0.01px solid gray' margin='8px 0 0 20px'>BHV 12 tháng</Button><br />
              {/* <Text marginTop={'10px'} float='left'>Thời gian bảo hành<Text marginTop={'10px'} float='left' fontWeight={'1000'}>BH thường 12 tháng</Text></Text> */}
              <Text marginTop={'10px'} float='left'>Thời gian bảo hành: </Text>
              <Button width={'150px'} height='30px' outline= '0 !important' backgroundColor={'aliceblue'} border='0.01px solid gray' margin='8px 0 0 20px' fontWeight={'1000'}>BH thường 12 tháng</Button><br />
              <Text marginTop={'10px'} >Giao hàng tận nơi miễn phí trong 30 phút</Text><br />
              <Text marginTop={'-10px'} color='brown' fontWeight={'1000'}>Khuyến mãi</Text>
              <Box width={'90%'} borderRadius='10px' height='200px' border={'0.1px solid brown'}>
              <Text marginTop={'10px'}  marginLeft='20px'>Giao hàng tận nơi miễn phí trong 30 phút</Text>
              <Text marginLeft='20px'>Giảm đến 30% khi mua phụ kiện.</Text>
              <Text marginLeft='20px'>Giảm đến 200K (Cho BHV)</Text>
              <Text marginLeft='20px'>- Chat online: <a href="https://www.facebook.com/profile.php?id=100036524874220">Chat Facebook</a></Text>
              <Text marginLeft='20px'>- Hà Nội: 097.120.6688</Text>
              <Text marginLeft='20px'>- Tp.HCM: 0965.123.123</Text>
              <Text marginLeft='20px'>- Tp.HCM: 0965.123.123</Text><br />
              <Button position={'relative'} left={'25px'} float={'left'} fontSize='20px' width={'200px'} height='60px' outline= '0 !important' bg={'rgb(54, 99, 400)'} border='0.01px solid gray' margin='8px 0 0 20px' fontWeight={'1000'} color='white'>Thêm vào giỏ hàng </Button>
              <a  href="/clients"><Button position={'relative'} left={'25px'}  fontSize='20px' width={'200px'} height='60px' outline= '0 !important' bg={'rgb(235, 157, 100)'} border='0.01px solid gray' margin='8px 0 0 20px' fontWeight={'1000'} color='white'>Mua</Button></a><br />
              <Button position={'relative'} left={'36px'}  fontSize='20px' width={'400px'} height='60px' outline= '0 !important' bg={'rgb(54, 99, 400)'} border='0.01px solid gray' margin='8px 0 0 20px' fontWeight={'1000'} color='white'>Mua trả góp 0%</Button><br />

              </Box>
           </Box>
           
        </Box>
    )
}