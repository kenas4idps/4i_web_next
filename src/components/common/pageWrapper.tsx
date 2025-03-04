import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface Props extends VariantProps<typeof pageWrapperStyles> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const pageWrapperStyles = cva('max-w-screen-lg px-4 mx-auto', {
  variants: {
    pageWrapperStyle: {
      small: 'max-w-screen-sm',
      default: '',
    },
  },
  defaultVariants: {
    pageWrapperStyle: 'default',
  },
});

const PageWrapper = ({ children, pageWrapperStyle, className = '', style }: Props) => {
  return (
    <div className={cn(pageWrapperStyles({ pageWrapperStyle }), className)} style={style}>
      {children}
    </div>
  );
};

export default PageWrapper;
