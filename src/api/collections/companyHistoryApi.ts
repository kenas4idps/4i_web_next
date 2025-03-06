import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';
import { CompanyHistoryApi } from '@/api/models/CompanyHistory';

interface userAPIProps {
  axios: AxiosInstance;
}

export function companyHistoryApi({ axios }: userAPIProps) {
  return {
    async getCompanyMileStonesData(locale: string): Promise<ApiResponse<CompanyHistoryApi>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/company-histories?locale=${locale}&sort=rank`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
