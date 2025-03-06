export interface CompanyHistoryApi {
  data: CompanyHistoryBE[];
  meta: Meta;
}

interface CompanyHistoryBE {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  title: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  rank: number;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
