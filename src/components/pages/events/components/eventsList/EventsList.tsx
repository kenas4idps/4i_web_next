import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';

import PageWrapper from 'components/common/pageWrapper';
import CustomButton from 'components/common/customButton';
import DoubleCircleOverlay from 'components/common/doubleCircleOverlay';
import BlurCircle from 'components/common/blurCircle';

import ShareIcon from '/assets/icons/shareWhite.svg';

import { EventBannerType } from '../../Sharedtype';

import { DoubleCircleOverlayStyles } from 'components/common/doubleCircleOverlay/SharedTypes';
import { BlurCircleStyles } from 'components/common/blurCircle/SharedTypes';

import './EventsList.scss';

interface Props {
  list: EventBannerType[];
}

const EventsList = ({ list }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('events');

  return (
    <PageWrapper className="events-list">
      <DoubleCircleOverlay
        className="double-circle-container"
        size="1618px"
        style={DoubleCircleOverlayStyles.GREY}
      />

      <BlurCircle size="1147px" style={BlurCircleStyles.GREY} className="blur-circle-container" />

      <div className="event-list-container">
        {list?.map((event, key) => {
          return (
            <div className="event-container" key={key}>
              <div
                className="picture"
                style={{ backgroundImage: `url(${event?.bannerImage?.url})` }}
              ></div>

              <div className="content-container">
                <div className="top-container">
                  <div className="category">{event?.category}</div>

                  <div className="date">
                    <Moment date={event?.dateStart} format="dd MMMM YYYY" />
                  </div>
                </div>

                <div className="title">{event?.title}</div>

                <div className="description">{event?.description}</div>

                <div className="bottom-container">
                  <div className="link" onClick={() => navigate('/events/' + event?.id)}>
                    {t('exploreLink')}
                  </div>

                  <div className="share" onClick={() => console.log('TODO')}>
                    <img src={ShareIcon} alt="share icon" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="load-more-btn-container">
        <CustomButton onClickBtn={() => console.log('TODO')}>{t('loadMoreBtn')}</CustomButton>
      </div>
    </PageWrapper>
  );
};

export default EventsList;
