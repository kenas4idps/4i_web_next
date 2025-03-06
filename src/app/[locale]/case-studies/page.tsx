import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import { SeoFE } from '@/api/models/shared';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import CaseStudies from '@/components/pages/caseStudies';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'case-studies-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

const getCaseStudiesData = async (locale: string) => {
  try {
    const response = await api.commonPage.collection.getPageData({
      pageName: 'case-studies-page',
      locale,
    });
    if ('content' in response) {
      return {
        seo: response.content?.seo,
        description: response.content?.description,
        title: response.content.title,
        bannerImage: response.content?.bannerImage,
      };
    }

    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default async function CaseStudiesPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getCaseStudiesData(locale);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  const caseStudiesSchema = `{
    "@type": "WebPage",
    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/case-studies",
    "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/case-studies",
    "name": "${pageInfo?.seo?.metaTitle}",
    "description": "${pageInfo?.seo?.metaDescription}",
    "inLanguage": "${locale}",
    "isPartOf":{
      "@type":"WebSite",
      "name":"4i Tech",
      "url":"${process.env.NEXT_PUBLIC_APP_URL}"         
    }
  }`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={caseStudiesSchema}
      />
      <Nav navList={navList} />
      <CaseStudies data={pageInfo} />
    </>
  );
}
