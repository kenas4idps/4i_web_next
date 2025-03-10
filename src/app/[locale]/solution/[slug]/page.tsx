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
import { handleToolsList, handleSolutionData } from './_util/util';
import DetailDataHandler from '@/utils/DetailDataHandler';
import SeoDataHandler from '@/utils/SeoDataHandler';
import CaseStudiesDataHandler from '@/utils/CaseStudiesDataHandler';
import { sanitizeString } from '@/utils/commonFunctions';
import Solution from '@/components/pages/solution';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'solutions-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

const getSolutionPageData = async ({ locale, slug }: { locale: string; slug: string }) => {
  try {
    const response = await api.solution.collection.getSolutionData(locale, slug);

    if ('content' in response) {
      const solutionData = response.content?.data[0]?.attributes;

      const seo = SeoDataHandler().handleSeoData(solutionData?.seo);
      const detail = DetailDataHandler().handleDetailData(solutionData?.detail);
      const solution = handleSolutionData(solutionData);
      const toolsList = handleToolsList(solutionData?.tools);
      const caseStudiesList = CaseStudiesDataHandler().handleCaseStudiesData(
        solutionData?.selected_case_studies?.case_studies?.data,
      );

      console.log({ response });

      return {
        seo,
        detail,
        solution,
        toolsList,
        caseStudiesList,
      };
    }
  } catch (error) {
    console.log(error);
    console.log('Something Went Wrong When Handling Solutions Data, Please Try Again !', 'error');
  }
  return null;
};

export default async function CaseStudiesPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const pageInfo = await getSolutionPageData({ locale, slug });
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
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_URL}/${slug}",
						"name": "4i Tech Solution: ${slug.replace(/-|_/g, ' ')}"
					}
			}
		]
	}`;

  const solutionSchema = `{
		"@context":"https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_URL}/${slug}",
		"url": "${process.env.NEXT_PUBLIC_URL}/${slug}",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description":"${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"about": [
			${
        pageInfo?.solution?.developmentServices?.serviceList &&
        pageInfo?.solution?.developmentServices?.serviceList?.length > 0
          ? pageInfo?.solution?.developmentServices?.serviceList.map(service => {
              return `{
						"@type": "Service",
						"name": "${sanitizeString(service?.title)}",
						"description": "${sanitizeString(service?.description)}",
						"provider": {
							"@type": "Organization",
							"name": "4i Tech",
							"url": "${process.env.NEXT_PUBLIC_URL}"
						}
					}`;
            })
          : `{
					"@type": "Service",
					"name": "${sanitizeString(pageInfo?.solution?.label)}",
					"description": "${sanitizeString(pageInfo?.detail?.description)}",
					"provider": {
						"@type": "Organization",
						"name": "4i Tech",
						"url": "${process.env.NEXT_PUBLIC_URL}"
					}
				}`
      }
		],
		"isPartOf":{
			"@type":"WebSite",
			"name":"4i Tech",
			"url":"${process.env.NEXT_PUBLIC_URL}"         
		}
	}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={solutionSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.detail?.title}
        description={pageInfo?.detail?.description}
      />

      <Solution
        slug={slug}
        solution={pageInfo?.solution}
        toolsList={pageInfo?.toolsList}
        caseStudiesList={pageInfo?.caseStudiesList}
      />
    </>
  );
}
