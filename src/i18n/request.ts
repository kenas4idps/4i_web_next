import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';
import fs from 'fs';
import path from 'path';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  const messages: { [key: string]: any } = {};

  const __dirname = `messages/${locale}`;
  const filenames = fs.readdirSync(__dirname);

  filenames.forEach((file: any) => {
    const name = file.split('.')[0];
    const fullPath = path.join(process.cwd(), __dirname, file);
    messages[name] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  });

  return {
    locale,
    messages,
  };
});
