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

export interface CaseStudyListBE {
  data: InsightDataTypeBE[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}
