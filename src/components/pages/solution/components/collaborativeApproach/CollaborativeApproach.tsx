import { ApproachFE } from '@/api/models/shared';

import PageWrapper from '@/components/common/pageWrapper';

const BubblesImg = '/assets/img/bubbles3.png';

import './CollaborativeApproach.scss';

const CollaborativeApproach = ({ title, description, stepsList }: ApproachFE) => {
  return (
    <>
      {stepsList && stepsList?.length > 0 && (
        <div className="collaborative-approach" style={{ backgroundImage: `url(${BubblesImg})` }}>
          <PageWrapper className="collaborative-approach-container">
            <div className="introduction">
              <div className="title">{title}</div>

              <div className="description">{description}</div>
            </div>

            <div className="content">
              {stepsList?.map(step => {
                return (
                  <div className="step" key={step.key}>
                    <div className="step-number">{step.key}</div>

                    <div className="title">{step.title}</div>

                    <div className="description">{step.description}</div>
                  </div>
                );
              })}
            </div>
          </PageWrapper>
        </div>
      )}
    </>
  );
};

export default CollaborativeApproach;
