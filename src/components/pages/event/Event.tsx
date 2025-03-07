'use client';

import { useRef } from 'react';

import { ImageFE } from '@/api/models/shared';

import EventBanner from './components/eventBanner';
import EventDetails from './components/eventDetails';
import EventRegister from './components/eventRegister';
import DetailDataHandler from '@/utils/DetailDataHandler';

interface EventDataFE {
  dateEnd: Date;
  dateStart: Date;
  location: string;
  formId: string;
  imageList: ImageFE[];
  eventTypeList: string[];
  locale: string;
  localizations: {
    attributes: {
      locale: string;
    };
    id: number;
  }[];
}

const Event = ({
  slug,
  eventDetail,
  pageDetail,
}: {
  slug: string;
  eventDetail: EventDataFE;
  pageDetail: ReturnType<ReturnType<typeof DetailDataHandler>['handleDetailData']>;
}) => {
  const registerRef = useRef<HTMLDivElement | null>(null);

  const registerClickHandler = () => {
    if (registerRef.current) {
      const offsetTop = registerRef.current.offsetTop;
      const navHeight = document.getElementsByClassName('main-nav ')[0].clientHeight;
      const scrollTo = offsetTop - navHeight;
      window.scrollBy({ top: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      {pageDetail && eventDetail && (
        <>
          <EventBanner
            id={slug ? slug : ''}
            picture={pageDetail?.bannerImage?.url}
            title={pageDetail?.title}
            categoryList={eventDetail?.eventTypeList}
            startDate={eventDetail?.dateStart}
            endDate={eventDetail?.dateEnd}
            place={eventDetail?.location}
            onClickRegister={registerClickHandler}
          />

          <EventDetails
            description={pageDetail?.description}
            pictureList={eventDetail?.imageList?.map(image => image?.url)}
          />

          <div className="event-register-ref" ref={registerRef}>
            <EventRegister formId={eventDetail?.formId} />
          </div>
        </>
      )}
    </>
  );
};

export default Event;
