'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider';

import { ToolsListBE, ToolTypeBE, ToolTypeFE } from '@/api/models/shared';

import ToolsListCmp from '@/components/layout/toolsListCmp';

import './SolutionsTools.scss';
import CustomButton from '@/components/common/customButton';
import { api } from '@/api';

const handleToolsListData = (toolsListData: ToolTypeBE[]) => {
  return toolsListData?.map(tool => {
    return {
      logo: {
        url: `${process.env.REACT_APP_STRAPI_URL}${tool?.attributes?.logo?.logo?.data?.attributes?.url}`,
        caption: tool?.attributes?.logo?.logo?.data?.attributes?.caption,
        alternativeText: tool?.attributes?.logo?.logo?.data?.attributes?.alternativeText,
      },
      name: tool?.attributes?.name,
    };
  });
};

const SolutionsTools = () => {
  const t = useTranslations('solutions');

  const { displayNotification } = useContext(NotificationContext);

  const [toolsList, setToolsList] = useState<ToolTypeFE[]>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;

    getToolsList(currentPage.current);
  };

  const getToolsList = async (pageNum: number) => {
    try {
      const response = await api.tools.collection.getToolListData(currentPage.current);

      if ('content' in response) {
        const toolsListData: ToolsListBE = response.content;

        const toolsList = handleToolsListData(toolsListData?.data);

        const expectedNumOfTools = (currentPage.current + 1) * 7;

        const totalNumOfTools = toolsListData?.meta?.pagination?.total;

        if (expectedNumOfTools < totalNumOfTools) {
          setCanLoadMore(true);
        } else {
          setCanLoadMore(false);
        }

        if (toolsList) {
          if (pageNum === 0) {
            setToolsList(toolsList);
          } else {
            setToolsList(prevToolsList => [...prevToolsList, ...toolsList]);
          }
        }
      }
    } catch (error) {
      displayNotification('Something Went Wrong Handling Tools Data, Please Try Again !', 'error');
      console.error('[Error - API] Error calling Handling Tools Data', error);
    }
  };

  useEffect(() => {
    currentPage.current = 0;
    getToolsList(0);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {toolsList && toolsList?.length > 0 && (
        <>
          <div className="solutions-tools">
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
        </>
      )}
    </>
  );
};

export default SolutionsTools;
