import PageWrapper from '@/components/common/pageWrapper';

import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';

import { DevelopmentStepTypeFE } from '@/api/models/shared';

import './HistoricListCmp.scss';

interface Props {
  tag: string;
  title: string;
  description: string;
  list?: DevelopmentStepTypeFE[];
}

const HistoricListCmp = ({ tag, title, description, list }: Props) => {
  return (
    <div className="historic-list">
      <DoubleCircleOverlay size="1540px" className="double-circle-container" />

      <PageWrapper className="historic-list-container">
        <div className="left-column">
          <div className="left-column-container">
            <div className="tag">{tag}</div>

            <div className="title">{title}</div>

            <div className="description">{description}</div>
          </div>
        </div>

        <div className="right-column">
          <div className="right-column-container">
            {list?.map((historic, key) => {
              return (
                <div className="historic" key={key}>
                  <div className="historic-container">
                    <div className="tag-container">
                      <div className="tag">{historic?.tag}</div>
                    </div>

                    <div className="content">
                      <div className="content-container">
                        <div className="title">{historic?.title}</div>

                        <div className="description">{historic?.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default HistoricListCmp;
