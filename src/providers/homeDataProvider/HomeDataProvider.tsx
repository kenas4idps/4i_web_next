'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

import { NotificationContext } from '@/providers/notificationProvider';

import { Image, SeoBE, SeoFE, Video } from '@/api/models/shared';
import { AwardFE } from '@/components/pages/homepage/components/allAwards/SharedType';

import SeoDataHandler from '@/utils/SeoDataHandler';
import { useLocale } from 'next-intl';
import { api } from '@/api';

interface AwardBE {
  id: number;
  logo: Image;
  name: string;
  link?: string;
}

interface HomeDetailBE {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  banner_video: Video;
  banner_image: Image;
}

interface HomePageDataBE {
  seo: SeoBE;
  detail: HomeDetailBE;
  awards: AwardBE[];
}

export interface HomePageDetailFE {
  title: string;
  subtitle?: string;
  description?: string;
  bannerVideo: {
    alternativeText?: string;
    caption?: string;
    url: string;
    type: string;
  };
  bannerImage: {
    alternativeText?: string;
    caption?: string;
    url: string;
  };
}

interface ApiProviderProps {
  children: ReactNode;
}

interface HomeDataContextType {
  seo?: SeoFE;
  detail?: HomePageDetailFE;
  awards?: AwardFE[];
  init: () => void;
  fetched?: boolean;
  language?: string;
}

const handleDetailsData = (detailsData: HomeDetailBE) => {
  return {
    title: detailsData?.title,
    subtitle: detailsData?.subtitle,
    description: detailsData?.description,
    bannerVideo: {
      url: `${process.env.REACT_APP_STRAPI_URL}${detailsData?.banner_video?.data?.attributes?.url}`,
      caption: detailsData?.banner_video?.data?.attributes?.caption,
      alternativeText: detailsData?.banner_video?.data?.attributes?.alternativeText,
      type: detailsData?.banner_video?.data?.attributes?.mime,
    },
    bannerImage: {
      url: `${process.env.REACT_APP_STRAPI_URL}${detailsData?.banner_image?.data?.attributes?.url}`,
      caption: detailsData?.banner_image?.data?.attributes?.caption,
      alternativeText: detailsData?.banner_image?.data?.attributes?.alternativeText,
    },
  };
};

const handleAwardsData = (awardsData: AwardBE[]) => {
  const awards: AwardFE[] = awardsData?.map(award => {
    return {
      id: award?.id,
      logo: {
        url: `${process.env.REACT_APP_STRAPI_URL}${award?.logo?.data?.attributes?.url}`,
        caption: award?.logo?.data?.attributes?.caption,
        alternativeText: award?.logo?.data?.attributes?.alternativeText,
      },
      name: award?.name,
      link: award?.link,
    };
  });

  return awards;
};

const HomeDataContext = createContext<HomeDataContextType>({
  seo: {
    metaTitle: '',
    metaImage: {
      alternativeText: '',
      caption: '',
      url: '',
    },
    metaDescription: '',
    keywords: '',
    metaRobots: '',
    canonicalURL: '',
    metaViewport: '',
    structuredData: '',
    metaSocial: {
      fb: {
        socialNetwork: '',
        title: '',
        description: '',
        image: {
          alternativeText: '',
          caption: '',
          url: '',
        },
      },
      twitter: {
        socialNetwork: '',
        title: '',
        description: '',
        image: {
          alternativeText: '',
          caption: '',
          url: '',
        },
      },
    },
  },
  detail: {
    title: '',
    subtitle: '',
    description: '',
    bannerVideo: {
      alternativeText: '',
      caption: '',
      url: '',
      type: '',
    },
    bannerImage: {
      alternativeText: '',
      caption: '',
      url: '',
    },
  },
  awards: [],
  init: async () => ({}),
  fetched: false,
  language: '',
});

const HomeDataProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { displayNotification } = useContext(NotificationContext);
  const locale = useLocale();

  const [language, setLanguage] = useState<string>('');
  const [seo, setSeo] = useState<SeoFE>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [detail, setDetail] = useState<HomePageDetailFE>();
  const [awards, setAwards] = useState<AwardFE[]>();

  const seoDataHandler = SeoDataHandler();

  const init = async () => {
    if (!fetched || language !== locale) {
      try {
        const response = await api.homePage.collection.getHomeData(locale);

        console.log({ homeresponse: response });
        if ('content' in response) {
          const homePageData: HomePageDataBE = response.content.data.attributes;

          const seo: SeoFE = seoDataHandler.handleSeoData(homePageData?.seo);
          const awards: AwardFE[] = handleAwardsData(homePageData?.awards);
          const detail: HomePageDetailFE = handleDetailsData(homePageData?.detail);

          if (seo) setSeo(seo);
          if (awards) setAwards(awards);
          if (detail) setDetail(detail);

          setFetched(true);
          setLanguage(locale);
        }
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling Home Page Data, Please Try Again !',
          'error',
        );
      }
    }
  };

  return (
    <HomeDataContext.Provider
      value={{
        seo,
        detail,
        awards,
        init,
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export { HomeDataContext, HomeDataProvider };
