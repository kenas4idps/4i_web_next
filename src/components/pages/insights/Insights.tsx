import { InsightFE } from '@/components/common/insightItem/sharedType';

import ListInsights from './components/listInsights/ListInsights';

const Insights = ({ insightsList }: { insightsList?: InsightFE[] | null }) => {
  if (!insightsList) return null;

  return <ListInsights mainInsightsList={insightsList} />;
};

export default Insights;
