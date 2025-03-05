import { useTranslations } from 'next-intl';
import LeftPicture from 'assets/img/welcome-1.webp';
import RightPicture from 'assets/img/welcome-2.webp';

import './WelcomePopUp.scss';
import { useState } from 'react';
import Image from 'next/image';

const WelcomePopUp = () => {
  const t = useTranslations('welcome');

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="welcome-pop-up">
      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>

          <div className="pop-up-container">
            <div className="top-border">
              <div className="left-border"></div>
              <div className="right-border"></div>
            </div>

            <div className="close-pop-up" onClick={() => setIsOpen(false)}></div>

            <div className="content">
              <div className="title">{t('title')}</div>

              <div className="description">{t('description')}</div>
            </div>

            <div className="picture-list">
              <Image layout="fill" alt="swiss keyboard" className="picture" src={LeftPicture} />

              <Image layout="fill" alt="swiss chip" className="picture" src={RightPicture} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomePopUp;
