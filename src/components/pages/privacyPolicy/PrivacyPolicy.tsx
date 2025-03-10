'use client';

import { useTranslations } from 'next-intl';

import RichTextTransformCmp from '@/components/common/richTextTransformCmp';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';

import SimpleTextPage from '@/components/layout/simpleTextPage';

const PrivacyPolicy = () => {
  const t = useTranslations('privacyPolicy');

  return (
    <SimpleTextPage linkLabel={t('goBackLink')}>
      <h1>{t('title')}</h1>

      <RichTextStylingCmp>
        <RichTextTransformCmp>{t('content')}</RichTextTransformCmp>
      </RichTextStylingCmp>
    </SimpleTextPage>
  );
};

export default PrivacyPolicy;
