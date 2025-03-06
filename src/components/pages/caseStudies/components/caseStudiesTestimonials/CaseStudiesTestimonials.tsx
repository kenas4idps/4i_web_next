'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import TextTestimonies from '@/components/layout/textTestimonies';

import './CaseStudiesTestimonials.scss';

const CaseStudiesTestimonials = () => {
  const t = useTranslations('casesStudies');

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  return (
    <PageWrapper className={`case-studies-testimonials small ${!isEmpty && 'show'}`}>
      <div className="introduction">
        <div className="tag">{t('testimonialTag')}</div>

        <div className="title">{t('testimonialTitle')}</div>

        <div className="description">{t('testimonialDescription')}</div>
      </div>

      <div className="case-studies-testmonies-container">
        <TextTestimonies onFetch={onFetch} />
      </div>
    </PageWrapper>
  );
};

export default CaseStudiesTestimonials;
