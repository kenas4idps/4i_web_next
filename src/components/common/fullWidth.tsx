import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

import PageWrapper from 'components/common/pageWrapper';
import TeamImg from 'assets/img/team.png';

interface Props {
  children: ReactNode;
  className?: string;
}

const fullWidthStyles = cva('w-full bg-cover bg-top relative text-white', {
  variants: {
    className: {
      true: '',
      false: '',
    },
  },
});

const FullWidth = ({ children, className = '' }: Props) => {
  return (
    <div
      className={cn(fullWidthStyles({ className: !!className }), className)}
      style={{ backgroundImage: `url(${TeamImg})` }}
    >
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[rgba(130,71,95,0.85)] to-[rgba(55,12,30,0.72)] shadow-lg"></div>
      <PageWrapper className="relative z-5 py-22 sm:py-20">{children}</PageWrapper>
    </div>
  );
};

export default FullWidth;
