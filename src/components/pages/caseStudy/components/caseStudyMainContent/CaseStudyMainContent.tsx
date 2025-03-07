'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import { DoubleCircleOverlayStyles } from '@/components/common/doubleCircleOverlay/SharedTypes';
import { BlurCircleStyles } from '@/components/common/blurCircle/SharedTypes';

import './CaseStudyMainContent.scss';

interface caseStudyInfoType {
  clientName?: string;
  caseStudyType: string[];
  industry: string[];
  country: string;
  tools: string[];
}

interface Props {
  children: ReactNode;
  topPicture: string;
  info?: caseStudyInfoType;
  showBannerImage: boolean;
}

const CaseStudyMainContent = ({ children, topPicture, info, showBannerImage = true }: Props) => {
  const t = useTranslations('casesStudies');

  return (
    <div className="case-study-main-content">
      <PageWrapper className="picture-container">
        {showBannerImage && (
          <img className="top-picture" src={topPicture} alt="case study visual presentation" />
        )}
      </PageWrapper>
      <div className="main-content-container">
        <BlurCircle
          className="blur-circle-top-container"
          size="900px"
          style={BlurCircleStyles.GREY}
        />

        <BlurCircle
          className="blur-circle-bottom-container"
          size="900px"
          style={BlurCircleStyles.GREY}
        />

        <DoubleCircleOverlay
          size="1363px"
          style={DoubleCircleOverlayStyles.GREY}
          className="double-circle-container-top"
        />

        <DoubleCircleOverlay
          size="1618px"
          style={DoubleCircleOverlayStyles.GREY}
          className="double-circle-container-bottom"
        />

        {info && (
          <PageWrapper className={`informations ${!showBannerImage && 'banner-image-hidden'}`}>
            {info?.clientName && (
              <div className="info-item">
                {t('clientLabel')} : {info?.clientName}
              </div>
            )}

            {info?.caseStudyType && info?.caseStudyType?.length > 0 && (
              <div className="info-item">
                {t('caseStudyTypeLabel')} :{' '}
                {info?.caseStudyType?.map((type, key) => {
                  return (
                    <span className="info-tool" key={key}>
                      {type}
                      {key + 1 !== info?.caseStudyType?.length && ', '}
                    </span>
                  );
                })}
              </div>
            )}

            {info?.industry && info?.industry?.length > 0 && (
              <div className="info-item">
                {t('clientIndustryLabel')} :{' '}
                {info?.industry?.map((type, key) => {
                  return (
                    <span className="info-tool" key={key}>
                      {type}
                      {key + 1 !== info?.industry?.length && ', '}
                    </span>
                  );
                })}
              </div>
            )}

            {info?.country && (
              <div className="info-item">
                {t('countryLabel')} : {info?.country}
              </div>
            )}

            {info?.tools && info?.tools?.length > 0 && (
              <div className="info-item">
                {t('toolsLabel')} :{' '}
                {info?.tools?.map((tool, key) => {
                  return (
                    <span className="info-tool" key={key}>
                      {tool}
                      {key + 1 !== info.tools.length && ', '}
                    </span>
                  );
                })}
              </div>
            )}
          </PageWrapper>
        )}
        {children}
      </div>
    </div>
  );
};

export default CaseStudyMainContent;
