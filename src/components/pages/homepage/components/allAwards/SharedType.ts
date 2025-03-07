export interface AwardFE {
  id: number;
  logo: {
    alternativeText?: string;
    caption?: string;
    url: string;
    width?: number;
    height?: number;
  };
  name: string;
  link?: string;
}
