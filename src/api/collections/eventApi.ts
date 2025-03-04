import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function eventApi({ axios }: userAPIProps) {
  return {
    async getEventData(id: string, locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/events?populate=seo.metaImage,seo.metaSocial.image,detail.banner_image,image_list,event_types,localizations&locale=${locale}&filters[url_path]=${id}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getEventListData(locale: string, filter?: string): Promise<ApiResponse<any>> {
      try {
        let params = '';
        if (filter === 'incoming') {
          const date = new Date().toISOString();
          params = `&filters[Date_Start][$gt]=${date}`;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/events?locale=${locale}&populate=detail.banner_image,image_list,event_types${params}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
