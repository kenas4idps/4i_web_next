'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import CustomButton from '@/components/common/customButton';
import FullWidth from '@/components/common/fullWidth';

import './CyberSecurityTailoredSolution.scss';

const CyberSecurityTailoredSolution = () => {
  const t = useTranslations('cyberSecurity');
  const router = useRouter();

  return (
    <div className="cyber-security-tailored-solutions">
      <FullWidth>
        <div className="cyber-security-tailored-solution-container">
          <div className="left-column">
            <div className="title">{t('tailoredSolutionsTitle')}</div>
          </div>

          <div className="right-column">
            <div className="description">{t('tailoredSolutionDescription')}</div>

            <CustomButton onClick={() => router.push('/contact-us')}>
              {t('contactUsBtn')}
            </CustomButton>
          </div>
        </div>
      </FullWidth>
    </div>
  );
};

export default CyberSecurityTailoredSolution;
