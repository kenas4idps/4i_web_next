import PageWrapper from '@/components/common/pageWrapper';
import ShareCmp from '@/components/common/shareCmp';

import './InsightBanner.scss';

interface Props {
  typesList?: string[];
  date?: string;
  title?: string;
  picture?: string;
}

const InsightBanner = ({ typesList, date, title, picture }: Props) => {
  return (
    <PageWrapper className="insight-banner">
      <div className="tag">
        <span className="type-list">
          {typesList?.map((value, key) => {
            return (
              <span key={key} className="type">
                {value}
              </span>
            );
          })}
        </span>

        <span className="date">{date}</span>
      </div>

      <h1 className="title">{title}</h1>

      {picture && (
        <div className="banner-container">
          <div className="share-container">
            <ShareCmp url={`${window.location.href}`} isVertical={true} />
          </div>

          <div className="picture" style={{ backgroundImage: `url(${picture})` }}></div>
        </div>
      )}
    </PageWrapper>
  );
};

export default InsightBanner;
