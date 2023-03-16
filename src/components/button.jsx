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

/**
 *
 * @param {{
 *    variant?: "primary"
 *    className?: string
 * } & Omit<import("@chakra-ui/react").ButtonProps, 'className' | 'variant'>} param0
 * @returns
 */
export function MyButton({ className, ...props }) {
  return (
    <Button
      className={`!bg-[#5d83db] !text-white !gap-2 hover:!bg-[#799df1] active:!bg-[#3c6ee2] ${
        className ?? ''
      }`}
      {...props}
    />
  );
}

export default But;
