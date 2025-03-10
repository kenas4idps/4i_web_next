import PageWrapper from '@/components/common/pageWrapper';

const SecurityImg1 = '/assets/img/security1.png';
const SecurityImg2 = '/assets/img/security2.png';

import BlurCircle from '@/components/common/blurCircle';

import './Security.scss';

interface Props {
  title: string;
  description: string;
}

const Security = ({ title, description }: Props) => {
  return (
    <PageWrapper className="security">
      <BlurCircle className="blur-circle-container" size="914px" />

      <div className="security-container">
        <div className="informations">
          <div className="informations-container">
            <div className="title">{title}</div>

            <div className="content">{description}</div>
          </div>
        </div>

        <div className="pictures">
          <div className="left-column">
            <img className="big-img image" src={SecurityImg1} alt="laptop with code" />
          </div>

          <div className="right-column">
            <img className="medium-img image" src={SecurityImg2} alt="biotic eye" />

            <div className="small-img-container">
              <div className="dummy"></div>

              <div className="small-img image"></div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Security;
