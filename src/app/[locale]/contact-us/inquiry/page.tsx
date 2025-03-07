import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import { SeoFE } from '@/api/models/shared';
import ContactUsInquiryNotice from '@/components/pages/contactUsInquiryNotice/contactUsInquiryNotice';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'contact-us-inquiry-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return { ...generateSeoMetadata(locale, seo), robots: 'noindex' };
  }
  return {};
}

export default async function ContactUsInquiryPage({ params }: { params: Params }) {
  const { locale } = await params;
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  return (
    <>
      <Nav isBgWhite={true} navList={navList} />

      {/* contactUs is a server component */}
      <ContactUsInquiryNotice />
    </>
  );
}
