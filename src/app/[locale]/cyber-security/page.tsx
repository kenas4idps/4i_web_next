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
import { handleExtraData } from '@/app/[locale]/cyber-security/_util/handleCyberSecurityData';
import CyberSecurity from '@/components/pages/cyberSecurity';
import PageDataHandlerServer from '@/utils/PageDataHandlerServer';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'cyber-security-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(locale, seo);
  }
  return {};
}

// TODO: make this common function
const getServerPageData = async (locale: string) => {
  try {
    const response = await PageDataHandlerServer().getPageInfo('cyber-security-page', locale);

    if (response) {
      return {
        detail: response.detail,
        seo: response.seo,
        pageData: handleExtraData(response.pageData),
      };
    }
  } catch (error) {
    console.error(`[Error - API] Error handling Cyber Security data`, error);
  }

  return null;
};

export default async function CyberSecurityPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await getServerPageData(locale);
  const solutionsList = await getSolutionsList(locale);
  const t = await getTranslations('nav');
  const navList = await getNavList(t, solutionsList);

  // TODO: add breadcrumb
  const breadCrumb = `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}",
            "name": "4i Tech: Home"
          }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cyber-security",
            "name": "4i Tech: Cyber Security"
          }
      }
    ]
  }`;

  const cyberSecuritySchema = `{
		"@type": "WebPage",
    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cyber-security",
    "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cyber-security",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description": "${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"about": {
			"@type": "Service",
			"name": "${sanitizeString(pageInfo?.detail?.title)}",
			"description": "${sanitizeString(pageInfo?.detail?.description)}",
			"provider": {
				"@type": "Organization",
				"name": "4i Tech",
        "url":"${process.env.NEXT_PUBLIC_APP_URL}"         
			}
		},
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
        mainEntityOfPage={cyberSecuritySchema}
        breadCrumb={breadCrumb}
      />
      <Nav navList={navList} />
      <HeroBanner
        picture={pageInfo?.detail?.bannerImage?.url}
        title={pageInfo?.detail?.title}
        description={pageInfo?.detail?.description}
      />

      {/* NOTE: CyberSecurity is a server side component */}
      <CyberSecurity cyberSecurityPage={pageInfo?.pageData as any} />
    </>
  );
}
