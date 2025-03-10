import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import { SeoFE } from '@/api/models/shared';
import SeoDataHandler from '@/utils/SeoDataHandler';
import ContactUs from '@/components/pages/contactUs';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const response = await api.commonPage.collection.getPageData({
    pageName: 'contact-us-page',
    locale,
  });
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return { ...generateSeoMetadata(locale, seo), robots: 'noindex' };
  }
  return {};
}

const handleContactUsSeo = async (locale: string) => {
  try {
    // const constUsSeoData: ContactUsSeoBE = await contactUsSeoApi.getContactUsSeoData(locale);
    const response = await api.contactUs.collection.getContactUsSeoData(locale);

    if ('content' in response) {
      const seo = SeoDataHandler().handleSeoData(response.content.data.attributes.seo);

      return {
        seo,
        pageData: response,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      seo: undefined,
      pageData: undefined,
    };
  }
};

export default async function ContactUsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const pageInfo = await handleContactUsSeo(locale);
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
						"@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/contact-us/inquiry",
						"name": "4i Tech: Contact Us"
					}
			}
		]
	}`;

  const contactUsSchema = `{
		"@type": "WebPage",
    "@id": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/contact-us/inquiry",
    "url": "${process.env.NEXT_PUBLIC_APP_URL}/${locale}/contact-us/inquiry",
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
        mainEntityOfPage={contactUsSchema}
        breadCrumb={breadCrumb}
      />

      <Nav isBgWhite={true} navList={navList} />

      {/* contactUs is a server component */}
      <ContactUs />
    </>
  );
}
