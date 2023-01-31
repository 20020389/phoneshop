import { Box } from '@chakra-ui/react';

function End() {
  return (
    <Box
      marginTop="20px"
      width="100%"
      height="400px"
      backgroundColor="rgb(250,250,250)"
    >
      <Box
        float="left"
        width="25%"
        height="100%"
        //    backgroundColor='yellow'
      >
        <Box
          marginTop="10px"
          width="100%"
          height="50px"
          // backgroundColor='white'
        >
          <Box
            float="left"
            position="relative"
            top="10px"
            left="16%"
            width="30px"
            height="30px"
            backgroundColor="pink"
            backgroundImage="url(/image/location3.png)"
            backgroundSize="cover"
          ></Box>
          <Box
            position="relative"
            top="12px"
            left="20%"
            fontSize="20px"
            fontWeight="800"
            color="brown"
          >
            Hệ Thống Cửa Hàng
          </Box>
        </Box>
        <Box
          marginTop="10px"
          width="100%"
          height="150px"
          //  backgroundColor='white'
        >
          <Box width="80%" height="100%" marginLeft="18%">
            <b fontSize="20px">Hà Nội</b>
            <br />
            <span fontSize="15px">120 Thái Hà, Q. Đống Đa</span>
            <br />
            <span>Điện thoại: 0969.120.120 (Bán hàng)</span>
            <br />
            <span>Kỹ thuật: 0123456789</span>
            <br />
            <span fontSize="15px">398 Cầu Giấy, Q. Cầu Giấy</span>
            <br />
            <span>Điện thoại: 096.1111.398-037.437.9999 </span>
            <br />
          </Box>
        </Box>
        <Box
          marginTop="10px"
          width="100%"
          height="150px"
          //  backgroundColor='white'
        >
          <Box width="80%" height="100%" marginLeft="18%" bg="red">
            <b fontSize="20px">Hồ Chí Minh</b>
            <br />
            <span fontSize="15px">123 Trần Quang Khải, Q.1</span>
            <br />
            <span>Điện thoại: 0965.123.123(Bán hàng)</span>
            <br />
            <span>Kỹ thuật: 0969.520.520</span>
            <br />
            <span fontSize="15px">602 Lê Hồng Phong, P.10, Q.10</span>
            <br />
            <span>097.1111.602-097.3333.602</span>
            <br />
          </Box>
        </Box>
      </Box>
      <Box
        float="left"
        width="25%"
        height="100%"
        //    backgroundColor='pink'
      >
        <Box
          marginTop="10px"
          width="100%"
          height="50px"
          // backgroundColor='white'
        >
          <Box
            float="left"
            position="relative"
            top="10px"
            left="16%"
            width="30px"
            height="30px"
            // backgroundColor='pink'
            backgroundImage="url(/image/location3.png)"
            backgroundSize="cover"
          ></Box>
          <Box
            position="relative"
            top="12px"
            left="20%"
            fontSize="20px"
            fontWeight="800"
            color="brown"
          >
            Quy định-Chính sách
          </Box>
          <Box
            marginTop="40px"
            marginLeft="58px"
            width="80%"
            height="300px"
            // backgroundColor='green'
          >
            <ul>
              <li>Chính sách bảo hành</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách đổi trả hàng</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>Hướng dẫn thanh toán</li>
              <li>Hướng dẫn mua hàng Online</li>
              <li>Dịch vụ Ship COD Toàn quốc</li>
              <li>Chính sách đại lý linh, phụ kiện</li>
            </ul>
          </Box>
        </Box>
      </Box>

      <Box
        float="left"
        width="25%"
        height="100%"
        //    backgroundColor='blue'
      >
        <Box
          marginTop="10px"
          width="100%"
          height="50px"
          // backgroundColor='white'
        >
          <Box
            float="left"
            position="relative"
            top="10px"
            left="16%"
            width="30px"
            height="30px"
            backgroundColor="pink"
            backgroundImage="url(/image/location3.png)"
            backgroundSize="cover"
          ></Box>
          <Box
            position="relative"
            top="12px"
            left="20%"
            fontSize="20px"
            fontWeight="800"
            color="brown"
          >
            Liên hệ với chúng tôi
          </Box>
          <Box
            marginTop="40px"
            marginLeft="58px"
            width="80%"
            height="300px"
            // backgroundColor='green'
          >
            <Box
              width="100%"
              height="30px"
              // backgroundColor='white'
              marginTop="40px"
            >
              <Box float="left">
                <a href="https://www.facebook.com/profile.php?id=100036524874220">
                  <img
                    width="30px"
                    height="30px"
                    src="/image/Facebook.png"
                    alt=""
                  />
                </a>
              </Box>
              <Box float="left" marginLeft="70px">
                <a href="https://www.facebook.com/profile.php?id=100036524874220">
                  <img
                    width="30px"
                    height="30px"
                    src="/image/youtube.png"
                    alt=""
                  />
                </a>
              </Box>
              <Box marginLeft="70px" float="left">
                <a href="https://www.facebook.com/profile.php?id=100036524874220">
                  <img
                    width="30px"
                    height="30px"
                    src="/image/instagram.jpg"
                    alt=""
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box 
           float='left'
           width='25%'
           height='100%' 
           backgroundColor='blue'         
           >
            
           </Box> */}
    </Box>
  );
}
export default End;
