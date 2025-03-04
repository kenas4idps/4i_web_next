import { Image } from '@/api/models/shared';

export interface InsightDataTypeBE {
  id: number;
  attributes: {
    url_path: string;
    image: Image;
    title: string;
    published: string;
    insight_types: {
      data: {
        attributes: {
          type: string;
        };
      }[];
    };
    elements: {
      id: number;
      __component: string;
      paragraph: string;
    }[];
  };
}

const InsightsListHandler = () => {
  const handleInsightList = (insightsData: InsightDataTypeBE[]) => {
    const insightList = insightsData?.map(insight => {
      return {
        urlPath: insight?.attributes?.url_path,
        type: insight?.attributes?.insight_types?.data?.map(type => type?.attributes?.type),
        title: insight?.attributes?.title,
        paragraph: insight?.attributes?.elements.find(
          element => element?.__component === 'individual-insight.paragraph',
        )?.paragraph,
        publishedDate: insight?.attributes?.published,
      };
    });

    return insightList;
  };

  return {
    handleInsightList: handleInsightList,
  };
};

export default InsightsListHandler;
