'use client';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

import './ProjectManagementExpertise.scss';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const Img = '/assets/img/teamAndExpertise.jpg';

const ProjectManagementExpertise = () => {
  const t = useTranslations('projectManagement');
  const router = useRouter();

  return (
    <div className="project-management-expertise">
      <PageWrapper className="project-management-expertise-container">
        <div className="content-container">
          <div className="tag">{t('expertiseTag')}</div>

          <div className="title">{t('expertiseTitle')}</div>

          <div className="description">{t('expertiseDescription')}</div>

          <CustomButton
            onClick={() => {
              router.push('/about-us');
            }}
          >
            {t('aboutUsBtn')}
          </CustomButton>
        </div>
      </PageWrapper>

      <div className="picture-container">
        <img src={Img} alt="code on computer screen" />
      </div>
    </div>
  );
};

export default ProjectManagementExpertise;
