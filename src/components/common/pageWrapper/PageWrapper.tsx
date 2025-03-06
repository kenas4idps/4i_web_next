import { ReactNode } from 'react';

import './PageWrapper.scss';

interface Props {
  children: ReactNode;
  pageWrapperStyle?: string;
  className?: string;
  style?: React.CSSProperties;
}

const PageWrapper = ({ children, pageWrapperStyle = '', className = '', style }: Props) => {
  return (
    <>
      <div className={`page-wrapper ${pageWrapperStyle} ${className}`} style={style}>
        {children}
      </div>
    </>
  );
};

export default PageWrapper;
