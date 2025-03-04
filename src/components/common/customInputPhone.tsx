import { useState } from 'react';
import { useLocale } from 'next-intl';
import PhoneInput from 'react-phone-input-2';
import cnLocal from 'react-phone-input-2/lang/cn.json';
import frLocal from 'react-phone-input-2/lang/fr.json';
import jpLocal from 'react-phone-input-2/lang/jp.json';
import deLocal from 'react-phone-input-2/lang/de.json';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

import 'react-phone-input-2/lib/style.css';

interface Props {
  label?: string;
  placeholder?: string;
  styleInpt?: InputPhoneStyles;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  errorsList?: string[];
}

export enum InputPhoneStyles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
}

const customInputPhoneStyles = cva('pb-8', {
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

const CustomInputPhone = ({
  label,
  placeholder,
  styleInpt = InputPhoneStyles.PRIMARY,
  onChange,
  errorsList = [],
  isRequired = false,
}: Props) => {
  const locale = useLocale();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const getDefaultCountry = () => {
    let res = 'us';
    switch (locale) {
      case 'en':
        res = 'us';
        break;
      case 'zh':
        res = 'tw';
        break;
      case 'de':
        res = 'ch';
        break;
      case 'fr':
        res = 'fr';
        break;
      case 'ja':
        res = 'jp';
        break;
      default:
        res = 'us';
        break;
    }

    return res;
  };

  const getLocal = () => {
    let res = undefined;
    switch (locale) {
      case 'en':
        res = undefined;
        break;
      case 'zh':
        res = cnLocal;
        break;
      case 'de':
        res = deLocal;
        break;
      case 'fr':
        res = frLocal;
        break;
      case 'ja':
        res = jpLocal;
        break;
      default:
        res = undefined;
        break;
    }

    return res;
  };

  return (
    <div className={cn(customInputPhoneStyles({ styleInpt, error: errorsList.length > 0 }))}>
      {label && (
        <label htmlFor={`${label}-id`} className="block pb-4">
          {label}
          {isRequired && ' *'}
          {errorsList.length > 0 && <span className="ml-2 text-red-500">!</span>}
        </label>
      )}

      <div className="relative">
        <PhoneInput
          country={getDefaultCountry()}
          placeholder={placeholder}
          onChange={value => {
            handleInputChange(value);
          }}
          value={inputValue}
          localization={getLocal()}
          containerClass="w-full"
          inputClass="w-full py-4 px-4 rounded-lg border-none outline-none"
          buttonClass="border-r border-gray-300"
          dropdownClass="bg-white border border-gray-300 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default CustomInputPhone;
