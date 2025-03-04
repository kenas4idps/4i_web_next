import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface Props {
  errorMessageList: string[];
}

const inlineErrorMessageStyles = cva('p-2 rounded border mt-4 bg-red-500 text-white', {
  variants: {
    error: {
      true: 'border-yellow-500',
      false: '',
    },
  },
  defaultVariants: {
    error: true,
  },
});

const InlineErrorMessage = ({ errorMessageList }: Props) => {
  return (
    <>
      {errorMessageList.length > 0 && (
        <div className={cn(inlineErrorMessageStyles({ error: errorMessageList.length > 0 }))}>
          <ul className="pl-2">
            {errorMessageList.map((error, key) => (
              <li key={key}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default InlineErrorMessage;
