import { ReactNode } from 'react';

import './EventsContainer.scss';

interface Props {
  children: ReactNode;
}

const EventsContainer = ({ children }: Props) => {
  return <div className="events-container">{children}</div>;
};

export default EventsContainer;
