import { Metadata } from 'next';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import PrivacyPolicy from '@/components/pages/privacyPolicy';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return {
    title: 'Privacy Policy',
    description: 'Privacy Policy',
    robots: 'noindex',
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Params }) {
  const { locale } = await params;
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  return (
    <>
      <Nav isBgWhite={true} navList={navList} />
      <PrivacyPolicy />
    </>
  );
}
