import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';

export function RadioCard({ disable, ...props }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      as="label"
      className={`relative overflow-hidden ${
        disable ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        className="!p-0"
        _checked={{
          '& + .checked': {
            opacity: 1,
          },
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
      <div className="checked pointer-events-none absolute bottom-0 right-0 p-[2px] w-[12px] h-[12px] opacity-0">
        <div className="bg-[#c69a39] w-full h-full absolute top-0 left-0 rotate-[45deg] scale-[2] translate-x-[7px] translate-y-[7px]"></div>
        <svg
          enable-background="new 0 0 12 12"
          viewBox="0 0 12 12"
          x="0"
          y="0"
          width="100%"
          height="100%"
          className="svg-icon icon-tick-bold fill-white relative translate-x-[1px] translate-y-[1px]"
        >
          <g>
            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
          </g>
        </svg>
      </div>
    </Box>
  );
}

/**
 *
 * @param {{
 *  options: string[],
 *  disables?: boolean[],
 *  value: string
 *  onChange: (e: string) => void,
 *  children: (value: string) => import('react').ReactElement
 * }} param0
 * @returns
 */
export function RadioGroup({ options, value, onChange, children, disables }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value, index) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} disable={disables?.at(index)} {...radio}>
            {children(value)}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
