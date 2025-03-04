import { SeoFE, ImageFE } from './shared';

export interface CommonPageDataTypeBEProps {
  seo: SeoFE;
  title: string;
  description: string;
  bannerImage: ImageFE;
}

export class CommonPageDataType {
  seo: SeoFE;
  title: string = '';
  description: string = '';
  bannerImage: ImageFE;

  constructor(data: CommonPageDataTypeBEProps) {
    this.seo = data.seo;
    this.title = data.title || this.title;
    this.description = data.description || this.description;
    this.bannerImage = data.bannerImage;
  }
}
