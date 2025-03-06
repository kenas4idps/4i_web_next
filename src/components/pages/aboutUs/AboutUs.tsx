'use client';

import { useTranslations } from 'next-intl';

import HeroBanner from '@/components/layout/heroBanner';
import SimpleText from '@/components/layout/simpleText';
import Numbers from '@/components/layout/numbers';
import GetInTouchCmp from '@/components/layout/getInTouchCmp';
import TextTestimonies from '@/components/layout/textTestimonies';

import Ceo from './components/ceo';
import AboutUsDescription from './components/aboutUsDescription';
import OurHistory from './components/ourHistory';
import WeArePasionate from './components/weArePasionate';

import './AboutUs.scss';
import { SeoFE } from '@/api/models/shared';
import { ImageFE } from '@/api/models/shared';

type AboutUsProps = {
  data?:
    | {
        seo: SeoFE;
        description: string;
        title: string;
        bannerImage: ImageFE;
      }
    | {
        seo?: undefined;
        description?: undefined;
        title?: undefined;
        bannerImage?: undefined;
      };
};

const AboutUs = ({ data }: AboutUsProps) => {
  const t = useTranslations('aboutUs');

  return (
    <>
      <HeroBanner
        picture={data?.bannerImage?.url}
        title={data?.title}
        description={data?.description}
      />

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

      <GetInTouchCmp />
    </>
  );
};

export default AboutUs;
