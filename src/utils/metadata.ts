import { Metadata } from 'next';
import { SeoFE } from '@/api/models/shared';
import CompanyLogo from '@/public/assets/img/logo192.png';

export function generateMetadata(seo?: SeoFE, locale: string): Metadata {
  const metadata: Metadata = {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    viewport: seo?.metaViewport,
    openGraph: {
      title: seo?.metaSocial?.fb?.title || seo?.metaTitle,
      description: seo?.metaSocial?.fb?.description || seo?.metaDescription,
      images: [
        {
          url: seo?.metaSocial?.fb?.image?.url || seo?.metaImage?.url || '',
          alt: seo?.metaSocial?.fb?.image?.alternativeText || '',
        },
      ],
      url: seo?.canonicalURL || '',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaSocial?.twitter?.title || seo?.metaTitle,
      description: seo?.metaSocial?.twitter?.description || seo?.metaDescription,
      images: [
        {
          url: seo?.metaSocial?.twitter?.image?.url || seo?.metaImage?.url || '',
          alt: seo?.metaSocial?.twitter?.image?.alternativeText || '',
        },
      ],
    },
    alternates: {
      canonical: seo?.canonicalURL || '',
    },
  };

  return metadata;
}

export function generateStructuredData(
  seo: SeoFE,
  solutionsList: any[],
  locale: string,
  mainEntityOfPage?: string,
) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    name: '4i Tech',
    description: seo.metaDescription,
    logo: {
      '@type': 'ImageObject',
      url: CompanyLogo,
    },
    sameAs: [
      'https://www.facebook.com/4iTechnology',
      'https://x.com/4iTech_Dev',
      'https://www.linkedin.com/company/4i-tech',
    ],
    mainEntityOfPage: mainEntityOfPage || '',
    foundingDate: '2010-01-01',
    founder: {
      '@type': 'Person',
      name: 'Corrado von Planta',
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '3F, N. 2, Ruiguang Rd., Neihu Dist.',
        addressLocality: 'Taipei City',
        addressRegion: 'Taipei',
        postalCode: '11491',
        addressCountry: 'TW',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '30F.-5, No. 236, Shizheng N. 2nd Rd., Xitun Dist.',
        addressLocality: 'Taichung City',
        addressRegion: 'Taichung',
        addressCountry: 'TW',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '19625 Glen Una Dr.',
        addressLocality: 'Saratoga, Bay Area',
        addressRegion: 'California',
        postalCode: '95070',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '8 the Green, Suite A Dover',
        addressLocality: 'East Coast',
        addressRegion: 'Denver',
        postalCode: '19901',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Wiesenstrasse 7',
        addressLocality: 'Zurich',
        addressRegion: 'Zurich',
        postalCode: '8008',
        addressCountry: 'CH',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+886-2-2792-8451',
      contactType: 'customer support',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Chinese', 'German', 'French'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Outsourcing Services',
      itemListElement: solutionsList?.map(solution => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: solution.label,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${solution.url}`,
          description: solution.description,
        },
      })),
    },
  };

  return [organizationSchema, ...(seo.structuredData ? [JSON.parse(seo.structuredData)] : [])];
}
