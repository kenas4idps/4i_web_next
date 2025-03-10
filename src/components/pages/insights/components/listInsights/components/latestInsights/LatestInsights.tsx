'use client';

import { useContext, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider';

import InsightsListHandler from '@/utils/InsightsListHandler';

import { InsightFE } from '@/components/common/insightItem/sharedType';

import PageWrapper from '@/components/common/pageWrapper';
import InsightItem from '@/components/common/insightItem';

import './LatestInsights.scss';
import { api } from '@/api';
import { CaseStudyListBE } from '../../SharedType';

const LatestInsights = () => {
  const t = useTranslations('insights');
  const locale = useLocale();

  const { displayNotification } = useContext(NotificationContext);

  const [latestInsightsList, setLatestInsightsList] = useState<InsightFE[]>();

  const getInsightsList = async () => {
    try {
      const response = await api.insight.collection.getInsightsListData(0, [], true, 3, locale);

      if ('content' in response) {
        const insightsListData: CaseStudyListBE = response.content;

        const insightList = InsightsListHandler().handleInsightList(insightsListData?.data);

        if (insightList) {
          setLatestInsightsList(insightList);
        }
      }
    } catch (error) {
      displayNotification(
        `Something Went Wrong Fetching Insight Data, Please Try Again !`,
        'error',
      );
      console.error(`[Error - API] Error calling Insight data`, error);
    }
  };

  useEffect(() => {
    getInsightsList();
    // eslint-disable-next-line
  }, [locale]);

  return (
    <>
      {latestInsightsList && latestInsightsList?.length > 0 && (
        <PageWrapper className="latest-insights">
          <div className="title-latest">{t('latestInsightTitle')}</div>

          <div className="latest-insights-container">
            {latestInsightsList?.map((insight, key) => {
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
        </PageWrapper>
      )}
    </>
  );
};

export default LatestInsights;
