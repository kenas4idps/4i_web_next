import { ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  errorsList?: string[];
  isRequired?: boolean;
}

const customTextAreaStyles = cva('pb-8', {
  variants: {
    error: {
      true: 'border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});

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
    <div className={cn(customTextAreaStyles({ error: errorsList.length > 0 }))}>
      {label && (
        <label htmlFor={`${label}-id`} className="block pb-4">
          {label}
          {isRequired && ' *'}
          {errorsList.length > 0 && <span className="ml-2 text-red-500">!</span>}
        </label>
      )}

      <textarea
        id={`${label}-id`}
        placeholder={placeholder}
        onChange={handleTextAreaChange}
        className="h-56 w-full resize-none rounded-lg border-none bg-gray-100 p-4 outline-none"
      />
    </div>
  );
};

export default CustomTextArea;
