import { Button } from '@chakra-ui/react';

function But(props) {
  return (
    <Button
      width="100px"
      height="30px"
      bg="antiquewhite"
      color="black"
      border="none"
      outline="0 !important"
      boxShadow="0 0 0 0.2px black"
    >
      {props.Name}
    </Button>
  );
}
export default But;
