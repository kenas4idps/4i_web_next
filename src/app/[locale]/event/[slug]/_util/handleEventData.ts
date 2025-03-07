import { PageDetailBE, SeoBE } from '@/api/models/shared';

interface EventDataBE {
  seo: SeoBE;
  detail: PageDetailBE;
  date_end: Date;
  date_start: Date;
  location: string;
  form_id: string;
  image_list: {
    data: {
      attributes: {
        url: string;
        caption: string;
        alternativeText: string;
      };
    }[];
  };
  event_types: {
    data: {
      attributes: {
        name: string;
      };
    }[];
  };
  locale: string;
  localizations: {
    data: {
      id: number;
      attributes: {
        locale: string;
      };
    }[];
  };
}

export const handleEventData = (eventData: EventDataBE) => {
  return {
    dateEnd: eventData?.date_end,
    dateStart: eventData?.date_start,
    location: eventData?.location,
    formId: eventData?.form_id,
    imageList: eventData?.image_list?.data?.map(image => {
      return {
        url: `${process.env.REACT_APP_STRAPI_URL}${image?.attributes?.url}`,
        caption: image?.attributes?.caption,
        alternativeText: image?.attributes?.alternativeText,
      };
    }),
    eventTypeList: eventData?.event_types?.data?.map(element => element?.attributes?.name),
    locale: eventData?.locale,
    localizations: eventData?.localizations?.data,
  };
};
