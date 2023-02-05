import { Button } from "@chakra-ui/react"


function But(props){
    return(
        <Button 
        width='100px'
        height='30px'
        bg='grey'
        color='aliceblue'
        border='none'
        marginTop='3px'
        marginLeft='10px'
        marginRight='10px'
        outline= '0 !important'
        boxShadow='0 0 0 0.2px black'
        >
         {props.Name}
        </Button>
    )
}
export default But
