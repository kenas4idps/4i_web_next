import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import { InsightFE } from '@/components/common/insightItem/sharedType';

import MainInsights from './components/mainInsights';
import LatestInsights from './components/latestInsights';
import FilteringInsights from './components/filteringInsights';

import './ListInsights.scss';

interface Props {
  mainInsightsList?: InsightFE[];
}

const ListInsights = ({ mainInsightsList }: Props) => {
  return (
    <div className="list-insight">
      <DoubleCircleOverlay size="1540px" className="double-circle-container-top" />
      <DoubleCircleOverlay size="1000px" className="double-circle-container-bottom" />

      <BlurCircle size="1285px" className="blur-circle-container-top" />
      <BlurCircle size="1285px" className="blur-circle-container-bottom" />

      {mainInsightsList && mainInsightsList?.length > 0 && (
        <MainInsights insightList={mainInsightsList} />
      )}

      <LatestInsights />

      <FilteringInsights />
    </div>
  );
};

export default ListInsights;
