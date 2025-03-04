import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export interface GetInTouchPayloadType {
  full_name: string;
  email_address: string;
  phone_number: string;
  company?: string;
  topic: string;
  message: string;
  locale: string;
}

export function getInTouchFormApi({ axios }: userAPIProps) {
  return {
    async submitGetInTouchForm(formData: GetInTouchPayloadType): Promise<ApiResponse<any>> {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_STRAPI_API_URL}/get-in-touches`,
          {
            data: formData,
          },
        );
        return new SuccessfulApiResponse(response);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
