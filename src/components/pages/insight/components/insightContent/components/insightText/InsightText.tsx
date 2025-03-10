import { ReactNode } from 'react';

import RichTextStylingCmp from '@/components/common/richTextStylingCmp';

import './InsightText.scss';

interface Props {
  children: ReactNode;
  withBubbles?: boolean;
}

const InsightText = ({ children }: Props) => {
  return <RichTextStylingCmp className="insight-text">{children}</RichTextStylingCmp>;
};

export default InsightText;
