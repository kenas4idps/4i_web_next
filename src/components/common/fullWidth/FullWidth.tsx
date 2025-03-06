import { ReactNode } from 'react';

import PageWrapper from '@/components/common/pageWrapper';

const TeamImg = '/assets/img/team.png';

import './FullWidth.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const FullWidth = ({ children, className = '' }: Props) => {
  return (
    <div
      className={`full-width-component ${className}`}
      style={{ backgroundImage: `url(${TeamImg})` }}
    >
      <div className="overlay"></div>
      <PageWrapper className="full-width-container">{children}</PageWrapper>
    </div>
  );
};

export default FullWidth;
