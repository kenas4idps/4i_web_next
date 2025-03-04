import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '@/utils/metadata';
import { api } from '@/api';
import Homepage from '@/components/pages/homepage/Homepage';
import { SeoFE } from '@/api/models/shared';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const response = await api.homePage.collection.getHomeData(locale);
  if ('content' in response) {
    const seo: SeoFE = response.content?.seo;
    return generateSeoMetadata(seo, locale);
  }
  return {};
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return <Homepage />;
}
