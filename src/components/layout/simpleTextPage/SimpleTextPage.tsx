import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import PageWrapper from 'components/common/pageWrapper';
import RichTextStylingCmp from 'components/common/richTextStylingCmp';

import './SimpleTextPage.scss';
import BlurCircle from 'components/common/blurCircle';

interface Props {
  children: ReactNode;
  linkLabel: string;
}

const SimpleTextPage = ({ children, linkLabel }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="simple-text-page">
      <PageWrapper className="simple-text-page-container small">
        <BlurCircle size="524px" className="blur-circle-container" />

        <div className="go-back-link" onClick={() => navigate(-1)}>
          <span className="arrow"></span>
          {linkLabel}
        </div>

        <RichTextStylingCmp className="description">{children}</RichTextStylingCmp>
      </PageWrapper>
    </div>
  );
};

export default SimpleTextPage;
