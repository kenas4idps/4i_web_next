'use client';

import { useContext, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { api } from '@/api';

import { CaseStudyBannerFE } from '@/api/models/shared';

import CarouselCmp from '@/components/common/carouselCmp';
import CustomButton from '@/components/common/customButton';

import OurClientFilter from './components/ourClientFilter';
import OurClientTestimonies from './components/ourClientTestimonies';
import Partnership from './components/partnership';

import { NotificationContext } from '@/providers/notificationProvider';

import CaseStudiesDataHandler from '@/utils/CaseStudiesDataHandler';

const OurClients = () => {
  const t = useTranslations('ourClients');
  const locale = useLocale();
  const router = useRouter();
  const { displayNotification } = useContext(NotificationContext);

  const [currentFilter, setCurrentFilter] = useState<string>('All');
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyBannerFE[]>([]);

  const caseStudiesDataHabdler = CaseStudiesDataHandler();

  const goToItem = (id: string) => {
    router.push(`/case-study/${id}`);
  };

  const getCaseStudiesData = async (locale: string) => {
    try {
      const response = await api.shared.collection.getCaseStudiesData(locale, [], currentFilter, 0);

      if ('content' in response) {
        const caseStudiesListData = response.content.data;
        const caseStudiesList: CaseStudyBannerFE[] =
          caseStudiesDataHabdler.handleCaseStudiesData(caseStudiesListData);

        if (caseStudiesList) {
          setCaseStudiesList(caseStudiesList);
        }
      }
    } catch (error) {
      console.error(`[Error - API] Error handling Case Study data`, error);
      displayNotification(
        `Something Went Wrong handling Case Study Data, Please Try Again !`,
        'error',
      );
    }
  };

  useEffect(() => {
    getCaseStudiesData(locale);
    // eslint-disable-next-line
  }, [locale, currentFilter]);

  return (
    <>
      <OurClientFilter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

      {caseStudiesList && caseStudiesList?.length > 0 && (
        <CarouselCmp
          title={t('caseStudiesCmpTitle')}
          listItem={caseStudiesList}
          description={t('caseStudiesCmpDescription') as string}
          onClickFunc={goToItem}
          extraContent={
            <CustomButton onClick={() => router.push('/case-studies')}>
              {t('caseStudiesCmpBtn')}
            </CustomButton>
          }
        />
      )}

      <OurClientTestimonies />

      <Partnership />
    </>
  );
};

export default OurClients;
