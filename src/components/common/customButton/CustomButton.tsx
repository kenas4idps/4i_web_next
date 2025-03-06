import { ReactNode } from 'react';

import { BtnStyles } from './SharedTypes';

import './CustomButton.scss';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btnStyle?: string;
  icon?: string;
}

const CustomButton = ({
  children,
  onClick,
  btnStyle = BtnStyles.PRIMARY,
  className = '',
  icon,
}: CustomButtonProps) => {
  return (
    <>
      <button
        className={`btn ${btnStyle} ${className} ${icon && 'with-icon'}`}
        onClick={onClick}
        style={{ backgroundImage: `url(${icon})` }}
      >
        {children}
      </button>
    </>
  );
};

export default CustomButton;
