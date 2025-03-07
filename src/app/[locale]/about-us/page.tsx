import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import { SeoFE } from '@/api/models/shared';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import AboutUs from '@/components/pages/aboutUs/AboutUs';
import GetInTouchCmp from '@/components/layout/getInTouchCmp/GetInTouchCmp';
import DetailDataHandler from '@/utils/DetailDataHandler';
import HeroBanner from '@/components/layout/heroBanner/HeroBanner';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'about-us-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

const getAboutUsData = async (locale: string) => {
  try {
    const response = await api.commonPage.collection.getPageData({
      pageName: 'about-us-page',
      locale,
    });
    if ('content' in response) {
      const detail = DetailDataHandler().handleDetailData(response.content?.detail);
      return {
        seo: response.content?.seo,
        detail,
        pageData: response.content,
      };
    }

    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default async function AboutUsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getAboutUsData(locale);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  const aboutUsSchema = `{
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/about-us",
		"url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/about-us",
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
        mainEntityOfPage={aboutUsSchema}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.detail?.title}
        description={pageInfo?.detail?.description}
      />
      <AboutUs />
      <GetInTouchCmp />
    </>
  );
}
