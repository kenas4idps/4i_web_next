import { useEffect, useState } from 'react';

import './CustomCheckBox.scss';

interface Props {
  identifier: string;
  children: React.ReactNode;
  className?: string;
  onChange: (value: boolean) => void;
  value?: boolean;
}

const CustomCheckBox = ({ identifier, children, className, onChange, value = false }: Props) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = () => {
    onChange(!currentValue);
    setCurrentValue(current => !current);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className={`checkbox-container ${className && className}`}>
      <input
        onChange={event => handleChange()}
        checked={currentValue}
        type="checkbox"
        id={identifier}
        name={identifier}
      />

      <label htmlFor={identifier}>{children}</label>
    </div>
  );
};

export default CustomCheckBox;
