import { Metadata } from 'next';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import WhitePaperInquiryNotice from '@/components/pages/whitePaperInqiuryNotice/WhitePaperInquiryNotice';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return {
    title: 'White Paper Inquiry',
    description: 'White Paper Inquiry',
    robots: 'noindex',
  };
}

export default async function CookiePolicyPage({ params }: { params: Params }) {
  const { locale } = await params;
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  return (
    <>
      <Nav isBgWhite={true} navList={navList} />

      {/* contactUs is a server component */}
      <WhitePaperInquiryNotice />
    </>
  );
}
