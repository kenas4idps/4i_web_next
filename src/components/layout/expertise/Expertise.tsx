import { useRouter } from 'next/navigation';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

const Img = 'assets/img/teamAndExpertise.jpg';

import './Expertise.scss';
import Image from 'next/image';

interface Props {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
}

const Expertise = ({ tag, title, description, buttonText }: Props) => {
  const router = useRouter();

  return (
    <div className="expertise">
      <PageWrapper className="expertise-container">
        <div className="content-container">
          <div className="tag">{tag}</div>

          <div className="title">{title}</div>

          <div className="description">{description}</div>

          <CustomButton
            onClick={() => {
              router.push('/about-us');
            }}
          >
            {buttonText}
          </CustomButton>
        </div>
      </PageWrapper>

      <div className="picture-container">
        <Image layout="fill" src={Img} alt="code on computer screen" />
      </div>
    </div>
  );
};

export default Expertise;
