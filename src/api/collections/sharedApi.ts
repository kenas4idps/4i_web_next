import { AxiosInstance } from 'axios';
import { ApiResponse, FailedApiResponse, SuccessfulApiResponse } from '../models';
import { ClientIndustryTypeBE } from '../models/ClientIndustry';

interface userAPIProps {
  axios: AxiosInstance;
}

export function sharedApi({ axios }: userAPIProps) {
  return {
    async getNumbers(): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(`${process.env.REACT_APP_STRAPI_API_URL}/by-the-number`);
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getClients(filter: string, pageNum: number, locale: string): Promise<ApiResponse<any>> {
      try {
        let params = '&pagination[limit]=8';
        if (filter === 'NoPagination') {
          params = '';
        } else if (filter === 'All') {
          params = `&pagination[start]=${pageNum * 8}${params}`;
        } else {
          params = `&filters[client_industries][name]=${filter}&pagination[start]=${
            pageNum * 8
          }${params}`;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/clients?locale=${locale}&populate=*${params}`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getWrittenTestimonial(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/client-testimonials?locale=${locale}&populate=testimonial.client_image&filters[type]=written`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getVideoTestimonial(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/client-testimonials?locale=${locale}&populate=testimonial.video,testimonial.thumbnail&filters[type]=video`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getCaseStudiesData(
      locale: string,
      typeFilterList?: string[],
      industryFilter?: string,
      pageNum = 0,
      notInclude?: string,
    ): Promise<ApiResponse<any>> {
      try {
        let params = `&pagination[start]=${pageNum * 6}`;
        if (typeFilterList && typeFilterList.length > 0) {
          typeFilterList.forEach(typeFilter => {
            if (typeFilter !== '' && typeFilter !== 'All' && typeFilter !== undefined) {
              params = `&filters[case_study_types][name]=${typeFilter}${params}`;
            }
          });
        }
        if (industryFilter !== '' && industryFilter !== 'All' && industryFilter !== undefined) {
          params = `&filters[client][client_industries][name]=${industryFilter}${params}`;
        }
        if (notInclude && notInclude !== '') {
          params = `&filters[url_path][$ne]=${notInclude}${params}`;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/case-studies?locale=${locale}&populate=banner_image,case_study_types,images,client.client_industries,localizations,${params}&pagination[limit]=6`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getCaseStudyTypesData(locale: string): Promise<ApiResponse<any>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/case-study-types?locale=${locale}&sort=name`,
        );
        return new SuccessfulApiResponse(response.data);
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },

    async getClientIndustries(locale: string): Promise<ApiResponse<ClientIndustryTypeBE[]>> {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_API_URL}/industries?locale=${locale}&populate=*&pagination[limit]=-1&sort=name`,
        );
        return new SuccessfulApiResponse(response.data.data, (data: any[]) =>
          data.map(item => new ClientIndustryTypeBE(item)),
        );
      } catch (error) {
        return new FailedApiResponse(error);
      }
    },
  };
}
