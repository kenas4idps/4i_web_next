'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import CarouselCmp from '@/components/common/carouselCmp';
import CustomButton from '@/components/common/customButton';

import { CaseStudyBannerFE } from '@/api/models/shared';

import './SolutionCaseStudies.scss';

interface Props {
  list: CaseStudyBannerFE[];
}

const SolutionCaseStudies = ({ list }: Props) => {
  const t = useTranslations('solutions');
  const router = useRouter();

  const goToItem = (id: string) => {
    router.push(`/case-study/${id}`);
  };

  return (
    <>
      {list && list?.length > 0 && (
        <div className="solution-case-studies">
          <CarouselCmp
            title={t('caseStudiesCmpTitle')}
            description={t('caseStudiesCmpDescription') as string}
            listItem={list}
            onClickFunc={goToItem}
            extraContent={
              <CustomButton onClick={() => router.push('/case-studies')}>
                {t('caseStudiesCmpBtn')}
              </CustomButton>
            }
          />
        </div>
      )}
    </>
  );
};

export default SolutionCaseStudies;
