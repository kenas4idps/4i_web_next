import { api } from '@/api';
import { PageDetailBE, SolutionsListFE } from '@/api/models/shared';

interface SolutionsListDataBE {
  id: number;
  attributes: {
    urlPath: string;
    introduction_text: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    label: string;
    detail: PageDetailBE;
    white_paper_detail: {
      id: number;
      title: string;
      subtitle: string;
      description: string;
    };
  };
}

const handleSolutionsListData = (solutionsListData: SolutionsListDataBE[]) => {
  const solutionsList: SolutionsListFE[] = solutionsListData?.map(solution => {
    return {
      label: solution?.attributes?.label,
      title: solution?.attributes?.white_paper_detail?.title,
      description: solution?.attributes?.detail?.description,
      url: '/solution' + solution?.attributes?.urlPath,
      bannerImage: {
        alternativeText:
          solution?.attributes?.detail?.banner_image?.data?.attributes?.alternativeText,
        caption: solution?.attributes?.detail?.banner_image?.data?.attributes?.caption,
        url: `${process.env.REACT_APP_STRAPI_URL}${solution?.attributes?.detail?.banner_image?.data?.attributes?.url}`,
      },
    };
  });

  return solutionsList;
};

export async function getSolutionsList(locale: string) {
  try {
    const response = await api.solution.collection.getSolutionsListData(locale);
    if ('content' in response) {
      const solutionsListData: SolutionsListDataBE[] = response.content.data;

      const solutionsList: SolutionsListFE[] = handleSolutionsListData(solutionsListData);

      return solutionsList;
    }

    return undefined;
  } catch (error) {
    console.error(error);

    return undefined;
  }
}
