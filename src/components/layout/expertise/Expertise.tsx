import { useNavigate } from 'react-router-dom';

import PageWrapper from 'components/common/pageWrapper';
import CustomButton from 'components/common/customButton';

import Img from 'assets/img/teamAndExpertise.jpg';

import './Expertise.scss';

interface Props {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
}

const Expertise = ({ tag, title, description, buttonText }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="expertise">
      <PageWrapper className="expertise-container">
        <div className="content-container">
          <div className="tag">{tag}</div>

          <div className="title">{title}</div>

          <div className="description">{description}</div>

          <CustomButton
            onClickBtn={() => {
              navigate('/about-us');
            }}
          >
            {buttonText}
          </CustomButton>
        </div>
      </PageWrapper>

      <div className="picture-container">
        <img src={Img} alt="code on computer screen" />
      </div>
    </div>
  );
};

export default Expertise;
