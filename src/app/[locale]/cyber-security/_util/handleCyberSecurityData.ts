export const handleExtraData = (extraData: any) => {
  return {
    introduction: {
      title: extraData?.introduction?.title,
      description: extraData?.introduction?.description,
    },
    mainPoints: extraData?.main_points?.map((point: any) => {
      return {
        title: point?.label,
        description: point?.description,
      };
    }),
    approach: {
      tag: extraData?.approach?.main_text?.tag,
      title: extraData?.approach?.main_text.title,
      descriotion: extraData?.approach?.main_text.description,
      image: `${process.env.REACT_APP_STRAPI_URL}${extraData?.approach?.image?.data?.attributes?.url}`,
      imageCaption: extraData?.approach?.image_caption,
      accordianList: extraData?.approach?.accordians.map((accordian: any) => {
        return {
          title: accordian?.label,
          description: accordian?.description,
        };
      }),
    },
    expertise: {
      tag: extraData?.expertise?.tag,
      title: extraData?.expertise?.title,
      description: extraData?.expertise?.description,
    },
  };
};
