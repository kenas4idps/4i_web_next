import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export enum BtnStyles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btnStyle?: BtnStyles;
  icon?: string;
}

const buttonStyles = cva(
  'py-4 px-6 rounded-full border-none cursor-pointer text-lg font-medium transition-colors duration-200',
  {
    variants: {
      btnStyle: {
        primary: 'text-3 bg-7 hover:bg-1 md:hover:bg-1',
        secondary:
          'bg-transparent border border-3 text-3 hover:bg-7 hover:text-3 hover:border-7 md:hover:bg-transparent md:hover:border-3 md:hover:text-3',
        tertiary: 'text-3 py-2.5 px-4 rounded-[25px] bg-15',
      },
      withIcon: {
        true: 'pr-14 bg-no-repeat bg-right-center bg-[length:20px]',
        false: '',
      },
    },
    defaultVariants: {
      btnStyle: 'primary',
      withIcon: false,
    },
  },
);

const CustomButton = ({
  children,
  onClick,
  btnStyle = BtnStyles.PRIMARY,
  className = '',
  icon,
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={cn(buttonStyles({ btnStyle, withIcon: !!icon }), className)}
      onClick={onClick}
      style={{ backgroundImage: icon ? `url(${icon})` : undefined }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
