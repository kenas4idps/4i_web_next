import { ReactNode } from 'react';

import PageWrapper from '@/components/common/pageWrapper';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';

import './CaseStudyDescription.scss';

interface Props {
  children: ReactNode;
}

const CaseStudyDescription = ({ children }: Props) => {
  return (
    <PageWrapper className="case-study-description">
      <RichTextStylingCmp>{children}</RichTextStylingCmp>
    </PageWrapper>
  );
};

export default CaseStudyDescription;
