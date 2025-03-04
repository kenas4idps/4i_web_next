import PageWrapper from 'components/common/pageWrapper';
import DoubleCircleOverlay from 'components/common/doubleCircleOverlay';
import BlurCircle from 'components/common/blurCircle';

import Img1 from 'assets/img/projectManagement1.png';
import Img2 from 'assets/img/projectManagement2.png';

import './MainPoints.scss';

interface Props {
  pointList?: {
    title: string;
    description: string;
  }[];
}

const MainPoints = ({ pointList }: Props) => {
  return (
    <>
      {pointList && pointList.length > 0 && (
        <PageWrapper className="main-points">
          <DoubleCircleOverlay size="1541px" className="double-circle-container" />

          <BlurCircle size="922px" className="blur-circle-container" />

          <div className="left-column">
            <div className="img-container">
              <img src={Img1} alt="computer on a office desk with code on it" />
            </div>

            <div className="img-container">
              <img src={Img2} alt="bionic eyes" />
            </div>
          </div>

          <div className="right-column">
            {pointList.map((point, index) => (
              <div key={index} className="main-point">
                <div className="title">{point.title}</div>

                <div className="description">{point.description}</div>
              </div>
            ))}
          </div>
        </PageWrapper>
      )}
    </>
  );
};

export default MainPoints;
