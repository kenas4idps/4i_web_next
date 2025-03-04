export interface NumbersTypeBE {
  projects_delivered: number;
  projects_delivered_extra_content: string;
  industries_we_served: number;
  industries_we_served_extra_content: string;
  office_locations: number;
  office_locations_extra_content: string;
  number_of_professionals: number;
  number_of_professionals_extra_content: string;
  countries_served: number;
  countries_served_extra_content: string;
  years_of_experience: number;
  years_of_experience_extra_content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface NumberTypeFE {
  labelKey: string;
  number: number;
  extraContent: string;
}
