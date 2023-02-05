import { Box } from "@chakra-ui/react";
import Header1 from "../components/header1";
import Client from "../components/Client";
import End from "../components/end";
export default function Clients(){
    return(
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
            <Client></Client>
            <End></End>  
        </Box>
         
    </Box>
    )
}