import { ImageFE } from 'types/SharedType';

export interface EventBannerType {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  category: string;
  title: string;
  description: string;
  bannerImage: ImageFE;
  location: string;
}
