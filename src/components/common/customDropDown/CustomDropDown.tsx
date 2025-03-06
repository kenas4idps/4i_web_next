import { useEffect, useRef, useState } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { DropDownStyles } from '@/components/common/customDropDown/SharedTypes';

import CustomInputText from '@/components/common/customInputText';

import './CustomDropDown.scss';

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
  dropDownStyle?: string;
  errorsList?: string[];
  isRequired?: boolean;
  inputEnabled?: boolean;
  value?: string | null;
}

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
      className={`custom-dropdown ${dropDownStyle} ${errorsList.length > 0 && 'error'}`}
      ref={dropdownRef}
    >
      {label && (
        <div className="label">
          {label}
          {isRequired && ' *'}
          <span className="error-symbol">!</span>
        </div>
      )}

      <div className={`custom-inpt-container ${isOpen ? 'is-open' : ''}`}>
        <div className="custom-inpt" onClick={() => handleToggleDropdown()}>
          {selectedOption ? selectedOption?.label : placeholder}
        </div>

        <ul className="dropdown-menu">
          {inputEnabled && (
            <CustomInputText
              styleInpt={`${dropDownStyle} embedded`}
              placeholder={`${t('countrySearachPlaceHolder')}`}
              onChange={handleInputChange}
              forwardedRef={inputRef as React.RefObject<HTMLInputElement>}
            />
          )}
          {options?.map(option => (
            <li
              key={option?.value}
              className="dropdown-item"
              onClick={() => handleSelectOption(option)}
            >
              {option?.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomDropDown;
