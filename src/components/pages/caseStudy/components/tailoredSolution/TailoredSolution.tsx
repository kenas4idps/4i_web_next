'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import FullWidth from '@/components/common/fullWidth';

import './TailoredSolution.scss';
import CustomButton from '@/components/common/customButton';

const TailoredSolution = () => {
  const t = useTranslations('casesStudies');
  const router = useRouter();

  return (
    <FullWidth className="tailored-solution">
      <div className="tailored-solution-container">
        <div className="left-column">
          <div className="title">{t('tailoredSolutionsTitle')}</div>
        </div>

        <div className="right-column">
          <div className="description">{t('tailoredSolutionsDescription')}</div>

          <CustomButton onClick={() => router.push('/contact-us')}>
            {t('tailoredSolutionsBtn')}
          </CustomButton>
        </div>
      </div>
    </FullWidth>
  );
};

export default TailoredSolution;
