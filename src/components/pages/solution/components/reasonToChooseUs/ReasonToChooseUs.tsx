import PageWrapper from '@/components/common/pageWrapper';

import Accordion from '@/components/common/accordion';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

const ReasonToChooseUsImg1 = '/assets/img/reasonToChooseUs1.jpg';
const ReasonToChooseUsImg2 = '/assets/img/reasonToChooseUs2.png';

import './ReasonToChooseUs.scss';

interface ReasonType {
  title: string;
  content: string;
}

interface Props {
  title: string;
  list: ReasonType[];
}

const ReasonToChooseUs = ({ title, list }: Props) => {
  return (
    <div className="reason-to-choose-us">
      <PageWrapper className="reason-to-choose-us-super-container">
        <DoubleCircleOverlay size="1540px" className="double-circle-container" />

        <div className="pictures-container">
          <img src={ReasonToChooseUsImg1} alt="Corrado and Nina working on a computer" />
          <img src={ReasonToChooseUsImg2} alt="Austin and Nick collaborating" />
        </div>

        <div className="reason-to-choose-us-container">
          <div className="title">{title}</div>

          <div className="reasons-container">
            {list?.map((reason, key) => {
              return (
                <Accordion title={reason?.title} className="reasons-accordion" key={key}>
                  <RichTextStylingCmp>
                    <RichTextTransformCmp>{reason?.content}</RichTextTransformCmp>
                  </RichTextStylingCmp>
                </Accordion>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default ReasonToChooseUs;
