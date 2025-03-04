'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

import CustomInputText, { InputTextStyles } from './customInputText';

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  options: OptionType[];
  onSelect?: (value: string) => void;
  handleInputChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  dropDownStyle?: DropDownStyles;
  errorsList?: string[];
  isRequired?: boolean;
  inputEnabled?: boolean;
  value?: string | null;
}

export enum DropDownStyles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
}

const customDropDownStyles = cva('w-full pb-8', {
  variants: {
    dropDownStyle: {
      primary: 'bg-gray-100 text-black',
      secondary: 'bg-transparent border border-gray-300 text-gray-300',
      tertiary: 'bg-blue-500 text-white',
      quaternary: 'bg-gray-800 text-white',
      quinary: 'bg-green-500 text-white',
    },
    error: {
      true: 'border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    dropDownStyle: 'primary',
    error: false,
  },
});

const CustomDropDown = ({
  options,
  onSelect,
  label,
  placeholder = '',
  dropDownStyle = DropDownStyles.PRIMARY,
  errorsList = [],
  isRequired = false,
  inputEnabled = false,
  handleInputChange,
  value = null,
}: Props) => {
  const t = useTranslations('whitePaper');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const findOption = (optionValue: string | null) => {
    const tmp = options?.filter(option => {
      return option.value === optionValue;
    });

    return tmp[0];
  };

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(findOption(value));

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);

    setTimeout(() => {
      if (!isOpen) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, 100);
  };

  const handleSelectOption = (option: OptionType) => {
    setSelectedOption(option);

    if (onSelect) {
      onSelect(option?.value);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectedOption(findOption(value));
    //eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(null);
  }, [locale]);

  return (
    <div
      className={cn(customDropDownStyles({ dropDownStyle, error: errorsList.length > 0 }))}
      ref={dropdownRef}
    >
      {label && (
        <div className="pb-2">
          {label}
          {isRequired && ' *'}
          {errorsList.length > 0 && <span className="ml-2 text-red-500">!</span>}
        </div>
      )}

      <div className={`relative ${isOpen ? 'is-open' : ''}`}>
        <div
          className="flex cursor-pointer items-center justify-between rounded-lg p-4"
          onClick={() => handleToggleDropdown()}
        >
          {selectedOption ? selectedOption?.label : placeholder}
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            ▼
          </span>
        </div>

        {isOpen && (
          <ul className="absolute right-0 left-0 z-10 mt-2 max-h-48 overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
            {inputEnabled && (
              <CustomInputText
                styleInpt={`${dropDownStyle} embedded` as InputTextStyles}
                placeholder={`${t('countrySearachPlaceHolder')}`}
                onChange={handleInputChange}
                forwardedRef={inputRef as React.RefObject<HTMLInputElement>}
              />
            )}
            {options?.map(option => (
              <li
                key={option?.value}
                className="cursor-pointer p-2 text-center hover:bg-gray-200"
                onClick={() => handleSelectOption(option)}
              >
                {option?.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropDown;
