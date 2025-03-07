'use client';

import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/common/pageWrapper';
import { ImageFE } from '@/api/models/shared';

import './CaseStudyPictureList.scss';

interface Props {
  list: ImageFE[];
}

const CaseStudyPictureList = ({ list }: Props) => {
  const t = useTranslations('casesStudies');
  return (
    <PageWrapper>
      <h2 className="images-title">{t('imagesTitle')}</h2>
      <div className="case-study-picture-list">
        {list?.map((picture, key) => {
          return (
            <div className="picture-container" key={key}>
              <div className="picture" style={{ backgroundImage: `url(${picture?.url})` }}></div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default CaseStudyPictureList;
