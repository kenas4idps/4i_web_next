'use client';

import { useTranslations } from 'next-intl';

import { ToolTypeFE } from '@/api/models/shared';

import ToolsListCmp from '@/components/layout/toolsListCmp';

import './ProjectManagementTools.scss';
import CustomButton from '@/components/common/customButton';

interface Props {
  toolsList: ToolTypeFE[];
  canLoadMore: boolean;
  loadMore: () => void;
}

const ProjectManagementTools = ({ toolsList, canLoadMore, loadMore }: Props) => {
  const t = useTranslations('projectManagement');

  return (
    <>
      {toolsList && toolsList?.length > 0 && (
        <div className="project-management-tools">
          <ToolsListCmp
            title={t('toolsTag')}
            tag={t('toolsTitle')}
            description={t('toolsDescription') as string}
            list={toolsList}
          />
          {canLoadMore && (
            <div className="load-more-btn">
              <CustomButton onClick={() => loadMore()}>{t('loadMoreBtn')}</CustomButton>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectManagementTools;
