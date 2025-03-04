import axios from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';
import { CommonPageDataType } from '../models/CommonPage';

interface userAPIProps {
  axios: typeof axios;
}

export function CommonPageApi({ axios }: userAPIProps) {
  return {
    async getPageData({
      pageName,
      locale,
    }: {
      pageName: string;
      locale: string;
    }): Promise<ApiResponse<CommonPageDataType>> {
      let params = '';

      switch (pageName) {
        case 'insights-page':
          params =
            'selected_insights.insights.image,selected_insights.insights.elements,selected_insights.insights.insight_types';
          break;
        case 'clients-page':
          params = 'selected_case_studies.case_studies.banner_image';
          break;
        case 'project-management-page':
          params = 'tools.Logo';
          break;
        case 'cyber-security-page':
          params =
            'introduction,main_points,approach.main_text,approach.image,approach.accordians,expertise';
          break;
        default:
          break;
      }

      try {
        const response = await axios
          .get(
            process.env.REACT_APP_STRAPI_API_URL +
              `/${pageName}?locale=${locale}&populate=seo.metaImage,seo.metaSocial.image,detail.banner_image,${params}`,
          )
          .then(response => {
            return response?.data?.data?.attributes;
          });

        return new SuccessfulApiResponse(response, (data: any) => new CommonPageDataType(data));
      } catch (error) {
        // displayNotification(
        //   `Something Went Wrong Fetching ${pageName} Data, Please Try Again !`,
        //   'error',
        // );
        // console.error(`[Error - API] Error calling ${pageName} data`, error);
        return new FailedApiResponse(error);
      }
    },
  };
}

export default CommonPageApi;
