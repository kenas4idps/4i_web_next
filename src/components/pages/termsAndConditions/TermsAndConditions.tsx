import { useTranslations } from 'next-intl';

import RichTextStylingCmp from '@/components/common/richTextStylingCmp';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import SimpleTextPage from '@/components/layout/simpleTextPage';

const TermsAndConditions = () => {
  const t = useTranslations('termsAndConditions');

  return (
    <SimpleTextPage linkLabel={t('goBackLink')}>
      <h1>{t('title')}</h1>

      <RichTextStylingCmp>
        <RichTextTransformCmp>{t('content')}</RichTextTransformCmp>
      </RichTextStylingCmp>
    </SimpleTextPage>
  );
};

export default TermsAndConditions;
