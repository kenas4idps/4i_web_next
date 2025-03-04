import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import './globals.css';
import '@/styles/main.scss';

import { NotificationProvider } from '@/providers/notificationProvider/NotificationProvider';
import { HomeDataProvider } from '@/providers/homeDataProvider/HomeDataProvider';
import { NumbersDataProvider } from '@/providers/numberDataProvider/NumberDataProvider';
import { ClientIndustryListProvider } from '@/providers/clientsTypeProvider/ClientsTypeProvider';
import { TestimonialProvider } from '@/providers/testimonialDataProvider/testimonialProvider';
import { SolutionsListProvider } from '@/providers/solutionsListProvider/SolutionsListProvider';

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

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <NotificationProvider>
            <HomeDataProvider>
              <NumbersDataProvider>
                <ClientIndustryListProvider>
                  <TestimonialProvider>
                    <SolutionsListProvider>{children}</SolutionsListProvider>
                  </TestimonialProvider>
                </ClientIndustryListProvider>
              </NumbersDataProvider>
            </HomeDataProvider>
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
