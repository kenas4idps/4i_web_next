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
import { sanitizeString } from '@/utils/commonFunctions';
import PageDataHandlerServer from '@/utils/PageDataHandlerServer';
import Solutions from '@/components/pages/solutions/Solutions';

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

const getSolutionsPageData = async (locale: string) => {
  const pageName = 'solutions-page';
  try {
    const response = await PageDataHandlerServer().getPageInfo(pageName, locale);

    if (response) {
      return response;
    }
  } catch (error) {
    console.error(`[Error - API] Error calling ${pageName} data`, error);
    console.log(`Something Went Wrong Fetching ${pageName} Data, Please Try Again !`);
  }

  return null;
};

export default async function SolutionsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getSolutionsPageData(locale);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  const breadCrumb = `{
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_URL}",
						"name": "4i Tech: Home"
					}
			},
			{
				"@type": "ListItem",
				"position": 2,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_URL}/solutions",
						"name": "4i Tech: Solutions"
					}
			}
		]
	}`;

  const solutionsSchema = `{
		"@context":"https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_URL}/solutions",
		"url": "${process.env.NEXT_PUBLIC_URL}/solutions",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description": "${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"isPartOf":{
			"@type":"WebSite",
			"name":"4i Tech",
			"url":"${process.env.NEXT_PUBLIC_URL}"         
		},
		"about": [
			${
        solutionsList && solutionsList.length > 0
          ? solutionsList?.map(solution => {
              return `
						{
							"@type": "Service",
							"@id": "${process.env.NEXT_PUBLIC_URL}${solution.url}",
							"url": "${process.env.NEXT_PUBLIC_URL}${solution.url}",
							"name": "${sanitizeString(solution.label)}",
							"description": "${sanitizeString(solution.description)}",
							"provider": {
								"@type": "Organization",
								"name": "4i Tech",
								"url": "${process.env.NEXT_PUBLIC_URL}"
							}
						}
					`;
            })
          : ''
      }
		]
	}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={solutionsSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.detail?.title}
        description={pageInfo?.detail?.description}
      />

      <Solutions solutionsList={solutionsList} />
    </>
  );
}
