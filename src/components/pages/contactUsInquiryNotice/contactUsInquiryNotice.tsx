'use client';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import Notice from '@/components/layout/notice/Notice';

const ContactUsInquiryNotice = () => {
  const t = useTranslations('thankYou');
  const router = useRouter();

  setTimeout(() => {
    router.push('/');
  }, 5000);

  return <Notice tag={t('tag')} title={t('title')} subtitle={t('subtitle')} success={true} />;
};

export default ContactUsInquiryNotice;
