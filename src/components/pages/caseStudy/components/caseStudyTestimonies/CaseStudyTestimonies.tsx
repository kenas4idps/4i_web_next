'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';

import TextTestimonies from '@/components/layout/textTestimonies';

import './CaseStudyTestimonies.scss';

const CaseStudyTestimonies = () => {
  const t = useTranslations('casesStudies');

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  return (
    <PageWrapper className={`small case-studies-testimonies ${!isEmpty && 'show'}`}>
      <div className="title">{t('testimonialTitle')}</div>

      <TextTestimonies isDarkBg={true} onFetch={onFetch} />
    </PageWrapper>
  );
};

export default CaseStudyTestimonies;
