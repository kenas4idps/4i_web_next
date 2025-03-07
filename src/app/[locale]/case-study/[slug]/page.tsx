import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import SeoDataHandler from '@/utils/SeoDataHandler';
import { handleCaseStudyData } from './_util/handleCaseStudyData';
import { ImageFE, SeoFE } from '@/api/models/shared';
import CaseStudy from '@/components/pages/caseStudy';
import CaseStudyBanner from '@/components/pages/caseStudy/components/caseStudyBanner/CaseStudyBanner';

export interface CaseStudyFE {
  title: string;
  bannerImage: ImageFE;
  showBannerImage: boolean;
  challenge: string;
  confidentiality: boolean;
  description: string;
  locale: string;
  images: ImageFE[];
  result: string;
  solution: string;
  caseStudyTypeList: string[];
  client: {
    name: string;
    country: string;
    industry: string[];
  };
  tools: string[];
  localizations: {
    attributes: {
      locale: string;
    };
    id: number;
  }[];
  publishedAt: string;
  updatedAt: string;
}

type Params = Promise<{ locale: string; slug: string }>;

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

const getCaseStudyData = async (locale: string, slug: string) => {
  try {
    if (slug) {
      const response = await api.caseStudy.collection.getCaseStudyData({
        id: slug,
        locale,
      });
      if ('content' in response) {
        console.log({ response: response.content });
        const seo: SeoFE = SeoDataHandler().handleSeoData(response.content.seo);
        const caseStudy: CaseStudyFE = handleCaseStudyData(response.content);

        return {
          seo,
          caseStudy,
          pageData: response.content,
        };
      }
    }
  } catch (error) {
    console.error(error);

    return {};
  }
};

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const pageInfo = await getCaseStudyData(locale, slug);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const tc = await getTranslations('casesStudies');
  const navList = await getNavList(t, solutionsList);

  const caseStudySchema = `{
    "@type": "WebPage",
    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/case-studies/${slug}",
    "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/case-studies/${slug}",
    "name": "${pageInfo?.seo?.metaTitle}",
    "description": "${pageInfo?.seo?.metaDescription}",
    "inLanguage": "${locale}",
    "isPartOf":{
      "@type":"WebSite",
      "name":"4i Tech",
      "url":"${process.env.NEXT_PUBLIC_APP_URL}"         
    }
  }`;

  console.log({ pageInfo });

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={caseStudySchema}
      />

      <Nav isBgWhite={true} navList={navList} />

      <CaseStudyBanner
        tag={tc('caseStudyTag')}
        title={pageInfo?.caseStudy?.title ?? ''}
        description={pageInfo?.caseStudy?.description ?? ''}
        showBannerImage={pageInfo?.caseStudy?.showBannerImage ?? false}
      />

      <CaseStudy caseStudy={pageInfo?.caseStudy} />
    </>
  );
}
