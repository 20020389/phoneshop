import { Box } from "@chakra-ui/react";
import End from "../components/end";
import Header1 from "../components/header1";
 import Loginn from "../components/Loginn";
 export default function Login(){
    return (
        <Box 
     width='100vw'
     height='100vh'
    >
        <Box 
         width={'95%'}
         height='100%'
         position={'relative'}
         left={'2.5%'}
        >
            <Header1 ></Header1> 
            <Loginn namee='Đăng nhập'></Loginn>
            <End></End>  
        </Box>
         
    </Box>
    )
 }