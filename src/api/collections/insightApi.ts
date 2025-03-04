import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function insightApi({ axios }: userAPIProps) {
  return {
    async getInsightData(id: string, locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/insights?populate=seo.metaImage,seo.metaSocial.image,image,insight_types,elements.image_one,elements.image_two,elements.image,localizations&locale=${locale}&filters[url_path]=${id}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getInsightsListData(
      pageNum: number = 0,
      typeList: string[] = [],
      isDesc: boolean = false,
      itemPerPage: number = 3,
      locale: string,
      notInclude?: string,
    ): Promise<ApiResponse<any>> {
      try {
        let params = '';
        if (isDesc) {
          params = `&sort=published:desc&pagination[limit]=${itemPerPage}`;
        } else {
          params = `&sort=published:asc&pagination[start]=${
            pageNum * itemPerPage
          }&pagination[limit]=${itemPerPage}`;
        }
        if (typeList.length > 0) {
          typeList.forEach(type => {
            if (type !== 'All') {
              params = `&filters[insight_types][type]=${type}${params}`;
            }
          });
        }
        if (notInclude && notInclude !== '') {
          params = `&filters[url_path][$ne]=${notInclude}${params}`;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/insights?locale=${locale}&populate=insight_types,elements${params}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getInsightsTypeData(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/insight-types?locale=${locale}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
