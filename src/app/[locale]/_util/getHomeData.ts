import { api } from '@/api';
import { Image, SeoBE, SeoFE, Video } from '@/api/models/shared';
import { AwardFE } from '@/components/pages/homepage/components/allAwards/SharedType';
import SeoDataHandler from '@/utils/SeoDataHandler';

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

export interface HomePageDataBE {
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
        width: award?.logo?.data?.attributes?.width,
        height: award?.logo?.data?.attributes?.height,
      },
      name: award?.name,
      link: award?.link,
    };
  });

  return awards;
};

export async function getHomeData(locale: string) {
  const seoDataHandler = SeoDataHandler();

  const response = await api.homePage.collection.getHomeData(locale);
  if ('content' in response) {
    const homePageData: HomePageDataBE = response.content.data.attributes;

    const seo: SeoFE = seoDataHandler.handleSeoData(homePageData?.seo);
    const awards: AwardFE[] = handleAwardsData(homePageData?.awards);
    const detail: HomePageDetailFE = handleDetailsData(homePageData?.detail);

    console.log({ awards, data: homePageData.awards });
    return {
      homePageData,
      seo,
      awards,
      detail,
    };
  }

  return {};
}
