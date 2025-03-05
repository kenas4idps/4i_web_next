'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { NotificationContext } from '@/providers/notificationProvider';

import { PageDetailBE, SolutionsListFE } from '@/api/models/shared';
import { api } from '@/api';
import { useLocale } from 'next-intl';
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

/**
 * This function is DEPRECATED
 * @param param0
 * @returns
 */
const SolutionsListProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { displayNotification } = useContext(NotificationContext);
  const locale = useLocale();

  const [fetched, setFetched] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [solutionsList, setSolutionsList] = useState<SolutionsListFE[]>();

  const getSolutionsList = async () => {
    if (!fetched || language !== locale) {
      try {
        const response = await api.solution.collection.getSolutionsListData(locale);
        if ('content' in response) {
          const solutionsListData: SolutionsListDataBE[] = response.content.data;

          const solutionsList: SolutionsListFE[] = handleSolutionsListData(solutionsListData);

          if (solutionsList) setSolutionsList(solutionsList);

          setFetched(true);
          setLanguage(locale);
        }
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
