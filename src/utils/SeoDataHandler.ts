import { SeoBE } from '@/api/models/shared';

const SeoDataHandler = () => {
  const handleSeoData = (seoData: SeoBE) => {
    const facebookBE = seoData?.metaSocial?.find(social => social?.socialNetwork === 'Facebook');
    const twitterBE = seoData?.metaSocial?.find(social => social?.socialNetwork === 'Twitter');
    console.log(seoData?.metaImage?.data?.attributes?.url);
    return {
      canonicalURL: seoData?.canonicalURL,
      keywords: seoData?.keywords,
      metaDescription: seoData?.metaDescription,
      metaImage: {
        url: process.env.REACT_APP_STRAPI_URL + seoData?.metaImage?.data?.attributes?.url,
        caption: seoData?.metaImage?.data?.attributes?.caption,
        alternativeText: seoData?.metaImage?.data?.attributes?.alternativeText,
      },
      metaRobots: seoData?.metaRobots,
      metaTitle: seoData?.metaTitle,
      metaViewport: seoData?.metaViewport,
      structuredData: seoData?.structuredData,
      metaSocial: {
        fb: {
          socialNetwork: facebookBE?.socialNetwork,
          title: facebookBE?.title,
          description: facebookBE?.description,
          image: {
            alternativeText: facebookBE?.image?.data?.attributes?.alternativeText,
            caption: facebookBE?.image?.data?.attributes?.caption,
            url: facebookBE?.image?.data?.attributes?.url
              ? process.env.REACT_APP_STRAPI_URL + facebookBE?.image?.data?.attributes?.url
              : undefined,
          },
        },
        twitter: {
          socialNetwork: twitterBE?.socialNetwork,
          title: twitterBE?.title,
          description: twitterBE?.description,
          image: {
            alternativeText: twitterBE?.image?.data?.attributes?.alternativeText,
            caption: twitterBE?.image?.data?.attributes?.caption,
            url: twitterBE?.image?.data?.attributes?.url
              ? process.env.REACT_APP_STRAPI_URL + twitterBE?.image?.data?.attributes?.url
              : undefined,
          },
        },
      },
    };
  };

  return {
    handleSeoData: handleSeoData,
  };
};

export default SeoDataHandler;
