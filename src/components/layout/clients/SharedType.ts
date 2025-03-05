import { Image } from '@/api/models/shared';

export interface ClientFE {
  name: string;
  country: string;
  logo: {
    url: string;
    caption: string;
    alternativeText: string;
  };
}

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
