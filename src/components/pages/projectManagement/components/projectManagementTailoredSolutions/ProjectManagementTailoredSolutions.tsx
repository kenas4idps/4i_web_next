'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import FullWidth from '@/components/common/fullWidth';
import CustomButton from '@/components/common/customButton';

import './ProjectManagementTailoredSolutions.scss';

const ProjectManagementTailoredSolutions = () => {
  const t = useTranslations('projectManagement');
  const router = useRouter();

  return (
    <div className="project-management-tailored-solutions">
      <FullWidth>
        <div className="project-management-tailored-solution-container">
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

export default ProjectManagementTailoredSolutions;
