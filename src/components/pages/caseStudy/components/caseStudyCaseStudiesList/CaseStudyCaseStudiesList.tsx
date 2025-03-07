'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { CaseStudyBannerFE } from '@/api/models/shared';

import CarouselCmp from '@/components/common/carouselCmp';

import './CaseStudyCaseStudiesList.scss';

interface Props {
  caseStudyList?: CaseStudyBannerFE[];
}

const CaseStudyCaseStudiesList = ({ caseStudyList }: Props) => {
  const t = useTranslations('casesStudies');
  const router = useRouter();

  const goToItem = (id: string) => {
    router.push(`/case-study/${id}`);
  };

  return (
    <div className="case-study-case-studies-list">
      <CarouselCmp
        title={t('caseStudiesCmpTitle')}
        isDarkBg={true}
        listItem={caseStudyList}
        onClickFunc={goToItem}
      />
    </div>
  );
};

export default CaseStudyCaseStudiesList;
