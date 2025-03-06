import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';

import Image from 'next/image';

import './AboutUsDescription.scss';

const AboutUsImg = '/assets/img/aboutUs.png';

const AboutUsDescription = () => {
  const t = useTranslations('aboutUs');

  return (
    <div className="about-us-description">
      <div className="picture-container">
        <Image src={AboutUsImg} alt="Decorate desktop with computer" fill />
      </div>

      <PageWrapper className="about-us-description-container">
        <div className="content-container">
          <div className="tag">{t('aboutUsTag')}</div>

          <div className="title">{t('aboutUsTitle')}</div>

          <div className="description">{t('aboutUsDescription')}</div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default AboutUsDescription;
