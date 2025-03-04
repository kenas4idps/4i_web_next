import { defaultLocale, locales } from '@/i18n/config';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      de: '/pfadnamen',
      fr: '/noms-de-chemin',
      jp: '/パスネーム',
      zh: '/路径名称',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
