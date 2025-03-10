import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'manifest',
  });

  return {
    name: t('name'),
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'icon1.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'icon2.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    theme_color: '#101E33',
  };
}
