import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContext } from '@/providers/notificationProvider';

import { PageDetailBE, SolutionsListFE } from '@/api/models/shared';

import SolutionApi from 'api/SolutionApi';

interface ApiProviderProps {
  children: ReactNode;
}

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

interface SolutionsListContextType {
  getSolutionsList: () => void;
  solutionsList?: SolutionsListFE[];
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

const SolutionsListContext = createContext<SolutionsListContextType>({
  getSolutionsList: async () => ({}),
  solutionsList: [
    {
      title: '',
      description: '',
      url: '',
      label: '',
      bannerImage: {
        alternativeText: '',
        caption: '',
        url: '',
      },
    },
  ],
});
const SolutionsListProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { displayNotification } = useContext(NotificationContext);
  const { i18n } = useTranslation();

  const [fetched, setFetched] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [solutionsList, setSolutionsList] = useState<SolutionsListFE[]>();

  const solutionApi = SolutionApi();

  const getSolutionsList = async () => {
    if (!fetched || language !== i18n.language) {
      try {
        const solutionsListData: SolutionsListDataBE[] = await solutionApi.getSolutionsListData(
          i18n.language,
        );

        const solutionsList: SolutionsListFE[] = handleSolutionsListData(solutionsListData);

        solutionsList && setSolutionsList(solutionsList);

        setFetched(true);
        setLanguage(i18n.language);
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling Solution List, Please Try Again !',
          'error',
        );
      }
    }
  };

  return (
    <SolutionsListContext.Provider value={{ getSolutionsList, solutionsList }}>
      {children}
    </SolutionsListContext.Provider>
  );
};

export { SolutionsListContext, SolutionsListProvider };
