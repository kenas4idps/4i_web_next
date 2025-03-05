import { Metadata, ResolvingMetadata } from 'next';
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

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.homePage.collection.getHomeData(locale);
  if ('content' in response) {
    const seo: SeoFE = response.content?.data.attributes.seo;
    console.log({ seo });
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
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
