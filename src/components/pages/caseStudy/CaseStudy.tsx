'use client';

import { useContext, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider';

import CaseStudiesDataHandler from '@/utils/CaseStudiesDataHandler';

import { CaseStudyBannerFE } from '@/api/models/shared';
import { CaseStudyFE } from '@/app/[locale]/case-study/[slug]/page';

import { api } from '@/api';

import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import CaseStudyMainContent from './components/caseStudyMainContent';
import CaseStudyDescription from './components/caseStudyDescription';
import CaseStudyPictureList from './components/caseStudyPictureList';
import TailoredSolution from './components/tailoredSolution';
import CaseStudyTestimonies from './components/caseStudyTestimonies';
import CaseStudyCaseStudiesList from './components/caseStudyCaseStudiesList';

interface Props {
  caseStudy?: CaseStudyFE | null;
}

const CaseStudy = ({ caseStudy }: Props) => {
  const t = useTranslations('casesStudies');
  const locale = useLocale();
  const { displayNotification } = useContext(NotificationContext);

  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyBannerFE[]>();
  const [currentId, setCurrentId] = useState<string>();

  const caseStudiesDataHandler = CaseStudiesDataHandler();

  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split('/').pop();
    setCurrentId(id);
  }, []);

  const getCaseStudiesList = async (locale: string, currentId: string) => {
    try {
      const response = await api.shared.collection.getCaseStudiesData(
        locale,
        caseStudy?.caseStudyTypeList,
        undefined,
        0,
        currentId,
      );

      if ('content' in response) {
        const caseStudiesList = caseStudiesDataHandler.handleCaseStudiesData(response.content.data);

        if (caseStudiesList) {
          setCaseStudiesList(caseStudiesList);
        }
      }
    } catch (error) {
      console.error('Error fetching case studies list:', error);
      displayNotification(t('errorMessage'), 'error');
    }
  };

  useEffect(() => {
    if (currentId) {
      getCaseStudiesList(locale, currentId);
    }
  }, [locale, currentId]);

  return (
    <>
      {caseStudy && (
        <>
          <CaseStudyMainContent
            topPicture={caseStudy?.bannerImage?.url}
            info={{
              clientName: caseStudy?.confidentiality ? undefined : caseStudy?.client?.name,
              industry: caseStudy?.client?.industry,
              caseStudyType: caseStudy?.caseStudyTypeList,
              country: caseStudy?.client?.country,
              tools: caseStudy?.tools,
            }}
            showBannerImage={caseStudy?.showBannerImage}
          >
            <CaseStudyDescription>
              {caseStudy?.challenge && (
                <>
                  <h2>{t('challenge')}</h2>
                  <RichTextTransformCmp>{caseStudy?.challenge}</RichTextTransformCmp>
                </>
              )}

              {caseStudy?.solution && (
                <>
                  <h2>{t('solution')}</h2>
                  <RichTextTransformCmp>{caseStudy?.solution}</RichTextTransformCmp>
                </>
              )}

              {caseStudy?.result && (
                <>
                  <h2>{t('result')}</h2>
                  <RichTextTransformCmp>{caseStudy?.result}</RichTextTransformCmp>
                </>
              )}
            </CaseStudyDescription>

            {caseStudy?.images && caseStudy?.images?.length > 0 && (
              <CaseStudyPictureList list={caseStudy?.images} />
            )}

            {caseStudiesList && caseStudiesList?.length > 0 && (
              <CaseStudyCaseStudiesList caseStudyList={caseStudiesList} />
            )}

            <CaseStudyTestimonies />

            <TailoredSolution />
          </CaseStudyMainContent>
        </>
      )}
    </>
  );
};

export default CaseStudy;
