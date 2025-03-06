export interface ClientIndustryType {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  clients: Clients;
  localizations: Localizations;
}

export interface Clients {
  data: Client[];
}

export interface Client {
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
}

export interface Localizations {
  data: ClientLocalization[];
}

export interface ClientLocalization {
  id: number;
  attributes: ClientLocalizationAttributes;
}

export interface ClientLocalizationAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}
