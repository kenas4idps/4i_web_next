import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContext } from '@/providers/notificationProvider';

import {
  VideoTestimonialFE,
  VideoTestimonialBE,
  WrittenTestimonialFE,
  WrittenTestimonialBE,
} from '@/components/layout/textTestimonies/sharedInterfaces';
import SharedApi from 'api/SharedApi';

interface ApiProviderProps {
  children: ReactNode;
}

interface TestimonialDataContextType {
  init: () => void;
  videoTestimonials?: VideoTestimonialFE[];
  writtenTestimonials?: WrittenTestimonialFE[];
}

const TestimonialContext = createContext<TestimonialDataContextType>({
  init: async () => ({}),
  videoTestimonials: [],
  writtenTestimonials: [],
});

const hanldeVideoTestimonialData = (videoTestimonialsData: VideoTestimonialBE[]) => {
  const listOfVideoTestimonials: VideoTestimonialFE[] = [];

  if (videoTestimonialsData) {
    videoTestimonialsData?.forEach(testimonial => {
      listOfVideoTestimonials.push({
        video: {
          alternativeText:
            testimonial?.attributes?.testimonial[0]?.video?.data?.attributes?.alternativeText,
          caption: testimonial?.attributes?.testimonial[0]?.video?.data?.attributes?.caption,
          url: `${process.env.REACT_APP_STRAPI_URL}${testimonial?.attributes?.testimonial[0]?.video?.data?.attributes?.url}`,
          thumbnail:
            testimonial?.attributes?.testimonial[0]?.thumbnail?.data &&
            `${process.env.REACT_APP_STRAPI_URL}${testimonial?.attributes?.testimonial[0]?.thumbnail?.data?.attributes?.url}`,
          type: testimonial?.attributes?.testimonial[0]?.video?.data?.attributes?.mime,
        },
        client_Name: testimonial?.attributes?.testimonial[0]?.client_name,
        client_Occupation: testimonial?.attributes?.testimonial[0]?.client_occupation,
        id: testimonial?.attributes?.testimonial[0]?.id,
      });
    });
  }

  return listOfVideoTestimonials;
};

const hanldeWrittenTestimonialData = (writtenTestimonialsData: WrittenTestimonialBE[]) => {
  const listOfWrittenTestimonials: WrittenTestimonialFE[] = [];

  if (writtenTestimonialsData) {
    writtenTestimonialsData?.forEach(testimonial => {
      listOfWrittenTestimonials.push({
        client_Image: {
          alternativeText:
            testimonial?.attributes?.testimonial[0]?.client_image?.data?.attributes
              ?.alternativeText,
          caption: testimonial?.attributes?.testimonial[0]?.client_image?.data?.attributes?.caption,
          url: `${process.env.REACT_APP_STRAPI_URL}${testimonial?.attributes?.testimonial[0]?.client_image?.data?.attributes?.url}`,
        },
        client_Name: testimonial?.attributes?.testimonial[0]?.client_name,
        client_Occupation: testimonial?.attributes?.testimonial[0]?.client_occupation,
        testimonial_Text: testimonial?.attributes?.testimonial[0]?.testimonial_text,
        id: testimonial?.attributes?.testimonial[0]?.id,
      });
    });
  }

  return listOfWrittenTestimonials;
};

const TestimonialProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const { displayNotification } = useContext(NotificationContext);

  const [fetched, setFetched] = useState<boolean>(false);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonialFE[]>();
  const [writtenTestimonials, setWrittenTestimonial] = useState<WrittenTestimonialFE[]>();

  const sharedAPI = SharedApi();

  const init = async () => {
    setFetched(false);
    if (!fetched) {
      try {
        const videoTestimonialsData: VideoTestimonialBE[] = await sharedAPI.getVideoTestimonial(
          i18n.language,
        );
        const writtenTestimonialsData: WrittenTestimonialBE[] =
          await sharedAPI.getWrittenTestimonial(i18n.language);

        const videoTestimonials: VideoTestimonialFE[] =
          hanldeVideoTestimonialData(videoTestimonialsData);

        const writtenTestimonials: WrittenTestimonialFE[] =
          hanldeWrittenTestimonialData(writtenTestimonialsData);

        videoTestimonials && setVideoTestimonials(videoTestimonials);
        writtenTestimonials && setWrittenTestimonial(writtenTestimonials);
        setFetched(true);
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling testimonial Data, Please Try Again !',
          'error',
        );
      }
    }
  };

  return (
    <TestimonialContext.Provider
      value={{
        videoTestimonials,
        writtenTestimonials,
        init,
      }}
    >
      {children}
    </TestimonialContext.Provider>
  );
};

export { TestimonialProvider, TestimonialContext };
