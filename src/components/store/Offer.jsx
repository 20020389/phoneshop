import {
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Portal,
  InputLeftElement,
} from '@chakra-ui/react';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { TwitterPicker } from 'react-color';
import { useMyForm } from '../../hooks/useMyForm';

/**
 * @param {OfferProps} param0
 * @returns
 */
function OfferBase({ defaultValue, onChange, index }, ref) {
  const { register, handleSubmit, values, setValue } = useMyForm({
    defaultValue,
  });

  function submit(e) {
    onChange(e, index);
  }

  const submitForm = handleSubmit(submit, true);

  useEffect(() => {
    /**@type {any} */
    const e = values;
    onChange(e, index);
  }, [values]);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        await submitForm(undefined);
        return values;
      } catch (error) {
        return {};
      }
    },
  }));

  return (
    <div className={`flex items-center offer__table-row relative`}>
      <div className="w-[10%] text-center">{index + 1}</div>
      <div className="w-[22.5%] text-center p-2">
        <Input
          {...register('price', { required: true })}
          type="number"
          borderRadius={0}
          className="!border-[transparent] focus-visible:!shadow-none"
          placeholder="Giá"
        ></Input>
      </div>
      <div className="w-[22.5%] text-center p-2">
        <Input
          {...register('count', { required: true })}
          type="number"
          borderRadius={0}
          className="!border-[transparent] focus-visible:!shadow-none"
          placeholder="Số lượng"
        ></Input>
      </div>
      <div className="w-[22.5%] text-center p-2">
        <InputGroup>
          <Input
            value={values['color']}
            {...register('color', {
              required: true,
            })}
            borderRadius={0}
            className="!border-[transparent] focus-visible:!shadow-none"
            placeholder="Màu sắc"
          ></Input>
          <InputLeftElement>
            <Popover>
              <PopoverTrigger>
                <button
                  type="button"
                  className="w-[25px] h-[25px] border-[1px]"
                  style={{
                    background: values['color'],
                  }}
                ></button>
              </PopoverTrigger>
              <Portal appendToParentPortal={false}>
                <PopoverContent w="min-content" overflow="hidden">
                  <TwitterPicker
                    color={values['color']}
                    colors={[
                      '#FFFFFF',
                      '#FF6900',
                      '#FCB900',
                      '#00D084',
                      '#8ED1FC',
                      '#0693E3',
                      '#ABB8C3',
                      '#EB144C',
                      '#F78DA7',
                      '#9900EF',
                    ]}
                    className="offer__color-picker"
                    onChange={(e) => {
                      setValue('color', e.hex.toUpperCase());
                    }}
                  />
                </PopoverContent>
              </Portal>
            </Popover>
          </InputLeftElement>
        </InputGroup>
      </div>
      <div className="w-[22.5%] text-center p-2">
        <Input
          {...register('storage', { required: true })}
          borderRadius={0}
          className="!border-[transparent] focus-visible:!shadow-none"
          placeholder="Bộ nhớ"
        ></Input>
      </div>
    </div>
  );
}

const Offer = forwardRef(OfferBase);

export { Offer };
