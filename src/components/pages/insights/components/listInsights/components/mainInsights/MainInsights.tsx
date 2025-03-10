import InsightItem from '@/components/common/insightItem';
import { InsightFE } from '@/components/common/insightItem/sharedType';
import PageWrapper from '@/components/common/pageWrapper';

import './MainInsights.scss';

interface Props {
  insightList?: InsightFE[];
}

const MainInsights = ({ insightList }: Props) => {
  const getFirstInsight = () => {
    if (insightList) return insightList[0];
  };

  const getMainOtherInsights = () => {
    if (insightList) {
      if (insightList?.length > 2) {
        return insightList?.slice(1, 3);
      } else {
        return insightList?.slice(1);
      }
    }
  };

  return (
    <PageWrapper className="main-insights">
      <div className="first-insight">
        <InsightItem item={getFirstInsight()} isMain={true} withBg={true} />
      </div>

      <div className="other-insights">
        {getMainOtherInsights()?.map((insight, key) => {
          return (
            <div className="item-container" key={key}>
              <InsightItem
                item={{
                  urlPath: insight?.urlPath,
                  type: insight?.type,
                  publishedDate: insight?.publishedDate,
                  title: insight?.title,
                }}
              />
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default MainInsights;
