import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import { SeoFE } from '@/api/models/shared';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import HeroBanner from '@/components/layout/heroBanner/HeroBanner';
import PageDataHandlerServer from '@/utils/PageDataHandlerServer';
import OurClients from '@/components/pages/ourClients';

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
  const pageName = 'clients-page';

  try {
    const response = await PageDataHandlerServer().getPageInfo(pageName, locale);

    if (response) {
      return response;
    }
  } catch (error) {
    console.error(`[Error - API] Error handling ${pageName} data`, error);
    console.log(`Something Went Wrong handling ${pageName} Data, Please Try Again !`);
  }

  return null;
};

export default async function AboutUsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getAboutUsData(locale);
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
						"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/${locale}",
						"name": "4i Tech: Home"
					}
			},
			{
				"@type": "ListItem",
				"position": 2,
				"item": {
						"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/our-clients",
						"name": "4i Tech: Our Clients"
					}
			}
		]
	}`;

  const ourClientsSchema = `{
		"@context":"https://schema.org",
		"@type": "WebPage",
		"@id": "${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/our-clients",
		"url": "${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/our-clients",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description": "${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"isPartOf":{
			"@type":"WebSite",
			"name":"4i Tech",
			"url":"${process.env.NEXT_PUBLIC_BASE_URL}/${locale}"         
		}
	}`;

  return (
    <>
      <StructuredData
        seo={pageInfo?.seo}
        solutionsList={solutionsList}
        locale={locale}
        mainEntityOfPage={ourClientsSchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.detail?.title}
        description={pageInfo?.detail?.description}
      />
      <OurClients />
    </>
  );
}
