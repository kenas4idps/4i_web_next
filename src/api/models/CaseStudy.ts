import { SeoBE, Image, CaseStudyTypeBE, ClientIndustriesDataBE, ToolsListBE } from './shared';

export interface CaseStudyDataTypeBEProps {
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

export class CaseStudyDataType {
  seo: SeoBE;
  title: string = '';
  banner_image: Image;
  show_banner_image: boolean = false;
  challenge: string = '';
  confidentiality: boolean = false;
  description: string = '';
  locale: string = '';
  images: {
    data: {
      attributes: {
        alternativeText: string;
        caption: string;
        url: string;
      };
    }[];
  } = { data: [] };
  result: string = '';
  solution: string = '';
  case_study_types: {
    data: CaseStudyTypeBE[];
  } = { data: [] };
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
  } = { data: { id: 0, attributes: { Country: '', Name: '', client_industries: { data: [] } } } };
  tools: ToolsListBE;
  localizations: {
    data: {
      id: number;
      attributes: {
        locale: string;
      };
    }[];
  } = { data: [] };
  publishedAt: string = '';
  updatedAt: string = '';

  constructor(data: CaseStudyDataTypeBEProps) {
    this.seo = data.seo;
    this.title = data.title || this.title;
    this.banner_image = data.banner_image;
    this.show_banner_image = data.show_banner_image || this.show_banner_image;
    this.challenge = data.challenge || this.challenge;
    this.confidentiality = data.confidentiality || this.confidentiality;
    this.description = data.description || this.description;
    this.locale = data.locale || this.locale;
    this.images = data.images || this.images;
    this.result = data.result || this.result;
    this.solution = data.solution || this.solution;
    this.case_study_types = data.case_study_types || this.case_study_types;
    this.client = data.client || this.client;
    this.tools = data.tools;
    this.localizations = data.localizations || this.localizations;
    this.publishedAt = data.publishedAt || this.publishedAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
  }
}
