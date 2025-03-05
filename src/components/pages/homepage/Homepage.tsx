'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';

import HeroVideoBanner from '@/components/layout/heroVideoBanner';
import SimpleText from '@/components/layout/simpleText';
import GetInTouchCmp from '@/components/layout/getInTouchCmp';
import Footer from '@/components/layout/footer';
import Numbers from '@/components/layout/numbers';
import HeroBanner from '@/components/layout/heroBanner';

import AllSolution from './components/allSolution';
import LearnMore from './components/learnMore';
import AllAwards from './components/allAwards';
import MainClients from './components/mainClients';
import HomePageTestimonies from './components/homePageTestimonies';

import { HomePageDetailFE } from '@/providers/homeDataProvider/HomeDataProvider';
import { BtnStyles } from '@/components/common/customButton';

import variables from '@/styles/_other.module.scss';
import { useTranslations } from 'next-intl';
import { AwardFE } from '@/components/pages/homepage/components/allAwards/SharedType';
import { SeoFE } from '@/api/models/shared';
import { HomePageDataBE } from '@/app/[locale]/_util/getHomeData';

type HomepageProps = {
  data?: {
    homePageData?: HomePageDataBE;
    seo?: SeoFE;
    awards?: AwardFE[];
    detail?: HomePageDetailFE;
  };
};

const Homepage = ({ data }: HomepageProps) => {
  const t = useTranslations('homepage');
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const phoneSize = parseInt(variables?.mediaQueryPhone?.slice(0, -2));

    const handleResize = () => {
      if (window.innerWidth <= phoneSize) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bannerBtnList = [
    {
      btnTxt: t('bannerBtnTalkWithUs'),
      onClickBtn: () => router.push('/contact-us'),
    },
    {
      btnTxt: t('bannerBtnSolutions'),
      onClickBtn: () => router.push('/solutions'),
      btnStyle: BtnStyles.SECONDARY,
    },
  ];

  return (
    <>
      {isMobile ? (
        <HeroBanner
          picture={data?.detail?.bannerImage?.url}
          title={data?.detail?.title}
          description={data?.detail?.description}
        />
      ) : (
        <HeroVideoBanner
          linkVideo={data?.detail?.bannerVideo?.url}
          videoType={data?.detail?.bannerVideo?.type}
          title={data?.detail?.title}
          subtitle={data?.detail?.subtitle}
          description={data?.detail?.description}
          btnList={bannerBtnList}
        />
      )}

      <SimpleText>
        {t('descriptionTxt')}
        <span className="colored">{t('descriptionHilighted')}</span>
      </SimpleText>

      <AllSolution />

      <LearnMore />

      {data?.awards && <AllAwards awards={data?.awards} />}

      <Numbers withBackgroundColor={true} />

      <HomePageTestimonies />

      <MainClients />

      <GetInTouchCmp />

      <Footer />
    </>
  );
};

export default Homepage;
