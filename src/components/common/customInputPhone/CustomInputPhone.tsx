'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

import PhoneInput from 'react-phone-input-2';
import cnLocal from 'react-phone-input-2/lang/cn.json';
import frLocal from 'react-phone-input-2/lang/fr.json';
import jpLocal from 'react-phone-input-2/lang/jp.json';
import deLocal from 'react-phone-input-2/lang/de.json';

import { InputPhoneStyles } from './SharedTypes';

import 'react-phone-input-2/lib/style.css';
import './CustomInputPhone.scss';

interface Props {
  label?: string;
  placeholder?: string;
  styleInpt?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  errorsList?: string[];
}

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
    <div className={`custom-input-phone ${styleInpt} ${errorsList.length > 0 && 'error'}`}>
      {label && (
        <label htmlFor={`${label}-id`}>
          {label}
          {isRequired && ' *'}
          <span className="error-symbol">!</span>
        </label>
      )}

      <div className="input-container">
        <PhoneInput
          country={getDefaultCountry()}
          placeholder={placeholder}
          onChange={value => {
            handleInputChange(value);
          }}
          value={inputValue}
          localization={getLocal()}
        />
      </div>
    </div>
  );
};

export default CustomInputPhone;
