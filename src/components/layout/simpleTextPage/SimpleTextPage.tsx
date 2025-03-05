import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import PageWrapper from '@/components/common/pageWrapper';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';

import './SimpleTextPage.scss';
import BlurCircle from '@/components/common/blurCircle';

interface Props {
  children: ReactNode;
  linkLabel: string;
}

const SimpleTextPage = ({ children, linkLabel }: Props) => {
  const router = useRouter();

  return (
    <div className="simple-text-page">
      <PageWrapper className="simple-text-page-container small">
        <BlurCircle size="524px" className="blur-circle-container" />

        <div className="go-back-link" onClick={() => router.back()}>
          <span className="arrow"></span>
          {linkLabel}
        </div>

        <RichTextStylingCmp className="description">{children}</RichTextStylingCmp>
      </PageWrapper>
    </div>
  );
};

export default SimpleTextPage;
