import Image from 'next/image';

import './ShareCmp.scss';

const FacebookIcon = '/assets/icons/facebook.svg';
const LinkedIn = '/assets/icons/linkedIn.svg';

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
              <Image width={24} height={24} src={option?.icon} alt={option?.label} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareCmp;
