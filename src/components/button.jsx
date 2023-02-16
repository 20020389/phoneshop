import { Button } from "@chakra-ui/react"


function But(props){
    return(
        <Button 
        width='100px'
        height='30px'
        bg='antiquewhite'
        color='black'
        border='none'
        marginTop='3px'

        marginLeft='50px'
        marginRight='30px'
        outline= '0 !important'
        boxShadow='0 0 0 0.2px black'
        >
         {props.Name}
        </Button>
    )
}
export default But
