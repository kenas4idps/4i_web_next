import { useState } from 'react';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';

import VideoTestimonies from '@/components/layout/videoTestimonies';
import TextTestimonies from '@/components/layout/textTestimonies';

import './HomePageTestimonies.scss';

const HomePageTestimonies = () => {
  const t = useTranslations('homepage');

  const [isVideoTestimonialsEmpty, setIsVideoTestimonialsEmpty] = useState<boolean>(true);
  const [isWrittenTestimonialsEmpty, setIsWrittenTestimonialsEmpty] = useState<boolean>(true);

  const onFetchVideoTestimonials = (isVideoTestimonialsEmpty: boolean) => {
    setIsVideoTestimonialsEmpty(isVideoTestimonialsEmpty);
  };

  const onFetchWrittenTestimonials = (isWrittenTestimonialsEmpty: boolean) => {
    setIsWrittenTestimonialsEmpty(isWrittenTestimonialsEmpty);
  };

  return (
    <div
      className={`homepage-testimonies ${(!isWrittenTestimonialsEmpty || !isVideoTestimonialsEmpty) && 'show'}`}
    >
      <PageWrapper className={`homepage-video-testimonies ${!isVideoTestimonialsEmpty && 'show'}`}>
        <VideoTestimonies
          title={t('testimoniesTitle') as string}
          onFetch={onFetchVideoTestimonials}
        />
      </PageWrapper>
      <PageWrapper
        className={`homepage-text-testimonies small ${!isWrittenTestimonialsEmpty && 'show'}`}
      >
        <TextTestimonies onFetch={onFetchWrittenTestimonials} />
      </PageWrapper>
    </div>
  );
};

export default HomePageTestimonies;
