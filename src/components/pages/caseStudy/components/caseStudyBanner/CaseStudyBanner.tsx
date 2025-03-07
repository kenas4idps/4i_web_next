import RichTextTransformCmp from '@/components/common/richTextTransformCmp';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';
import PageWrapper from '@/components/common/pageWrapper';

import './CaseStudyBanner.scss';

interface Props {
  tag: string;
  title: string;
  description: string;
  showBannerImage: boolean;
}

const CaseStudyBanner = ({ tag, title, description, showBannerImage = true }: Props) => {
  return (
    <PageWrapper className={`case-study-banner ${!showBannerImage && 'banner-image-hidden'}`}>
      <div className="tag">{tag}</div>

      <h1 className="title">{title}</h1>

      <RichTextStylingCmp className="description">
        <RichTextTransformCmp>{description}</RichTextTransformCmp>
      </RichTextStylingCmp>
    </PageWrapper>
  );
};

export default CaseStudyBanner;
