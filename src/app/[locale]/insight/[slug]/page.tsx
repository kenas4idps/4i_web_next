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
import Insight from '@/components/pages/insight/Insight';
import { insightDataHandler } from './_util/insightDataHandler';
import SeoDataHandler from '@/utils/SeoDataHandler';
import { sanitizeString } from '@/utils/commonFunctions';

const CompanyLogo = '/assets/img/logo192.png';

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

const getInsightsPageData = async ({ locale, slug }: { locale: string; slug: string }) => {
  try {
    if (slug) {
      const response = await api.insight.collection.getInsightData(slug, locale);

      if ('content' in response) {
        const insightData = response?.content;
        const seo = SeoDataHandler().handleSeoData(insightData?.data[0]?.attributes?.seo);
        const insight = insightDataHandler(insightData?.data[0]?.attributes);

        return {
          seo,
          insight,
        };
      }
    }
  } catch (error) {
    console.error(error);
    console.log(`Something Went Wrong Fetching Insight Data, Please Try Again !`, 'error');
  }
  return null;
};

export default async function CaseStudiesPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const pageInfo = await getInsightsPageData({ locale, slug });
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
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insight/${slug}",
						"name": "4i Tech Insight: ${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insight/${slug}"
					}
			}
		]
	}`;

  const articleSchema = `{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insight/${slug}",
		"url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/insight/${slug}",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description": "${pageInfo?.seo?.metaDescription}",
		"about": {
			"@type": "NewsArticle",
			"headline": "${sanitizeString(pageInfo?.insight?.title)}",
			"description": "${pageInfo?.seo?.metaDescription}",
			"author": {
				"@type": "Organization",
				"name": "4i Tech",
				"url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}"
			},
			"publisher": {
				"@type": "Organization",
				"name": "4i Tech",
				"logo": {
					"@type": "ImageObject",
					"url": "${CompanyLogo}"
				}
			},
			"datePublished": "${pageInfo?.insight?.publishedAt}",
			"dateModified": "${pageInfo?.insight?.updatedAt}",
			"image": "${pageInfo?.insight?.image?.url}",
			"articleBody": "${pageInfo?.insight?.elementsList?.map((element: any, i) => {
        if (element?.name === 'individual-insight.paragraph') {
          return sanitizeString(element?.paragraph);
        }
      })}"
		}
	}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={articleSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} isBgWhite={true} />
      <HeroBanner
        picture={pageInfo?.insight?.image?.url}
        title={pageInfo?.insight?.title}
        description={pageInfo?.seo?.metaDescription}
      />
      <Insight insight={pageInfo?.insight} slug={slug} />
    </>
  );
}
