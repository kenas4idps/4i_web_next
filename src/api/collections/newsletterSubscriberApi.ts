import { AxiosInstance } from 'axios';
import { NewsletterSubscriberType } from '../models/shared';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function newsletterSubscriberApi({ axios }: userAPIProps) {
  return {
    async getSubscriberinfo(
      locale?: string,
      user_email?: string,
      id?: number,
    ): Promise<ApiResponse<any>> {
      try {
        let param = '';
        if (user_email !== '') {
          param = `?filters[user_email]=${user_email}&locale=${locale}`;
        } else if (id) {
          param = `/${id}`;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/newsletter-subscribers${param}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async createSubscriberEntry(formData: NewsletterSubscriberType): Promise<ApiResponse<any>> {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_STRAPI_API_URL}/newsletter-subscribers`,
          {
            data: formData,
          },
        );
        return new SuccessfulApiResponse(response.request.status);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async updateSubscriberConfimationStatus(
      id: number,
      updateTo: boolean,
    ): Promise<ApiResponse<any>> {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_STRAPI_API_URL}/newsletter-subscribers/${id}`,
          {
            data: {
              confirmed: updateTo,
            },
          },
        );
        return new SuccessfulApiResponse(response.request.status);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
