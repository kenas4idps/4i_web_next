import { CaseStudyBannerFE, CaseStudyBE } from '@/api/models/shared';
import { CaseStudiesType } from '@/api/models/CaseStudies';

const CaseStudiesDataHandler = () => {
  const handleCaseStudiesData = (caseStudiesData: CaseStudyBE[] | CaseStudiesType[]) => {
    const caseStudiesList: CaseStudyBannerFE[] = caseStudiesData?.map(caseStudy => {
      const caseStudyTypes = caseStudy?.attributes?.case_study_types?.data?.map(
        type => type?.attributes?.name,
      );

      return {
        id: caseStudy?.attributes?.url_path,
        title: caseStudy?.attributes?.title,
        description: caseStudy?.attributes?.description,
        tags: caseStudyTypes,
        bannerImage: {
          url: `${process.env.REACT_APP_STRAPI_URL}${caseStudy?.attributes?.banner_image?.data?.attributes?.url}`,
          caption: caseStudy?.attributes?.banner_image?.data?.attributes?.caption,
          alternativeText: caseStudy?.attributes?.banner_image?.data?.attributes?.alternativeText,
        },
      };
    });
    return caseStudiesList;
  };

  return {
    handleCaseStudiesData: handleCaseStudiesData,
  };
};

export default CaseStudiesDataHandler;
