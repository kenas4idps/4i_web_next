import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';

const BannerImg = '/assets/img/noEventBanner.png';
const BigImg = '/assets/img/noEvent1.png';
const MediumImg = '/assets/img/noEvent2.png';
const SmallImg = '/assets/img/noEvent3.png';

import './EventsNoEventBanner.scss';

const EventsNoEventBanner = () => {
  const t = useTranslations('events');

  return (
    <div className="events-no-event" style={{ backgroundImage: `url(${BannerImg})` }}>
      <PageWrapper className="events-no-event-super-container">
        <div className="events-no-event-container">
          <div className="content-container">
            <div className="introduction">
              <div className="tag">{t('noEventTag')}</div>

              <h1 className="title">{t('noEventTitle')}</h1>

              <div className="description">{t('noEventDescription')}</div>
            </div>

            <div className="pictures-container">
              <div className="left-column">
                <img src={BigImg} alt="hand and concert" className="big-picture" />
              </div>

              <div className="right-column">
                <img src={SmallImg} alt="empty seats" className="small-picture" />

                <img src={MediumImg} alt="mic" className="medium-picture" />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default EventsNoEventBanner;
