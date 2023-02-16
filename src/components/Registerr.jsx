import { Box, Text, Input, Button, Link } from "@chakra-ui/react";

 
export default function Registerr(props){

       const SignUp = (e)=>{
       }

       return(
        <Box 
         
          width={'70%'}
          height='360px'
          position={'relative'}
          left='15%' 
          top={'20px'}
          // bg='blue'
        >    
             <Text  color={'brown'} marginTop='15px' fontSize='20px' fontWeight='1000'>{props.namee}</Text>
             <Box
               width={'400px'}
               height='290px' border={'1px solid gray'} borderRadius='10px'
                marginLeft='30%' position='relative' top={'20px'}           
             >
                 <Text fontSize={'25px'} marginTop='15px' color='brown' fontWeight={'1000'} textAlign='center' >{props.namee}</Text><br />
                 <Input id="Email" marginLeft={'50px'}  outline='none !important'  width={'300px'} height='35px'
                        borderRadius={'4px'} placeholder='Email hoặc số điện thoại' bg={'aliceblue'}></Input>
                 <Input className="password" marginLeft={'50px'} marginTop='15px' outline='none !important' width={'300px'} height='35px'
                        borderRadius={'4px'} placeholder='Mật khẩu' bg={'aliceblue'}></Input>
                 <Input className=" repass " marginLeft={'50px'} marginTop='15px' outline='none !important' width={'300px'} height='35px'
                        borderRadius={'4px'} placeholder='Nhập lại mật khẩu' bg={'aliceblue'}></Input>
                 <Link href="" ><Button width={'300px'} height='50px' bg='rgb(219, 64, 53)'
                         marginTop={'20px'} marginLeft='50px' color={'white'} onClick={SignUp}>Gửi</Button></Link>
             </Box>
        </Box>
       )
}