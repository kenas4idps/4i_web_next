export interface ClientBE {
  id: number;
  attributes: {
    name: string;
    country: string;
    client_industries: {
      id: number;
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
    logo: Image;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface FormatDetail {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: number;
}

export interface ImageFE {
  alternativeText?: string;
  caption?: string;
  url: string;
}

export interface Image {
  data: {
    attributes: {
      alternativeText: string;
      caption: string;
      createdAt?: string;
      ext: string;
      formats?: {
        large: FormatDetail;
        medium: FormatDetail;
        small: FormatDetail;
        thumbnail: FormatDetail;
      };
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string;
      provider: string;
      provider_metadata: string;
      size: number;
      updateAt: string;
      url: string;
      width: number;
    };
  };
}

export interface Video {
  data: {
    attributes: {
      alternativeText: string;
      caption: string;
      createdAt?: string;
      ext?: string;
      formats: null;
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string;
      provider: string;
      provider_metadata: string;
      size: number;
      updateAt: string;
      url: string;
      width: number;
    };
  };
}

export interface MetaSocialBE {
  socialNetwork: string;
  title: string;
  description: string;
  image?: Image;
}

export interface MetaSocialFE {
  socialNetwork?: string;
  title?: string;
  description?: string;
  image?: {
    alternativeText?: string;
    caption?: string;
    url?: string;
  };
}

export interface SeoBE {
  id: number;
  metaImage: Image;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  metaViewport?: string;
  structuredData?: string;
  metaSocial?: MetaSocialBE[];
}

export interface SeoFE {
  metaTitle: string;
  metaImage: ImageFE;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  metaViewport?: string;
  structuredData?: string;
  metaSocial?: {
    fb?: MetaSocialFE;
    twitter?: MetaSocialFE;
  };
  breadCrumb?: string;
  mainEntityOfPage?: string;
}

export interface PageDetailBE {
  id: number;
  title: string;
  description: string;
  banner_image: Image;
}

export interface PageDetailFE {
  title: string;
  description: string;
  bannerImage: ImageFE;
}

export interface WrittenTestimonialBE {
  id: number;
  attributes: {
    Testimonial: [
      {
        Client_Image: Image;
        Client_Name: string;
        Client_Occupation: string;
        Testimonial_Text: string;
        id: number;
        __component: string;
      },
    ];
    Type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface VideoTestimonialBE {
  id: number;
  attributes: {
    Testimonial: [
      {
        Video: Video;
        Client_Name: string;
        Client_Occupation: string;
        Testimonial_Text: string;
        id: number;
        __component: string;
      },
    ];
    Type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface SolutionsListFE {
  title: string;
  description: string;
  url: string;
  label: string;
  bannerImage: ImageFE;
}

export interface ServiceFE {
  title: string;
  description: string;
  icon: {
    name: string;
    alternativeText?: string;
    caption?: string;
    url: string;
  };
}

export interface DevelopmentServicesTypeFE {
  title: string;
  description: string;
  serviceList: ServiceFE[];
}

export interface ToolTypeFE {
  logo: ImageFE;
  name: string;
}

export type ToolsListFE = ToolTypeFE[] | [];

export interface CaseStudyBE {
  id: number;
  attributes: {
    url_path: string;
    title: string;
    banner_image: Image;
    show_banner_image: boolean;
    case_study_types: {
      data: CaseStudyTypeBE[];
    };
    client: {
      data: ClientBE;
    };
    description: string;
    challenge: string;
    solution: string;
    result: string;
    confidentiality: boolean;
    images: {
      data: Image[];
    };
    tools: [];
  };
}
export interface CaseStudyFE {
  bannerImage: ImageFE;
  challange: string;
  confidentiality: boolean;
  description: string;
  descriptionBanner: string;
  images: ImageFE[];
  result: string;
  solution: string;
}

export interface ApproachStepFE {
  key: number;
  title: string;
  description: string;
}

export interface ApproachFE {
  title: string;
  description: string;
  stepsList: ApproachStepFE[];
}

export interface DevelopmentStepTypeFE {
  tag: string;
  title: string;
  description: string;
}

export interface DevelopmentProcesstypeFE {
  descipriton: string;
  stepList: DevelopmentStepTypeFE[];
}

export interface PageInfo {
  seo: SeoFE;
  detail: PageDetailFE;
}

export interface ToolTypeBE {
  attributes: {
    logo: {
      logo: Image;
    };
    name: string;
    Ranking: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export interface ToolsListBE {
  data: ToolTypeBE[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

export interface ClientIndustriesDataBE {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface CaseStudyTypeBE {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface CaseStudyBannerFE {
  id: string;
  title: string;
  tags: string[];
  description: string;
  bannerImage: ImageFE;
}

export interface CaseStudyListBE {
  data: CaseStudyBE[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

export interface NewsletterSubscriberType {
  title?: string;
  request_base_url: string;
  first_name?: string;
  surname?: string;
  user_email: string;
  locale: string;
}
