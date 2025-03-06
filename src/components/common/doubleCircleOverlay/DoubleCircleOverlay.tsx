import { DoubleCircleOverlayStyles } from './SharedTypes';
import Image from 'next/image';

const DoubleCircleImg = 'assets/img/doubleCircle2.svg';
const DoubleCircleGreyImg = 'assets/img/doubleCircleGrey.svg';

import './DoubleCircleOverlay.scss';

interface Props {
  size?: string;
  style?: string;
  className?: string;
}

const DoubleCircleOverlay = ({
  size = 'auto',
  style = DoubleCircleOverlayStyles.WHITE,
  className,
}: Props) => {
  const getCircleImg = () => {
    let resu = '';
    switch (style) {
      case DoubleCircleOverlayStyles.WHITE:
        resu = DoubleCircleImg;
        break;
      case DoubleCircleOverlayStyles.GREY:
        resu = DoubleCircleGreyImg;
        break;
      default:
        resu = DoubleCircleImg;
    }

    return resu;
  };

  return (
    <div
      className={`double-circle-overlay ${className && className}`}
      style={{
        width: size,
        height: size,
        transform: 'translateZ(0)',
      }}
    >
      <Image
        className="double-circle-img"
        alt="double circle background"
        src={getCircleImg()}
        fill
      />
    </div>
  );
};

export default DoubleCircleOverlay;
