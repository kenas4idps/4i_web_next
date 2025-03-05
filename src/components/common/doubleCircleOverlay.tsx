import DoubleCircleImg from 'assets/img/doubleCircle2.svg';
import DoubleCircleGreyImg from 'assets/img/doubleCircleGrey.svg';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import Image from 'next/image';

interface Props {
  size?: string;
  margin?: string;
  isCenter?: boolean;
  style?: DoubleCircleOverlayStyles;
  className?: string;
}

export enum DoubleCircleOverlayStyles {
  WHITE = 'white',
  GREY = 'grey',
}

const doubleCircleOverlayStyles = cva('absolute z-[-1]', {
  variants: {
    style: {
      white: '',
      grey: '',
    },
  },
  defaultVariants: {
    style: 'white',
  },
});

const DoubleCircleOverlay = ({
  size = 'auto',
  style = DoubleCircleOverlayStyles.WHITE,
  className,
}: Props) => {
  const getCircleImg = () => {
    switch (style) {
      case DoubleCircleOverlayStyles.GREY:
        return DoubleCircleGreyImg;
      case DoubleCircleOverlayStyles.WHITE:
      default:
        return DoubleCircleImg;
    }
  };

  return (
    <div
      className={cn(doubleCircleOverlayStyles({ style }), className)}
      style={{
        width: size,
        height: size,
        transform: 'translateZ(0)',
      }}
    >
      <Image
        fill
        className="block h-full w-full"
        alt="double circle background"
        src={getCircleImg()}
      />
    </div>
  );
};

export default DoubleCircleOverlay;
