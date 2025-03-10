import EventsContainer from './components/eventsContainer';
import EventsIncoming from './components/eventsIncoming';

const Events = () => {
  return (
    <EventsContainer>
      <EventsIncoming />

      {/* <EventsList list={eventsList} currentPage={currentPage}/> */}
    </EventsContainer>
  );

  // :
  // 	<EventsNoEventBanner />
};

export default Events;
