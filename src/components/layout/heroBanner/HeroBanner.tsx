import ReactMarkdown from 'react-markdown';

import { getColoredText } from 'utils/ColoredText';

import PageWrapper from 'components/common/pageWrapper';

import './HeroBanner.scss';

interface Props {
  picture: string | undefined;
  title: string | undefined;
  description: string | undefined;
}

const HeroBanner = ({ picture, title, description }: Props) => {
  return (
    <header
      className="hero-banner"
      style={{ backgroundImage: picture ? `url(${picture})` : 'unset' }}
    >
      <div className="bg-gradiant">
        <PageWrapper className="hero-super-container">
          <div className="hero-container">
            <div className="hero-content">
              {title && <h1 className="title">{getColoredText(title)}</h1>}

              {description && <ReactMarkdown className="">{description}</ReactMarkdown>}
            </div>
          </div>
        </PageWrapper>
      </div>
    </header>
  );
};

export default HeroBanner;
