import { ChangeEvent } from 'react';

import './CustomTextArea.scss';

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  errorsList?: string[];
  isRequired?: boolean;
}

const CustomTextArea = ({
  label,
  placeholder,
  onChange,
  errorsList = [],
  isRequired = false,
}: Props) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={`custom-textarea ${errorsList.length > 0 && 'error'}`}>
      {label && (
        <label htmlFor={`${label}-id`}>
          {label}
          {isRequired && ' *'}
          <span className="error-symbol">!</span>
        </label>
      )}

      <textarea id={`${label}-id`} placeholder={placeholder} onChange={handleTextAreaChange} />
    </div>
  );
};

export default CustomTextArea;
