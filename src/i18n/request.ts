import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';
import fs from 'fs';
import path from 'path';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  const messages: { [key: string]: any } = {};

  // Use path.join to create the correct path for both development and production
  const messagesDir = path.join(process.cwd(), 'messages', locale);

  try {
    const filenames = fs.readdirSync(messagesDir);

    filenames.forEach((file: string) => {
      const name = file.split('.')[0];
      const fullPath = path.join(messagesDir, file);
      messages[name] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    });
  } catch (error) {
    console.error(`Error reading messages for locale ${locale}:`, error);
    // Return empty messages object if directory doesn't exist
    return {
      locale,
      messages: {},
    };
  }

  return {
    locale,
    messages,
  };
});
