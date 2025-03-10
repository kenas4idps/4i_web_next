'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Moment from 'react-moment';

import { NotificationContext } from '@/providers/notificationProvider';

import { Image, PageDetailBE, SeoBE } from '@/api/models/shared';
import { EventBannerType } from '../../Sharedtype';
import { DoubleCircleOverlayStyles } from '@/components/common/doubleCircleOverlay/SharedTypes';

import CarouselCmp from '@/components/common/carouselCmp';
import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';
import { BlurCircleStyles } from '@/components/common/blurCircle/SharedTypes';

import './EventsIncoming.scss';
import { useLocale, useTranslations } from 'next-intl';
import { api } from '@/api';

interface EventTypeBE {
  id: number;
  attributes: {
    url_path: string;
    date_start: Date;
    date_end: Date;
    description: string;
    hubspot_form_link: string;
    location: string;
    title: string;
    detail: PageDetailBE;
    seo: SeoBE;
    image_list: Image[];
    event_type: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
  };
}

const handleEventListData = (eventListData: EventTypeBE[]) => {
  return eventListData?.map(event => {
    return {
      id: event?.attributes?.url_path,
      dateStart: event?.attributes?.date_start,
      dateEnd: event?.attributes?.date_end,
      title: event?.attributes?.detail?.title,
      description: event?.attributes?.detail?.description,
      category: event?.attributes?.event_type?.data?.attributes?.name,
      location: event?.attributes?.location,
      bannerImage: {
        url: `${process.env.REACT_APP_STRAPI_URL}${event?.attributes?.detail?.banner_image?.data?.attributes?.url}`,
        caption: event?.attributes?.detail?.banner_image?.data?.attributes?.caption,
        alternativeText: event?.attributes?.detail?.banner_image?.data?.attributes?.alternativeText,
      },
    };
  });
};

const EventsIncoming = () => {
  const router = useRouter();
  const t = useTranslations('events');
  const locale = useLocale();
  const { displayNotification } = useContext(NotificationContext);

  const [eventsList, setEventsList] = useState<EventBannerType[]>();

  const goToItem = (id: string) => {
    router.push(`/event/${id}`);
  };

  const getEvent = async () => {
    try {
      const eventListData = await api.event.collection.getEventListData(locale, 'incoming');
      if ('content' in eventListData) {
        const eventList = handleEventListData(eventListData.content.data);

        if (eventList) {
          setEventsList(eventList);
        }
      }
    } catch (error) {
      console.error(`[Error - API] Error handling Event data`, error);
      displayNotification(`Something Went Wrong Getting Event Data, Please Try Again !`, 'error');
    }
  };

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line
  }, [locale]);

  const getJsonItem = (item: EventBannerType) => {
    return {
      id: item?.id,
      title: item?.title,
      description: item?.description,
      bannerImage: {
        url: item?.bannerImage?.url,
      },
      otherInformation: (
        <div className="event-info">
          <div className="event-date">
            <Moment date={item?.dateStart} format="MMM DD" />
          </div>

          <div className="event-time">
            <Moment date={item?.dateStart} format="hh:mm A" />
            {' - '}
            <Moment date={item?.dateEnd} format="hh:mm A" />
          </div>

          <div className="event-place">{`${t('at')} ${item.location}`}</div>
        </div>
      ),
    };
  };

  return (
    <div className="events-incoming">
      <DoubleCircleOverlay
        className="double-circle-container"
        style={DoubleCircleOverlayStyles.GREY}
        size="1618px"
      />

      <BlurCircle size="1147px" className="blur-circle-container" style={BlurCircleStyles.GREY} />

      <div className="content-container">
        {eventsList && eventsList?.length > 100 ? (
          <CarouselCmp
            title={t('incomingEventsTitle')}
            isDarkBg={true}
            onClickFunc={goToItem}
            listItem={eventsList?.map(item => {
              return getJsonItem(item);
            })}
            isBig={true}
          />
        ) : (
          <PageWrapper className="coming-soon-container">
            <div className="events-incoming-title">{t('incomingEventsTitle')}</div>

            <div className="content-container">
              <div className="title">{t('comingSoonTitle')}</div>

              <div className="description">
                {t('comingSoonDescription.beforeLink')}

                <a target="_blank" href={t('googleFormLink') as string} rel="noreferrer">
                  {t('comingSoonDescription.link')}
                </a>
                {t('comingSoonDescription.afterLink')}
              </div>
            </div>
          </PageWrapper>
        )}
      </div>
    </div>
  );
};

export default EventsIncoming;
