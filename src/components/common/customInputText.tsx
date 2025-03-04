import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

import SendIcon from '@/public/assets/icons/send.svg';

interface Props {
  label?: string;
  placeholder?: string;
  styleInpt?: InputTextStyles;
  withBtn?: boolean;
  onBtnClick?: (value: string) => void;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  errorsList?: string[];
  forwardedRef?: RefObject<HTMLInputElement>;
  value?: string;
}

export enum InputTextStyles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
}

const customInputTextStyles = cva('pb-8', {
  variants: {
    styleInpt: {
      primary: 'bg-gray-100 text-black',
      secondary: 'bg-transparent border border-gray-300 text-gray-300',
      tertiary: 'bg-blue-500 text-white',
      quaternary: 'bg-gray-800 text-white',
    },
    error: {
      true: 'border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    styleInpt: 'primary',
    error: false,
  },
});

const CustomInputText = ({
  label,
  placeholder,
  styleInpt = InputTextStyles.PRIMARY,
  withBtn = false,
  onBtnClick,
  onChange,
  errorsList = [],
  isRequired = false,
  forwardedRef,
  value = '',
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (onChange) {
      onChange(event.target.value);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={cn(customInputTextStyles({ styleInpt, error: errorsList.length > 0 }))}>
      {label && (
        <label htmlFor={`${label}-id`} className="block pb-4">
          {label}
          {isRequired && ' *'}
          {errorsList.length > 0 && <span className="ml-2 text-red-500">!</span>}
        </label>
      )}

      <div className="relative overflow-hidden rounded-lg">
        <input
          id={`${label ? label : placeholder}-id`}
          placeholder={placeholder}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          ref={forwardedRef}
          className="w-full rounded-lg border-none px-4 py-4 outline-none"
        />

        {withBtn && (
          <button
            className="absolute top-0 right-0 flex h-full w-14 items-center justify-center bg-gray-300"
            onClick={() => onBtnClick && onBtnClick(inputValue)}
            aria-label="Validate"
          >
            <div
              className="h-6 w-6 bg-contain"
              style={{ backgroundImage: `url(${SendIcon})` }}
            ></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInputText;
