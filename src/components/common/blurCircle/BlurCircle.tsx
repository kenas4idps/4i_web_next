import { BlurCircleStyles } from './SharedTypes';

import './BlurCircle.scss';

interface Props {
  size?: string;
  margin?: string;
  isCenter?: boolean;
  style?: string;
  className?: string;
}

const BlurCircle = ({ size = 'auto', style = BlurCircleStyles.WHITE, className }: Props) => {
  return (
    <div
      className={`blur-circle ${style} ${className && className}`}
      style={{
        width: size,
        height: size,
        transform: 'translateZ(0)',
      }}
    ></div>
  );
};

export default BlurCircle;
