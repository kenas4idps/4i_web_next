import { Metadata } from 'next';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import { SeoFE, ToolTypeBE } from '@/api/models/shared';
import { api } from '@/api';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import PageDataHandlerServer from '@/utils/PageDataHandlerServer';
import { sanitizeString } from '@/utils/commonFunctions';
import StructuredData from '@/components/common/StructuredData';
import HeroBanner from '@/components/layout/heroBanner';
import ProjectManagement from '@/components/pages/projectManagement';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'project-management-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

const handleToolsListData = (toolsListData: ToolTypeBE[]) => {
  return toolsListData?.map(tool => {
    return {
      logo: {
        url: `${process.env.REACT_APP_STRAPI_URL}${tool?.attributes?.logo?.logo?.data?.attributes?.url}`,
        caption: tool?.attributes?.logo?.logo?.data?.attributes?.caption,
        alternativeText: tool?.attributes?.logo?.logo?.data?.attributes?.alternativeText,
      },
      name: tool?.attributes?.name,
    };
  });
};

const getPageData = async (locale: string) => {
  const pageName = 'project-management-page';

  try {
    const pageInfo = await PageDataHandlerServer().getPageInfo(pageName, locale);

    if (pageInfo) {
      const toolsList = handleToolsListData(pageInfo?.pageData?.tools?.data);

      return {
        pageInfo,
        toolsList,
      };
    }
  } catch (error) {
    console.error(`[Error - API] Error handling Project Management data`, error);
    console.log(`Something Went Wrong handling Project Management Data, Please Try Again !`);
  }
  return null;
};

export default async function ProjectManagementPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getPageData(locale);
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
						"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/project-management",
						"name": "4i Tech: Project Management"
					}
			}
		]
	}`;

  const pmSchema = `{
			"@context":"https://schema.org",
			"@type": "WebPage",
      "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/project-management",
      "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/project-management",
			"name": "${pageInfo?.pageInfo?.seo?.metaTitle}",
			"description": "${pageInfo?.pageInfo?.seo?.metaDescription}",
			"inLanguage": "${locale}",
			"about": {
				"@type": "Service",
				"name": "${sanitizeString(pageInfo?.pageInfo?.detail?.title)}",
				"description": "${sanitizeString(pageInfo?.pageInfo?.detail?.description)}",
				"provider": {
					"@type": "Organization",
					"name": "4i Tech",
					"url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}"
				}
			},
			"isPartOf":{
				"@type":"WebSite",
				"name":"4i Tech",
				"url":"${process.env.NEXT_PUBLIC_APP_URL}/${locale}"         
			}
		}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={pmSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.pageInfo?.detail?.title}
        description={pageInfo?.pageInfo?.detail?.description}
      />
      <ProjectManagement />
    </>
  );
}
