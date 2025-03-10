import { Image, ImageFE, SeoBE } from '@/api/models/shared';

interface ElementParagraphBE {
  id: number;
  paragraph: string;
  __component: 'individual-insight.paragraph';
}

interface ElementDoubleImageBE {
  id: number;
  image_one: Image;
  image_two: Image;
  __component: 'individual-insight.double-image';
}

interface ElementSingleImageBE {
  id: number;
  image: Image;
  __component: 'individual-insight.single-image';
}

type ElementBE = ElementParagraphBE | ElementDoubleImageBE | ElementSingleImageBE;

export interface InsightDataBE {
  seo: SeoBE;
  title: string;
  elements: ElementBE[];
  published: string;
  image: Image;
  locale: string;
  insight_types: {
    data: {
      id: number;
      attributes: {
        type: string;
      };
    }[];
  };
  localizations: {
    data: {
      id: number;
      attributes: {
        locale: string;
      };
    }[];
  };
  publishedAt: string;
  updatedAt: string;
}

interface ElementParagraphFE {
  paragraph: string;
  name: string;
}

interface ElementDoubleImageFE {
  image_one: ImageFE;
  image_two: ImageFE;
  name: string;
}

interface ElementSingleImageFE {
  image: ImageFE;
  name: string;
}

type ElementFE = ElementParagraphFE | ElementDoubleImageFE | ElementSingleImageFE | undefined;

export interface InsightDataFE {
  title: string;
  type: string[];
  image: ImageFE;
  locale: string;
  publishedDate: string;
  updatedAt: string;
  publishedAt: string;
  elementsList: ElementFE[] | undefined;
  localizations: {
    attributes: {
      locale: string;
    };
    id: number;
  }[];
  tableContents: any[];
}

export const insightDataHandler = (insightData: InsightDataBE) => {
  const tableContents: any[] = [];

  const elementsList: ElementFE[] = insightData?.elements?.map(element => {
    if (element?.__component === 'individual-insight.paragraph') {
      const headings = element?.paragraph.match(/^## .+/gm)?.map(i => i.replace(/^## /, '')) || [];

      tableContents.push(headings);

      return {
        paragraph: element?.paragraph,
        name: element?.__component,
      };
    } else if (element?.__component === 'individual-insight.double-image') {
      return {
        name: 'individual-insight.double-image',
        image_one: {
          url: `${process.env.REACT_APP_STRAPI_URL}${element?.image_one?.data?.attributes?.url}`,
          caption: element?.image_one?.data?.attributes?.caption,
          alternativeText: element?.image_one?.data?.attributes?.alternativeText,
        },
        image_two: {
          url: `${process.env.REACT_APP_STRAPI_URL}${element?.image_two?.data?.attributes?.url}`,
          caption: element?.image_two?.data?.attributes?.caption,
          alternativeText: element?.image_two?.data?.attributes?.alternativeText,
        },
      };
    } else if (element?.__component === 'individual-insight.single-image') {
      return {
        name: 'individual-insight.single-image',
        image: {
          url: `${process.env.REACT_APP_STRAPI_URL}${element?.image?.data?.attributes?.url}`,
          caption: element?.image?.data?.attributes?.caption,
          alternativeText: element?.image?.data?.attributes?.alternativeText,
        },
      };
    }
    return undefined;
  });

  return {
    title: insightData?.title,
    type: insightData?.insight_types?.data?.map(type => type?.attributes?.type),
    locale: insightData?.locale,
    image: {
      url: `${process.env.REACT_APP_STRAPI_URL}${insightData?.image?.data?.attributes?.url}`,
      caption: insightData?.image?.data?.attributes?.caption,
      alternativeText: insightData?.image?.data?.attributes?.alternativeText,
    },
    publishedDate: insightData?.published,
    elementsList: elementsList,
    localizations: insightData?.localizations?.data,
    publishedAt: insightData?.publishedAt,
    updatedAt: insightData?.updatedAt,
    tableContents: tableContents.flat(),
  };
};
