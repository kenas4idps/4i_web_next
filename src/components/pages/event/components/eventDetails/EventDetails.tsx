import PageWrapper from '@/components/common/pageWrapper';

import RichTextStylingCmp from '@/components/common/richTextStylingCmp';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import './EventDetails.scss';

interface Props {
  description: string;
  pictureList: string[];
}

const EventDetails = ({ description, pictureList }: Props) => {
  return (
    <div className="event-details">
      <PageWrapper className="event-details-container">
        <RichTextStylingCmp className="description">
          <RichTextTransformCmp>{description}</RichTextTransformCmp>
        </RichTextStylingCmp>

        <div className="picture-list">
          {pictureList?.map((pic, key) => {
            return (
              <div className="picture-container" key={key}>
                <img src={pic} alt="description TODO" />
              </div>
            );
          })}
        </div>
      </PageWrapper>
    </div>
  );
};

export default EventDetails;
