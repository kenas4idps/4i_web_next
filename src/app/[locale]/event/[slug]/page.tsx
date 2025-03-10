import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import StructuredData from '@/components/common/StructuredData';
import Nav from '@/components/layout/nav/Nav';
import { getTranslations } from 'next-intl/server';
import { getNavList } from '@/app/[locale]/_util/getNavList';
import { getSolutionsList } from '@/app/[locale]/_util/getSolutionsList';
import { SeoFE } from '@/api/models/shared';
import { handleEventData } from './_util/handleEventData';
import SeoDataHandler from '@/utils/SeoDataHandler';
import DetailDataHandler from '@/utils/DetailDataHandler';
import Event from '@/components/pages/event';

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

const getEventData = async ({ slug, locale }: { slug: string; locale: string }) => {
  try {
    if (slug) {
      const eventData = await api.event.collection.getEventData(slug, locale);

      if ('content' in eventData) {
        const seo: SeoFE = SeoDataHandler().handleSeoData(eventData?.content?.seo);
        const detail = DetailDataHandler().handleDetailData(eventData?.content?.detail);
        const eventDetail = handleEventData(eventData?.content);

        return {
          seo,
          detail,
          eventDetail,
        };
      }
    }
  } catch (error) {
    console.error(`[Error - API] Error calling Event data`, error);
  }

  return null;
};

export default async function EventPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const pageInfo = await getEventData({ locale, slug });
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
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}",
            "name": "4i Tech: Home"
          }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/events",
            "name": "4i Tech: Events"
          }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
            "@id": "${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}",
            "name": "4i Tech Event: ${slug.replace(/-|_/g, ' ')}"
          }
      }
    ]
  }`;

  const eventSchema = `{
		"@type": "Event",
		"@id": "${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}",
		"url": "${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}",
		"name": "${pageInfo?.seo?.metaTitle}",
		"description":"${pageInfo?.seo?.metaDescription}",
		"inLanguage": "${locale}",
		"isPartOf": {
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
        mainEntityOfPage={eventSchema}
        breadCrumb={breadCrumb}
      />

      <Nav navList={navList} />

      {pageInfo && (
        <Event slug={slug} eventDetail={pageInfo?.eventDetail} pageDetail={pageInfo?.detail} />
      )}
    </>
  );
}
