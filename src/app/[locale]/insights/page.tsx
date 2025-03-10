import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import { SeoFE } from '@/api/models/shared';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import HeroBanner from '@/components/layout/heroBanner';
import PageDataHandlerServer from '@/utils/PageDataHandlerServer';
import InsightsListHandler from '@/utils/InsightsListHandler';
import Insights from '@/components/pages/insights';

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

const getInsightsPageData = async ({ locale }: { locale: string }) => {
  const pageName = 'insights-page';
  try {
    const pageInfo = await PageDataHandlerServer().getPageInfo(pageName, locale);

    if (pageInfo) {
      const insightList = InsightsListHandler().handleInsightList(
        pageInfo?.pageData?.selected_insights?.insights?.data,
      );

      return {
        pageInfo,
        insightList,
      };
    }
  } catch (error) {
    console.error(`[Error - API] Error calling ${pageName} data`, error);
  }
  return null;
};

export default async function CaseStudiesPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getInsightsPageData({ locale });
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  const breadCrumb = `{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}",
						"name": "4i Tech: Home"
					}
			},
			{
				"@type": "ListItem",
				"position": 2,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insights",
						"name": "4i Tech: Insights"
					}
			}
		]
	}`;

  const insightsSchema = `{
		"@context":"https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insights",
		"url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insights",
		"name": "${pageInfo?.pageInfo?.seo?.metaTitle}",
		"description":"${pageInfo?.pageInfo?.seo?.metaDescription}",
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
        seo={pageInfo?.pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={insightsSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.pageInfo?.detail?.title}
        description={pageInfo?.pageInfo?.detail?.description}
      />
      <Insights insightsList={pageInfo?.insightList} />
    </>
  );
}
