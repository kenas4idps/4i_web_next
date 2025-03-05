import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import Homepage from '@/components/pages/homepage/Homepage';
import { SeoFE } from '@/api/models/shared';
import { getHomeData } from './_util/getHomeData';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const response = await api.homePage.collection.getHomeData(locale);
  if ('content' in response) {
    const seo: SeoFE = response.content?.data.attributes.seo;
    console.log({ seo });
    return generateSeoMetadata(seo, locale);
  }
  return {};
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const data = await getHomeData(locale);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  const homeSchema = `{
    "@context":"https://schema.org",
    "@type": "WebPage",
    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}",
    "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}",
    "name": "${data?.seo?.metaTitle}",
    "description": "${data?.seo?.metaDescription}",
    "inLanguage": "${locale}"
  }`;

  return (
    <>
      <StructuredData
        seo={data?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={homeSchema}
      />
      <Nav navList={navList} />
      <Homepage data={data} />;
    </>
  );
}
