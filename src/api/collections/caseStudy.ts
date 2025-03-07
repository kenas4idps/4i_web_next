import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';

interface userAPIProps {
  axios: AxiosInstance;
}

export function caseStudyApi({ axios }: userAPIProps) {
  return {
    async getCaseStudyData({
      id,
      locale,
    }: {
      id: string;
      locale: string;
    }): Promise<ApiResponse<any>> {
      try {
        const response = await axios
          .get(
            process.env.REACT_APP_STRAPI_API_URL +
              `/case-studies?populate=seo.metaImage,seo.metaSocial.image,banner_image,case_study_types,client.client_industries,tools,images,localizations&locale=${locale}&filters[url_path]=${id}`,
          )
          .then(response => {
            return response?.data?.data[0]?.attributes;
          });
        // .catch(error => {
        //   displayNotification(
        //     `Something Went Wrong Fetching Case Study Data, Please Try Again !`,
        //     'error',
        //   );
        //   console.error(`[Error - API] Error calling Case Study data`, error);
        // });

        return new SuccessfulApiResponse(response);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
