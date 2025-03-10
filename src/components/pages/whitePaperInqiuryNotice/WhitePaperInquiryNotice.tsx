'use client';

import Notice from '@/components/layout/notice/Notice';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const WhitePaperInquiryNotice = () => {
  const t = useTranslations('whitePaper');
  const router = useRouter();

  setTimeout(() => {
    router.back();
  }, 5000);

  return (
    <>
      <Notice
        tag={t('tankYouTag')}
        title={t('thankYouTitle')}
        subtitle={t('thankYouSubtitle')}
        success={true}
      />
    </>
  );
};

export default WhitePaperInquiryNotice;
