import { getTranslations } from 'next-intl/server';
import PageWrapper from '@/components/common/pageWrapper';
import BlurCircle from '@/components/common/blurCircle';

import './ContactUsIntroduction.scss';

const ContactUsIntroduction = async () => {
  const t = await getTranslations('contactUs');

  return (
    <>
      <PageWrapper className="contact-us-introduction small">
        <BlurCircle size="922px" className="blur-circle-container" />
        <div className="tag">{t('tag')}</div>

        <h1 className="title">{t('title')}</h1>

        <div className="description">{t('introduction')}</div>
      </PageWrapper>
    </>
  );
};

export default ContactUsIntroduction;
