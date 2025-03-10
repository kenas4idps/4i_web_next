'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import InsightsListHandler from '@/utils/InsightsListHandler';

import RichTextTransformCmp from '@/components/common/richTextTransformCmp';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';

import GetStarted from '@/components/layout/getStarted';

import InsightBanner from './components/insightBanner';
import InsightContent from './components/insightContent/InsightContent';
import InsightText from './components/insightContent/components/insightText';
import InsightPictures from './components/insightContent/components/insightPictures';
import RelatedInsight from './components/relatedInsight';
import { useLocale } from 'next-intl';
import { api } from '@/api';
import { InsightDataFE } from '@/app/[locale]/insight/[slug]/_util/insightDataHandler';

const Insight = ({ insight, slug }: { insight?: InsightDataFE | null; slug: string }) => {
  const locale = useLocale();
  const { id } = useParams();

  const [relatedInsightsList, setRelatedInsightsList] = useState<any>();

  const insightsListHandler = InsightsListHandler();

  const getInsightsList = async () => {
    const relatedInsightsListData = await api.insight.collection.getInsightsListData(
      0,
      insight?.type,
      true,
      3,
      locale,
      slug,
    );

    if ('content' in relatedInsightsListData) {
      const insightList = insightsListHandler.handleInsightList(
        relatedInsightsListData?.content?.data,
      );

      setRelatedInsightsList(insightList);
    }
  };

  useEffect(() => {
    getInsightsList();
    // eslint-disable-next-line
  }, [id, locale]);

  return (
    <>
      {insight && (
        <>
          <InsightBanner
            typesList={insight?.type}
            date={insight?.publishedDate}
            title={insight?.title}
            picture={insight?.image?.url}
          />

          <InsightContent tableOfContents={insight?.tableContents}>
            {insight?.elementsList?.map((element: any, i) => {
              if (element?.name === 'individual-insight.paragraph') {
                return (
                  <InsightText key={i}>
                    <RichTextStylingCmp>
                      <RichTextTransformCmp>{element?.paragraph}</RichTextTransformCmp>
                    </RichTextStylingCmp>
                  </InsightText>
                );
              } else if (element?.name === 'individual-insight.double-image') {
                return (
                  <InsightPictures
                    parentIndex={`${i}-parent-double-image`}
                    key={`${i}-parent-double-image`}
                    list={[
                      {
                        url: `${element?.image_one?.url}`,
                      },
                      {
                        url: `${element?.image_two?.url}`,
                      },
                    ]}
                  />
                );
              } else if (element?.name === 'individual-insight.single-image') {
                return (
                  <InsightPictures
                    parentIndex={`${i}-parent-single-image`}
                    key={`${i}-parent-single-image`}
                    list={[
                      {
                        url: `${element?.image?.url}`,
                        fullScreen: true,
                      },
                    ]}
                  />
                );
              }
              return <></>;
            })}
          </InsightContent>
        </>
      )}

      {relatedInsightsList && relatedInsightsList?.length > 0 && (
        <RelatedInsight list={relatedInsightsList} />
      )}

      <GetStarted className="get-started-onInSight" />
    </>
  );
};

export default Insight;
