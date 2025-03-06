export interface CaseStudiesType {
  id: number;
  attributes: CaseStudiesAttributes;
}

export interface CaseStudiesAttributes {
  confidentiality: boolean;
  title: string;
  show_banner_image: boolean;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  url_path: string;
  rank: any;
  banner_image: BannerImage;
  case_study_types: CaseStudyTypes;
  images: Images;
  client: Client;
  localizations: Localizations;
}

export interface BannerImage {
  data: BannerImageData;
}

export interface BannerImageData {
  id: number;
  attributes: BannerImageAttributes;
}

export interface BannerImageAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  large: Large;
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface CaseStudyTypes {
  data: any[];
}

export interface Images {
  data: ImageData[];
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats2;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Formats2 {
  large: Large2;
  small: Small2;
  medium: Medium2;
  thumbnail: Thumbnail2;
}

export interface Large2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Small2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Medium2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Thumbnail2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface Client {
  data: ClientData;
}

export interface ClientData {
  id: number;
  attributes: ClientAttributes;
}

export interface ClientAttributes {
  name: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  rank: number;
  client_industries: ClientIndustries;
}

export interface ClientIndustries {
  data: ClientIndustryData[];
}

export interface ClientIndustryData {
  id: number;
  attributes: ClientIndustryAttributes;
}

export interface ClientIndustryAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Localizations {
  data: LocalizationData[];
}

export interface LocalizationData {
  id: number;
  attributes: LocalizationAttributes;
}

export interface LocalizationAttributes {
  confidentiality: boolean;
  title: string;
  show_banner_image: boolean;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  url_path: string;
  rank: any;
}

export interface CaseStudiesMeta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}
