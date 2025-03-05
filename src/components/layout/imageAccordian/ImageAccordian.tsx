import { useRouter } from 'next/navigation';
import Image from 'next/image';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';
import Accordion from '@/components/common/accordion';
import BlurCircle from '@/components/common/blurCircle';

import './ImageAccordian.scss';

interface Props {
  tag: string;
  title: string;
  description: string;
  accordianList: {
    title: string;
    description: string;
  }[];
  image: string;
  imageCaption: string;
  buttonText: string;
}

const ImageAccordian = ({
  tag,
  title,
  description,
  accordianList,
  image,
  imageCaption,
  buttonText,
}: Props) => {
  const router = useRouter();

  return (
    <PageWrapper className="image-accordian">
      <BlurCircle size="1127px" className="blur-circle-container" />

      <div className="introduction">
        <div className="tag">{tag}</div>

        <div className="title">{title}</div>

        <div className="description">{description}</div>
      </div>

      <div className="image-accordian-container">
        <div className="left-column">
          <div className="picture-container">
            <Image fill className="object-cover" src={image} alt="graph of 4i" />
          </div>

          <div className="picture-caption">{imageCaption}</div>

          <CustomButton onClickBtn={() => router.push('/solutions')}>{buttonText}</CustomButton>
        </div>

        {accordianList && accordianList?.length > 0 && (
          <div className="right-column">
            {accordianList?.map((accordian, index) => (
              <div key={index} className="accordian-container">
                <Accordion title={accordian.title}>{accordian.description}</Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ImageAccordian;
