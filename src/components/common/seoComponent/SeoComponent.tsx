import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { HomeDataContext } from 'providers/homeDataProvider/HomeDataProvider';
import { SolutionsListContext } from 'providers/solutionsListProvider/SolutionsListProvider';

import { SeoFE } from 'types/SharedType';

import CompanyLogo from 'assets/img/logo192.png';

const SeoComponent = ({
  metaTitle,
  metaDescription,
  metaImage,
  metaSocial,
  canonicalURL,
  keywords,
  metaRobots,
  metaViewport,
  structuredData,
  breadCrumb,
  mainEntityOfPage,
}: SeoFE) => {
  const { i18n } = useTranslation();
  const { getSolutionsList, solutionsList } = useContext(SolutionsListContext);
  const { seo, init } = useContext(HomeDataContext);

  useEffect(() => {
    !solutionsList && getSolutionsList();
    !seo && init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <Helmet>
      {metaTitle && <title>{metaTitle}</title>}

      {metaDescription && <meta name="description" content={metaDescription} />}

      {canonicalURL ? (
        <link rel="canonical" href={canonicalURL} />
      ) : (
        <link rel="canonical" href={`${window.location.href}`} />
      )}

      {keywords && <meta name="keywords" content={keywords} />}

      {metaImage?.url && <meta itemProp="image" content={metaImage?.url} />}

      {metaRobots ? (
        <meta name="robots" content={metaRobots} />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {metaViewport && <meta name="viewport" content={metaViewport} />}

      {/* Tag for FACEBOOK share */}
      {metaSocial?.fb?.title ? (
        <meta property="og:title" content={metaSocial?.fb?.title} />
      ) : (
        <meta property="og:title" content={metaTitle} />
      )}

      {metaSocial?.fb?.description ? (
        <meta property="og:description" content={metaSocial?.fb?.description} />
      ) : (
        <meta property="og:description" content={metaDescription} />
      )}

      {metaSocial?.fb?.image?.url ? (
        <meta property="og:image" content={metaSocial?.fb?.image?.url} />
      ) : (
        <meta property="og:image" content={metaImage?.url} />
      )}

      {canonicalURL ? (
        <meta property="og:url" content={canonicalURL} />
      ) : (
        <meta property="og:url" content={`${window.location.href}`} />
      )}

      <meta property="og:type" content="website" />

      {/* Tag for TWITTER share */}
      <meta name="twitter:card" content="summary_large_image" />

      {metaSocial?.twitter?.title && (
        <meta name="twitter:title" content={metaSocial?.twitter?.title} />
      )}

      {metaSocial?.twitter?.description && (
        <meta name="twitter:description" content={metaSocial?.twitter?.description} />
      )}

      {metaSocial?.twitter?.image?.url ? (
        <meta name="twitter:image" content={metaSocial?.twitter?.image?.url} />
      ) : (
        metaImage?.url && <meta name="twitter:image" content={metaImage?.url} />
      )}

      {canonicalURL ? (
        <meta name="twitter:url" content={canonicalURL} />
      ) : (
        <meta name="twitter:url" content={`${window.location.href}`} />
      )}
      <script type="application/ld+json">
        {`
					{
						"@context": "https://schema.org",
						"@type": "Organization",
						"url": "${window.location.origin}",
						"name": "4i Tech",
						"description": "${seo?.metaDescription}",
						"logo": {
							"@type": "ImageObject",
							"url": "${CompanyLogo}"
						},
						"sameAs": [
							"https://www.facebook.com/4iTechnology",
							"https://x.com/4iTech_Dev",
							"https://www.linkedin.com/company/4i-tech"
						],					
						${mainEntityOfPage ? `"mainEntityOfPage": ${mainEntityOfPage},` : ' '}
						"foundingDate": "2010-01-01",
						"founder": {
							"@type": "Person",
							"name": "Corrado von Planta"
						},
						"address": [
							{
								"@type": "PostalAddress",
								"streetAddress": "3F, N. 2, Ruiguang Rd., Neihu Dist.",
								"addressLocality": "Taipei City",
								"addressRegion": "Taipei",
								"postalCode": "11491",
								"addressCountry": "TW"
							},
							{
								"@type": "PostalAddress",
								"streetAddress": "30F.-5, No. 236, Shizheng N. 2nd Rd., Xitun Dist.",
								"addressLocality": "Taichung City",
								"addressRegion": "Taichung",
								"addressCountry": "TW"
							},
							{
								"@type": "PostalAddress",
								"streetAddress": "19625 Glen Una Dr.",
								"addressLocality": "Saratoga, Bay Area",
								"addressRegion": "California",
								"postalCode": "95070",
								"addressCountry": "US"
							},
							{
								"@type": "PostalAddress",
								"streetAddress": "8 the Green, Suite A Dover",
								"addressLocality": "East Coast",
								"addressRegion": "Denver",
								"postalCode": "19901",
								"addressCountry": "US"
							},
							{
								"@type": "PostalAddress",
								"streetAddress": "Wiesenstrasse 7",
								"addressLocality": "Zurich",
								"addressRegion": "Zurich",
								"postalCode": "8008",
								"addressCountry": "CH"
							}
						],
						"contactPoint": {
							"@type": "ContactPoint",
							"telephone": "+886-2-2792-8451",
							"contactType": "customer support",
							"areaServed": "Worldwide",
							"availableLanguage": ["English", "Chinese", "German", "French"]
						},
						"hasOfferCatalog": {
							"@type": "OfferCatalog",
							"name": "Software Outsourcing Services",
							"itemListElement": [${
                solutionsList && solutionsList.length > 0
                  ? solutionsList.map(solution => {
                      return `
											{
												"@type": "Offer",
												"itemOffered": {
													"@type": "Service",
													"name": "${solution.label}",
													"url": "${window.location.origin}${solution.url}",
													"description": "${solution.description}"
												}
											}
										`;
                    })
                  : ''
              }]
						}
					}`}
      </script>
      {structuredData && <script type="application/ld+json">{structuredData}</script>}
      {breadCrumb && <script type="application/ld+json">{breadCrumb}</script>}
    </Helmet>
  );
};

export default SeoComponent;
