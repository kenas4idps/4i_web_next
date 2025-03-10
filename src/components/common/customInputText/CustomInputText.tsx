'use client';

import { ChangeEvent, RefObject, useEffect, useState } from 'react';

import { InputTextStyles } from './SharedTypes';

const SendIcon = '/assets/icons/send.svg';

import './CustomInputText.scss';

interface Props {
  label?: string;
  placeholder?: string;
  styleInpt?: string;
  withBtn?: boolean;
  onBtnClick?: (value: string) => void;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  errorsList?: string[];
  forwardedRef?: RefObject<HTMLInputElement>;
  value?: string;
}

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
    <div className={`custom-input-text ${styleInpt} ${errorsList.length > 0 && 'error'}`}>
      {label && (
        <label htmlFor={`${label}-id`}>
          {label}
          {isRequired && ' *'}
          <span className="error-symbol">!</span>
        </label>
      )}

      <div className="input-container">
        <input
          id={`${label ? label : placeholder}-id`}
          placeholder={placeholder}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          ref={forwardedRef}
        />

        {withBtn && (
          <button
            className="inpt-btn"
            onClick={() => onBtnClick && onBtnClick(inputValue)}
            aria-label="Validate"
          >
            <div className="icon" style={{ backgroundImage: `url(${SendIcon})` }}></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInputText;
