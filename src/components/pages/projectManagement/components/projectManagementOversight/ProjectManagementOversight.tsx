import { useTranslations } from 'next-intl';

import FullWidth from '@/components/common/fullWidth';

import './ProjectManagementOversight.scss';

const ProjectManagementOversight = () => {
  const t = useTranslations('projectManagement');

  return (
    <div className="project-management-oversight">
      <FullWidth>
        <div className="project-management-oversight-container">
          <div className="title">{t('projectOversightTitle')}</div>

          <div className="description">{t('projectOversightDescription')}</div>
        </div>
      </FullWidth>
    </div>
  );
};

export default ProjectManagementOversight;
