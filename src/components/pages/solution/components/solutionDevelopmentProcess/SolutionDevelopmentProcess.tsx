'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import HistoricListCmp from '@/components/layout/historicListCmp';

import { DevelopmentStepTypeFE } from '@/api/models/shared';
import { BtnStyles } from '@/components/common/customButton/SharedTypes';

import CustomButton from '@/components/common/customButton';
import PageWrapper from '@/components/common/pageWrapper';

import './SolutionDevelopmentProcess.scss';

interface Props {
  description: string;
  list?: DevelopmentStepTypeFE[];
}

const SolutionDevelopmentProcess = ({ description, list }: Props) => {
  const t = useTranslations('solutions');
  const router = useRouter();

  return (
    <>
      {list && list?.length > 0 && (
        <div className="solution-development-process">
          <HistoricListCmp
            tag={t('developmentProcessTag')}
            title={t('developmentProcessTitle')}
            description={description}
            list={list}
          />
          <PageWrapper className="solution-development-process-button-container">
            <CustomButton
              btnStyle={BtnStyles.PRIMARY}
              onClick={() => router.push('/project-management')}
              className="solution-development-process-button"
            >
              {t('developmentProcessButtonText')}
            </CustomButton>
          </PageWrapper>
        </div>
      )}
    </>
  );
};

export default SolutionDevelopmentProcess;
