// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

import { Metadata } from 'next';
import Script from 'next/script';
import PageNotFound from '@/components/pages/page404/components/pageNotFound';
import '@/styles/main.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '404 - Page Not Found',
    description: 'Page not found.',
    robots: 'noindex',
  };
}

export default async function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
        <Script id="404-script">{`document.status = 404`}</Script>
        <PageNotFound />
      </body>
    </html>
  );
}
