import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

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
    <div className={cn('mt-2', className)}>
      <input
        onChange={handleChange}
        checked={currentValue}
        type="checkbox"
        id={identifier}
        name={identifier}
        className="m-0"
      />
      <label htmlFor={identifier} className="ml-2">
        {children}
      </label>
    </div>
  );
};

export default CustomCheckBox;
