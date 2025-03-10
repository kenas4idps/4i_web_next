import {
  ApproachFE,
  DevelopmentProcesstypeFE,
  DevelopmentServicesTypeFE,
  DevelopmentStepTypeFE,
  ServiceFE,
  ToolsListBE,
  ToolsListFE,
  SeoBE,
  PageDetailBE,
  CaseStudyBE,
  Image,
} from '@/api/models/shared';

interface ServiceBE {
  title: string;
  description: string;
  icon: {
    data: {
      attributes: {
        icon: Image;
        createdAt: string;
        publishedAt: string;
        updatedAt: string;
      };
    };
  };
}

interface DevelopmentServicesTypeBE {
  id: number;
  title: string;
  description: string;
  services: ServiceBE[];
}

interface StepBE {
  id: number;
  title: string;
  description: string;
}

interface ApproachStepBE {
  id: number;
  title: string;
  description: string;
}

interface ApproachBE {
  id: number;
  title: string;
  description: string;
  steps: ApproachStepBE[];
}

interface ReasonDataTypeBE {
  id: number;
  label: string;
  description: string;
}

interface ReasonsDataTypeBE {
  id: number;
  title: string;
  list_of_reasons: ReasonDataTypeBE[];
}

export interface SolutionsDataTypeBE {
  seo: SeoBE;
  detail: PageDetailBE;
  introduction_text: string;
  label: string;
  white_paper_detail: {
    description: string;
    subtitle: string;
    title: string;
    id: number;
  };
  development_services: DevelopmentServicesTypeBE;
  development_process: {
    id: number;
    description: string;
    steps: StepBE[];
  };
  selected_case_studies: {
    case_studies: {
      data: CaseStudyBE[];
    };
  };
  tools: ToolsListBE;
  approach: ApproachBE;
  reasons_to_choose_us: ReasonsDataTypeBE;
  security_and_reliability: {
    id: number;
    title: string;
    description: string;
  };
  urlPath: string;
}

export const handleSolutionData = (solutionsData: SolutionsDataTypeBE) => {
  const seriveListData: ServiceFE[] = solutionsData?.development_services?.services?.map(
    service => {
      return {
        title: service?.title,
        description: service?.description,
        icon: {
          name: service?.icon?.data?.attributes?.icon?.data?.attributes?.name,
          alternativeText: service?.icon?.data?.attributes?.icon?.data?.attributes?.alternativeText,
          caption: service?.icon?.data?.attributes?.icon?.data?.attributes?.caption,
          url: `${process.env.REACT_APP_STRAPI_URL}${service?.icon?.data?.attributes?.icon?.data?.attributes?.url}`,
        },
      };
    },
  );

  const stepListData: DevelopmentStepTypeFE[] = solutionsData?.development_process?.steps.map(
    (step, index) => {
      return {
        tag: index + 1 + '',
        title: step?.title,
        description: step?.description,
      };
    },
  );

  const whitePaperDetail = {
    title: solutionsData?.white_paper_detail?.title,
    subtitle: solutionsData?.white_paper_detail?.subtitle,
    description: solutionsData?.white_paper_detail?.description,
  };

  const developmentServices: DevelopmentServicesTypeFE = {
    title: solutionsData?.development_services?.title,
    description: solutionsData?.development_services?.description,
    serviceList: seriveListData,
  };

  const developmentProcess: DevelopmentProcesstypeFE = {
    descipriton: solutionsData?.development_process?.description,
    stepList: stepListData,
  };

  const approach: ApproachFE = {
    title: solutionsData?.approach?.title,
    description: solutionsData?.approach?.description,
    stepsList: solutionsData?.approach?.steps?.map((step, index) => {
      return {
        key: index + 1,
        title: step?.title,
        description: step?.description,
      };
    }),
  };

  const reasonsList = {
    title: solutionsData?.reasons_to_choose_us?.title,
    list: solutionsData?.reasons_to_choose_us?.list_of_reasons?.map(reason => {
      return {
        title: reason?.label,
        content: reason?.description,
      };
    }),
  };

  const securityAndReliability = {
    title: solutionsData?.security_and_reliability?.title,
    description: solutionsData?.security_and_reliability?.description,
  };

  return {
    label: solutionsData?.label,
    introductionText: solutionsData?.introduction_text,
    whitePaperDetail: whitePaperDetail,
    developmentServices: developmentServices,
    developmentProcess: developmentProcess,
    approach: approach,
    reasonsList: reasonsList,
    securityAndReliability: securityAndReliability,
  };
};

export const handleToolsList = (tools: ToolsListBE) => {
  const toolsList: ToolsListFE = tools?.data
    ?.filter(
      item =>
        item.attributes.logo?.logo?.data !== undefined && item.attributes.logo?.logo?.data !== null,
    )
    .map(tool => {
      return {
        logo: {
          url: `${process.env.REACT_APP_STRAPI_URL}${tool?.attributes?.logo?.logo?.data?.attributes?.url}`,
          caption: tool?.attributes?.logo?.logo?.data?.attributes?.caption,
          alternativeText: tool?.attributes?.logo?.logo?.data?.attributes?.alternativeText,
        },
        name: tool?.attributes?.name,
      };
    });

  return toolsList;
};
