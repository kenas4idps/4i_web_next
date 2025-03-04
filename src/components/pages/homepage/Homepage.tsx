'use client';

import { useEffect, useContext, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import Nav from '@/components/layout/nav';
import HeroVideoBanner from '@/components/layout/heroVideoBanner';
import SimpleText from '@/components/layout/simpleText';
import GetInTouchCmp from '@/components/layout/getInTouchCmp';
import Footer from '@/components/layout/footer';
import Numbers from '@/components/layout/numbers';
import HeroBanner from '@/components/layout/heroBanner';
import StructuredData from '@/components/common/StructuredData';

import AllSolution from './components/allSolution';
import LearnMore from './components/learnMore';
import AllAwards from './components/allAwards';
import MainClients from './components/mainClients';
import HomePageTestimonies from './components/homePageTestimonies';

import { HomeDataContext } from '@/providers/homeDataProvider/HomeDataProvider';
import { SolutionsListContext } from '@/providers/solutionsListProvider/SolutionsListProvider';
import { BtnStyles } from '@/components/common/customButton';

import variables from '@/styles/_other.module.scss';
import { useTranslations } from 'next-intl';

const Homepage = () => {
  const t = useTranslations('homepage');
  const locale = useLocale();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const { seo, detail, awards, init } = useContext(HomeDataContext);
  const { solutionsList } = useContext(SolutionsListContext);

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [locale]);

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

  const homeSchema = `{
    "@context":"https://schema.org",
    "@type": "WebPage",
    "@id": "${window.location.href}",
    "url": "${window.location.href}",
    "name": "${seo?.metaTitle}",
    "description": "${seo?.metaDescription}",
    "inLanguage": "${locale}"
  }`;

  return (
    <>
      {seo && solutionsList && (
        <StructuredData
          seo={seo}
          solutionsList={solutionsList}
          locale={locale}
          mainEntityOfPage={homeSchema}
        />
      )}

      <Nav />

      {isMobile ? (
        <HeroBanner
          picture={detail?.bannerImage?.url}
          title={detail?.title}
          description={detail?.description}
        />
      ) : (
        <HeroVideoBanner
          linkVideo={detail?.bannerVideo?.url}
          videoType={detail?.bannerVideo?.type}
          title={detail?.title}
          subtitle={detail?.subtitle}
          description={detail?.description}
          btnList={bannerBtnList}
        />
      )}

      <SimpleText>
        {t('descriptionTxt')}
        <span className="colored">{t('descriptionHilighted')}</span>
      </SimpleText>

      <AllSolution />

      <LearnMore />

      {awards && <AllAwards awards={awards} />}

      <Numbers withBackgroundColor={true} />

      <HomePageTestimonies />

      <MainClients />

      <GetInTouchCmp />

      <Footer />
    </>
  );
};

export default Homepage;
