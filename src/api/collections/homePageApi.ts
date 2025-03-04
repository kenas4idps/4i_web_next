import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function homePageApi({ axios }: userAPIProps) {
  return {
    async getHomeData(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/home-page?locale=${locale}&populate=seo.metaImage,seo.metaSocial.image,detail.banner_video,detail.banner_image,awards.logo`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
