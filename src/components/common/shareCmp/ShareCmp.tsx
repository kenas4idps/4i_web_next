import FacebookIcon from 'assets/icons/facebook.svg';
import LinkedIn from 'assets/icons/linkedIn.svg';

import './ShareCmp.scss';

interface Props {
  url: string;
  isVertical?: boolean;
}

const ShareCmp = ({ url, isVertical = false }: Props) => {
  const shareOption = [
    {
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      onClick: (url: string) => {
        window.open(url);
      },
      label: 'facebook',
    },
    {
      icon: LinkedIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      onClick: (url: string) => {
        window.open(url);
      },
      label: 'linkedIn',
    },
  ];

  return (
    <div className={`share-cmp ${isVertical ? 'vertical' : ''}`}>
      <p className="label">SHARE</p>
      <div className="share-options">
        {shareOption?.map((option, i) => {
          return (
            <div key={i} onClick={() => option?.onClick(option?.url)} className="share-option">
              <img src={option?.icon} alt={option?.label} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareCmp;
