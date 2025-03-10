'use client';

import PageWrapper from '@/components/common/pageWrapper';

import InsightItem from '@/components/common/insightItem';
import { InsightFE } from '@/components/common/insightItem/sharedType';

import './RelatedInsight.scss';
import { useTranslations } from 'next-intl';

interface Props {
  list?: InsightFE[];
}

const RelatedInsight = ({ list }: Props) => {
  const t = useTranslations('insights');

  return (
    <PageWrapper className="related-insight">
      <div className="title-related-article">{t('relatedInsightTitle')}</div>

      <div className="related-article-container">
        {list?.map((insight, key) => {
          return (
            <div className="item-container" key={key}>
              <InsightItem
                item={{
                  urlPath: insight.urlPath,
                  type: insight.type,
                  publishedDate: insight.publishedDate,
                  title: insight.title,
                  paragraph: insight.paragraph,
                }}
                withBg={key === 0}
              />
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default RelatedInsight;
