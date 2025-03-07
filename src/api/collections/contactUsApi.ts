import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function contactUsApi({ axios }: userAPIProps) {
  return {
    async getContactUsSeoData(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/contact-us-page?populate=seo.metaImage,seo.metaSocial.image&locale=${locale}`,
        );
        return new SuccessfulApiResponse(response);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
