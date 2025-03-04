import { ReactNode } from 'react';

import PageWrapper from 'components/common/pageWrapper';

import BubblesBg from 'assets/img/bubbles2.png';

import './SimpleText.scss';

interface Props {
  children: ReactNode;
  withBubbles?: boolean;
}

const SimpleText = ({ children, withBubbles = false }: Props) => {
  return (
    <div className={`simple-text ${withBubbles ? 'with-bubbles' : ''}`}>
      <PageWrapper
        className="simple-text-container"
        style={withBubbles ? { backgroundImage: `url(${BubblesBg})` } : {}}
      >
        <div className="simple-text-content">{children}</div>
      </PageWrapper>
    </div>
  );
};

export default SimpleText;
