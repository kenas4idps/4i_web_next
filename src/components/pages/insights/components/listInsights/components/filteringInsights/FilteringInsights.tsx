'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider';

import InsightsListHandler from '@/utils/InsightsListHandler';

import { CaseStudyListBE } from '@/components/pages/insights/components/listInsights/SharedType';
import { DropDownStyles } from '@/components/common/customDropDown/SharedTypes';
import { InsightFE } from '@/components/common/insightItem/sharedType';

import PageWrapper from '@/components/common/pageWrapper';
import CustomDropDown from '@/components/common/customDropDown';
import CustomButton from '@/components/common/customButton';
import InsightItem from '@/components/common/insightItem';

import { api } from '@/api';

import './FilteringInsights.scss';

interface InsightTypeBE {
  id: number;
  attributes: {
    type: string;
  };
}

interface InsightTypeFE {
  label: string;
  value: string;
}

const FilteringInsights = () => {
  const t = useTranslations('insights');
  const locale = useLocale();
  const { displayNotification } = useContext(NotificationContext);

  const insightsListHandler = InsightsListHandler();

  const [filteredInsightsList, setFilteredInsightsList] = useState<InsightFE[]>([]);
  const [insightsTypeList, setInsightsTypeList] = useState<InsightTypeFE[]>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('All');

  const currentPage = useRef(0);

  const handleInsightsListData = (insightsTypeData: InsightTypeBE[]) => {
    const insightTypeList = insightsTypeData?.map(type => {
      return {
        label: type?.attributes?.type,
        value: type?.attributes?.type,
      };
    });

    const all = {
      label: t('filterAll'),
      value: 'All',
    };

    insightTypeList?.unshift(all);

    return insightTypeList;
  };

  const getInsightsList = async (pageNum?: number) => {
    try {
      const encodedFilter = encodeURIComponent(filter);

      const response = await api.insight.collection.getInsightsListData(
        pageNum,
        [encodedFilter],
        false,
        6,
        locale,
      );

      const responseTypeData = await api.insight.collection.getInsightsTypeData(locale);

      if ('content' in response && 'content' in responseTypeData) {
        const insightsListData: CaseStudyListBE = response.content.data;
        const insightsTypeData: InsightTypeBE[] = responseTypeData.content.data;

        console.log('insightsListData', insightsTypeData);

        const insightList = insightsListHandler.handleInsightList(insightsListData?.data);
        const insightsTypeList = handleInsightsListData(insightsTypeData);

        if (insightsTypeList) {
          setInsightsTypeList(insightsTypeList);
        }

        const expectedNumOfCaseStudies = (currentPage.current + 1) * 6;

        const totalNumOfCaseStudies = insightsListData?.meta?.pagination?.total;

        if (expectedNumOfCaseStudies < totalNumOfCaseStudies) {
          setCanLoadMore(true);
        } else {
          setCanLoadMore(false);
        }

        if (insightList) {
          if (pageNum === 0) {
            setFilteredInsightsList(insightList);
          } else {
            setFilteredInsightsList(prevInsightList => [...prevInsightList, ...insightList]);
          }
        }
      }
    } catch (error) {
      displayNotification(
        `Something Went Wrong Handling Insight List Data, Please Try Again !`,
        'error',
      );
      console.error(`[Error - API] Error handling Insight List data`, error);
    }
  };

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;

    getInsightsList(currentPage.current);
  };

  const onSelect = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    setFilter('All');
  }, [locale]);

  useEffect(() => {
    currentPage.current = 0;
    getInsightsList(0);
  }, [filter, locale]);

  return (
    <>
      {filteredInsightsList && (
        <PageWrapper className="filtering-insights">
          <div className="filtering-insights-super-container">
            <div className="filter">
              <CustomDropDown
                options={insightsTypeList}
                placeholder={t('filterPlaceholder') as string}
                dropDownStyle={DropDownStyles.TERTIARY}
                onSelect={onSelect}
              />
            </div>

            <div className="filtering-insights-container">
              {filteredInsightsList?.map((insight, key) => {
                return (
                  <div className="item-container" key={key}>
                    <InsightItem
                      item={{
                        urlPath: insight?.urlPath,
                        type: insight?.type,
                        publishedDate: insight?.publishedDate,
                        title: insight?.title,
                        paragraph: insight?.paragraph,
                      }}
                      withBg={key === 0}
                    />
                  </div>
                );
              })}
            </div>

            {canLoadMore && (
              <div className="load-more-btn">
                <CustomButton onClick={() => loadMore()}>{t('loadMoreBtn')}</CustomButton>
              </div>
            )}
          </div>
        </PageWrapper>
      )}
    </>
  );
};

export default FilteringInsights;
