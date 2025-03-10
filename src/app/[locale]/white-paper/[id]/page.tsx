import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import { SeoFE } from '@/api/models/shared';
import { handleWhitePaperData } from '@/app/[locale]/white-paper/[id]/_util/util';
import SeoDataHandler from '@/utils/SeoDataHandler';
import StructuredData from '@/components/common/StructuredData';
import WhitePaper from '@/components/pages/whitePaper';

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'solutions-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return { ...generateSeoMetadata(locale, seo) };
  }
  return {};
}

const getWhitePaperPageData = async (id: string, locale: string) => {
  try {
    const response = await api.solution.collection.getSolutionData(
      locale,
      id,
      'white_paper_page_detail',
    );
    if ('content' in response) {
      const pageInfo = response.content?.data[0]?.attributes;
      const detail = handleWhitePaperData(pageInfo);
      const seo = SeoDataHandler().handleSeoData(pageInfo?.seo);

      return { detail, seo, pageInfo };
    }
  } catch (error) {
    console.log(error);
    console.log('Something Went Wrong When Handling WhitePaper, Please Try Again !', 'error');
  }

  return null;
};

export default async function WhitePaperPage({ params }: { params: Params }) {
  const { locale, id } = await params;
  const pageInfo = await getWhitePaperPageData(id, locale);
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
						"@id": "${process.env.NEXT_PUBLIC_BASE_URL}",
						"name": "4i Tech: Home"
					}
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/solutions",
						"name": "4i Tech: Solutions"
					}
			},
			{
				"@type": "ListItem",
				"position": 3,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/solution/${id}",
						"name": "4i Tech Solution: ${id.replace(/-|_/g, ' ')}"
					}
			},
			{
				"@type": "ListItem",
				"position": 4,
				"item": {
					"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/white-paper/${id}",
					"name": "4i Tech ${id.replace(/-|_/g, ' ')} White Paper"
				}
			}
		]
	}`;

  const caseStudySchema = `{
		"@context":"https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/white-paper/${id}",
		"url": "${process.env.NEXT_PUBLIC_BASE_URL}/white-paper/${id}",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description":"${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"isPartOf":{
			"@type":"WebSite",
			"name":"4i Tech",
			"url":"${process.env.NEXT_PUBLIC_BASE_URL}"         
		}
	}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={caseStudySchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />

      {/* contactUs is a server component */}
      <WhitePaper pageDetail={pageInfo?.detail} />
    </>
  );
}
