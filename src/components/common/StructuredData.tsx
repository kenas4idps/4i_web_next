import Script from 'next/script';
import { SeoFE, SolutionsListFE } from '@/api/models/shared';
import { generateStructuredData } from '@/utils/metadata';

interface StructuredDataProps {
  seo?: SeoFE;
  solutionsList?: SolutionsListFE[];
  locale: string;
  mainEntityOfPage?: string;
}

export default function StructuredData({
  seo,
  solutionsList,
  locale,
  mainEntityOfPage,
}: StructuredDataProps) {
  if (!seo || !solutionsList) return null;

  const structuredData = generateStructuredData(seo, solutionsList, locale, mainEntityOfPage);

  return (
    <>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
