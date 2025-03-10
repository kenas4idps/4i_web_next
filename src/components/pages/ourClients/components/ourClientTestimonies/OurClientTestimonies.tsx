'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import PageWrapper from '@/components/common/pageWrapper';
import BlurCircle from '@/components/common/blurCircle';

import TextTestimonies from '@/components/layout/textTestimonies';

const BubblesImg = '/assets/img/bubbles4.png';

import './OurClientTestimonies.scss';

const OurClientTestimonies = () => {
  const t = useTranslations('ourClients');

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  return (
    <div
      className={`our-clients-testimonies ${!isEmpty && 'show'}`}
      style={{ backgroundImage: `url(${BubblesImg})` }}
    >
      <DoubleCircleOverlay size="1541px" className="double-circle-container" />

      <BlurCircle size="1285px" className="blur-circle-container" />

      <PageWrapper className="our-clients-testimonies-container small">
        <div className="introduction">
          <div className="tag">{t('testimoniesTag')}</div>

          <div className="title">{t('testimoniesTitle')}</div>
        </div>

        <TextTestimonies onFetch={onFetch} />
      </PageWrapper>
    </div>
  );
};

export default OurClientTestimonies;
