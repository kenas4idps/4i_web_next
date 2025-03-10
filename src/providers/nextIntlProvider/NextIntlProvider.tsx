'use client';

import { AbstractIntlMessages, IntlErrorCode, NextIntlClientProvider } from 'next-intl';

function onMessageError(error: { code: IntlErrorCode }) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  } else {
    // Other errors indicate a bug in the app and should be reported
  }
}
export default function NextIntlProvider({
  locale,
  children,
  messages,
}: {
  locale: string;
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider onError={onMessageError} messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
