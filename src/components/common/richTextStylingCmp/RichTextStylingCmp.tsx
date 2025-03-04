import { ReactNode } from 'react';

import './RichTextStylingCmp.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const RichTextStylingCmp = ({ children, className = '' }: Props) => {
  return <div className={`rich-text-cmp ${className}`}>{children}</div>;
};

export default RichTextStylingCmp;
