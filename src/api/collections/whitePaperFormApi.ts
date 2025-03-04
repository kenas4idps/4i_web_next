import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export interface WhitePaperFormPayloadType {
  white_paper_type: string;
  first_name: string;
  last_name: string;
  email_address: string;
  company: string;
  job_title: string;
  country: string;
  whitepaper_consent: boolean;
  newsletter_consent: boolean;
  locale: string;
}

export function whitePaperFormApi({ axios }: userAPIProps) {
  return {
    async submitWhitePaperForm(formData: WhitePaperFormPayloadType): Promise<ApiResponse<any>> {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_STRAPI_API_URL}/white-paper-requests`,
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
