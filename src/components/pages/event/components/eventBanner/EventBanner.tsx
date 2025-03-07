'use client';

import { useTranslations } from 'next-intl';
import Moment from 'react-moment';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

const ShareIcon = '/assets/icons/shareWhite.svg';

import { BtnStyles } from '@/components/common/customButton/SharedTypes';

import './EventBanner.scss';
import { useEffect, useRef, useState } from 'react';
import ShareCmp from '@/components/common/shareCmp';

interface Props {
  id: string;
  picture: string;
  categoryList: string[];
  title: string;
  startDate: Date;
  endDate: Date;
  place: string;
  onClickRegister: () => void;
}

const EventBanner = ({
  id,
  picture,
  categoryList,
  title,
  startDate,
  endDate,
  place,
  onClickRegister,
}: Props) => {
  const t = useTranslations('events');
  const [isShareOpen, setIsOpen] = useState(false);
  const shareRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickShare = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', checkIfClickShare);

    return () => {
      document.removeEventListener('click', checkIfClickShare);
    };
  }, []);

  const onClickShareIcon = () => {
    setIsOpen(current => !current);
  };

  return (
    <div className="event-banner" style={{ backgroundImage: `url(${picture})` }}>
      <div className="bg-gradiant">
        <PageWrapper className="event-banner-super-container">
          <div className="event-banner-container">
            <div className="tag">
              {categoryList?.map(category => {
                return <span key={category}>{category}</span>;
              })}
            </div>

            <h1 className="title">{title}</h1>

            <div className="details">
              <div className="detail-item">
                {t('on')} <Moment date={startDate} format="MMMM DD, YYYY, dddd" />
              </div>

              <div className="detail-item">
                <Moment date={startDate} format="hh:mm A" />
                {'-'}
                <Moment date={endDate} format="hh:mm A" />
                (GTM+8) PHST
              </div>

              <div className="detail-item">{place}</div>
            </div>

            <div className="action-list">
              <div className="btn-container" ref={shareRef}>
                <CustomButton onClick={() => onClickShareIcon()} icon={ShareIcon}>
                  {t('shareBtn')}
                </CustomButton>

                <div className={`share-options-container ${isShareOpen ? 'open' : ''}`}>
                  <ShareCmp url={`${window.location.href}`} />
                </div>
              </div>

              <div className="btn-container">
                <CustomButton onClick={() => onClickRegister()} btnStyle={BtnStyles.SECONDARY}>
                  {t('registerBtn')}
                </CustomButton>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default EventBanner;
