'use client';

import { useTranslations } from 'next-intl';

import SimpleText from '@/components/layout/simpleText';
import Numbers from '@/components/layout/numbers';
import TextTestimonies from '@/components/layout/textTestimonies';

import Ceo from './components/ceo';
import AboutUsDescription from './components/aboutUsDescription';
import OurHistory from './components/ourHistory';
import WeArePasionate from './components/weArePasionate';

import './AboutUs.scss';

const AboutUs = () => {
  const t = useTranslations('aboutUs');

  return (
    <>
      <SimpleText withBubbles={true}>
        <h2 className="intro-title">{t('introTitle')}</h2>
        <p className="intro-description">{t('introDescription')}</p>
      </SimpleText>

      <Ceo />

      <AboutUsDescription />

      <OurHistory />

      <WeArePasionate />

      <Numbers />

      <div className="about-us-testimonies-container">
        <TextTestimonies />
      </div>
    </>
  );
};

export default AboutUs;
