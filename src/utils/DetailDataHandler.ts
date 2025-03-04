import { PageDetailBE } from '@/api/models/shared';

const DetailDataHandler = () => {
  const handleDetailData = (detailData: PageDetailBE) => {
    return {
      title: detailData?.title,
      description: detailData?.description,
      bannerImage: {
        url: `${process.env.REACT_APP_STRAPI_URL}${detailData?.banner_image?.data?.attributes?.url}`,
        caption: detailData?.banner_image?.data?.attributes?.caption,
        alternativeText: detailData?.banner_image?.data?.attributes?.alternativeText,
      },
    };
  };

  return {
    handleDetailData: handleDetailData,
  };
};

export default DetailDataHandler;
