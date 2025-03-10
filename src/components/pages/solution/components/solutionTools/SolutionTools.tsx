'use client';

import { useTranslations } from 'next-intl';

import ToolsListCmp from '@/components/layout/toolsListCmp';

import { ToolsListFE } from '@/api/models/shared';

import './SolutionTools.scss';
import CustomButton from '@/components/common/customButton';

interface Props {
  label: string;
  list: ToolsListFE;
  canLoadMore: boolean;
  loadMore: () => void;
}

const SolutionTools = ({ list, label, canLoadMore, loadMore }: Props) => {
  const t = useTranslations('solutions');

  return (
    <>
      {list && list?.length > 0 && (
        <div className="solution-tools">
          <ToolsListCmp
            tag={`${label} ${t('technologyTag')}`}
            title={t('technologyTitle')}
            list={list}
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

export default SolutionTools;
