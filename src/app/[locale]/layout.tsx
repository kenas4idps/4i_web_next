import type { Metadata, ResolvingMetadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextIntlProvider from '@/providers/nextIntlProvider/NextIntlProvider';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import '@/styles/main.scss';

import { NotificationProvider } from '@/providers/notificationProvider/NotificationProvider';
import { ClientIndustryListProvider } from '@/providers/clientsTypeProvider/ClientsTypeProvider';
import { TestimonialProvider } from '@/providers/testimonialDataProvider/testimonialProvider';
import Footer from '@/components/layout/footer';
import QueryClientProvider from '@/app/QueryClientProvider';
import CookiePopUp from '@/components/layout/cookiePopUp';
import ScrollToTopButton from '@/components/layout/ScrollToTopButton/ScrollToTopButton';
import ScrollToTop from '@/app/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const listLanguages = [
  {
    value: 'en',
    url: 'https://4itech.io',
  },
  {
    value: 'de',
    url: 'https://4itech.ch',
  },
  {
    value: 'fr',
    url: 'https://4itech.co',
  },
  {
    value: 'zh',
    url: 'https://4idps.com.tw',
  },
  {
    value: 'ja',
    url: 'https://4i-ai.com',
  },
];

type Params = Promise<{ locale: string }>;

interface LayoutProps {
  children: React.ReactNode;
  params: Params;
}

export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const alternates: Record<string, string> = {};

  for (const lang of listLanguages) {
    alternates[lang.value] = lang.url;
  }

  return {
    alternates: {
      languages: alternates,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps): Promise<React.ReactElement> {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <meta name="seobility" content="5dff6958ae299379e46340a042cd0999" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryClientProvider>
          <NextIntlProvider locale={locale} messages={messages}>
            <NotificationProvider>
              <ClientIndustryListProvider>
                <TestimonialProvider>
                  <div className="App">
                    <CookiePopUp />
                    <ScrollToTop />
                    {children}
                    <Footer />
                    <ScrollToTopButton />
                  </div>
                </TestimonialProvider>
              </ClientIndustryListProvider>
            </NotificationProvider>
          </NextIntlProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
