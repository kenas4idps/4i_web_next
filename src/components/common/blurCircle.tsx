import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface Props {
  size?: string;
  style?: BlurCircleStyles;
  className?: string;
}

export enum BlurCircleStyles {
  WHITE = 'white',
  GREY = 'grey',
}

const blurCircleStyles = cva('absolute z-[-1]', {
  variants: {
    style: {
      white:
        'filter blur-[250px] bg-[radial-gradient(circle,rgba(208,46,113,0.5)_0%,rgba(208,46,113,0)_90%)]',
      grey: 'filter blur-[100px] bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(61,61,61,1)_100%)]',
    },
  },
  defaultVariants: {
    style: BlurCircleStyles.WHITE,
  },
});

const BlurCircle = ({ size = 'auto', style = BlurCircleStyles.WHITE, className }: Props) => {
  return (
    <div
      className={cn(blurCircleStyles({ style }), className)}
      style={{
        width: size,
        height: size,
        transform: 'translateZ(0)',
      }}
    ></div>
  );
};

export default BlurCircle;
