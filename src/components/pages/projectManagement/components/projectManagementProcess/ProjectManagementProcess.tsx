import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';

import './ProjectManagementProcess.scss';

const ProjectManagementProcess = () => {
  const t = useTranslations('projectManagement');

  return (
    <PageWrapper className="project-management-process small">
      <div className="introduction">
        <div className="tag">{t('processTag')}</div>

        <div className="title">{t('processMainTitle')}</div>

        <div className="description">{t('processDescription')}</div>
      </div>

      <div className="project-management-process-container">
        <div className="process-container">
          <div className="title">{t('processTitle1')}</div>

          <div className="description">{t('processDescription1')}</div>
        </div>

        <div className="process-container">
          <div className="title">{t('processTitle2')}</div>

          <div className="description">{t('processDescription2')}</div>
        </div>

        <div className="process-container">
          <div className="title">{t('processTitle3')}</div>

          <div className="description">{t('processDescription3')}</div>
        </div>

        <div className="process-container">
          <div className="title">{t('processTitle4')}</div>

          <div className="description">{t('processDescription4')}</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProjectManagementProcess;
