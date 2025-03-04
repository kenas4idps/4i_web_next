'use client';

import Script from 'next/script';
import { SeoFE } from '@/api/models/shared';
import { generateStructuredData } from '@/utils/metadata';

interface StructuredDataProps {
  seo: SeoFE;
  solutionsList: any[];
  locale: string;
  mainEntityOfPage?: string;
}

export default function StructuredData({
  seo,
  solutionsList,
  locale,
  mainEntityOfPage,
}: StructuredDataProps) {
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
