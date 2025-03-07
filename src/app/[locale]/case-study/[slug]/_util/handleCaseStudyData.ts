import {
  CaseStudyTypeBE,
  SeoBE,
  Image,
  ToolsListBE,
  ClientIndustriesDataBE,
} from '@/api/models/shared';

interface CaseStudyDataTypeBE {
  seo: SeoBE;
  title: string;
  banner_image: Image;
  show_banner_image: boolean;
  challenge: string;
  confidentiality: boolean;
  description: string;
  locale: string;
  images: {
    data: {
      attributes: {
        alternativeText: string;
        caption: string;
        url: string;
      };
    }[];
  };
  result: string;
  solution: string;
  case_study_types: {
    data: CaseStudyTypeBE[];
  };
  client: {
    data: {
      id: number;
      attributes: {
        Country: string;
        Name: string;
        client_industries: {
          data: ClientIndustriesDataBE[];
        };
      };
    };
  };
  tools: ToolsListBE;
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

export const handleCaseStudyData = (caseStudyData: CaseStudyDataTypeBE) => {
  return {
    title: caseStudyData?.title,
    bannerImage: {
      url: `${process.env.REACT_APP_STRAPI_URL}${caseStudyData?.banner_image?.data?.attributes?.url}`,
      caption: caseStudyData?.banner_image?.data?.attributes?.caption,
      alternativeText: caseStudyData?.banner_image?.data?.attributes?.alternativeText,
    },
    showBannerImage: caseStudyData?.show_banner_image,
    challenge: caseStudyData?.challenge,
    confidentiality: caseStudyData?.confidentiality,
    description: caseStudyData?.description,
    locale: caseStudyData?.locale,
    images: caseStudyData?.images?.data?.map(image => {
      return {
        url: `${process.env.REACT_APP_STRAPI_URL}${image?.attributes?.url}`,
        caption: image?.attributes?.caption,
        alternativeText: image?.attributes?.alternativeText,
      };
    }),
    result: caseStudyData?.result,
    solution: caseStudyData?.solution,
    caseStudyTypeList: caseStudyData?.case_study_types?.data?.map(type => type?.attributes?.name),
    client: {
      name: caseStudyData?.client?.data?.attributes?.Name,
      country: caseStudyData?.client?.data?.attributes?.Country,
      industry: caseStudyData?.client?.data?.attributes?.client_industries?.data?.map(
        industry => industry?.attributes?.name,
      ),
    },
    tools: caseStudyData?.tools?.data?.map(tool => tool?.attributes?.name),
    localizations: caseStudyData?.localizations?.data,
    publishedAt: caseStudyData?.publishedAt,
    updatedAt: caseStudyData?.updatedAt,
  };
};
