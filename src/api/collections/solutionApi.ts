import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function solutionApi({ axios }: userAPIProps) {
  return {
    async getSolutionsListData(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/solutions?locale=${locale}&populate=detail.banner_image,white_paper_detail&sort=rank`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getSolutionData(
      locale: string,
      filter?: string,
      targetPopulateSection?: string,
    ): Promise<ApiResponse<any>> {
      try {
        const defaultPopulateSection =
          'detail.banner_image,white_paper_detail,development_services.services.icon.icon,development_process.steps,tools.logo.logo,selected_case_studies.case_studies.banner_image,approach.steps,reasons_to_choose_us.list_of_reasons,security_and_reliability';
        const response = await axios.get(
          `${
            process.env.REACT_APP_STRAPI_API_URL
          }/solutions?locale=${locale}&populate=seo.metaImage,seo.metaSocial.image,${
            targetPopulateSection || defaultPopulateSection
          }&filters[urlPath]=/${filter}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
