import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface Props {
  children: ReactNode;
  onClickBtn?: () => void;
  btnStyle?: BtnStyles;
  className?: string;
  icon?: string;
}

export enum BtnStyles {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

const buttonStyles = cva('py-4 px-6 rounded-full border-none cursor-pointer text-lg font-medium', {
  variants: {
    btnStyle: {
      primary: 'text-white bg-blue-500 hover:bg-blue-700',
      secondary:
        'bg-transparent border border-gray-300 text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500',
      tertiary: 'text-white bg-pink-500 py-2 px-4 rounded-lg',
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
});

const CustomButton = ({
  children,
  onClickBtn,
  btnStyle = BtnStyles.PRIMARY,
  className = '',
  icon,
}: Props) => {
  return (
    <button
      className={cn(buttonStyles({ btnStyle, withIcon: !!icon }), className)}
      onClick={() => onClickBtn && onClickBtn()}
      style={{ backgroundImage: icon ? `url(${icon})` : undefined }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
