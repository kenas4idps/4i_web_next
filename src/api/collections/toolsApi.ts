import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function toolsApi({ axios }: userAPIProps) {
  return {
    async getToolListData(pageNum = 0): Promise<ApiResponse<any>> {
      try {
        const params = `&pagination[start]=${pageNum * 7}&pagination[limit]=7`;
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/tools?populate=logo.logo&filters[logo][id][$gte]=1${params}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
