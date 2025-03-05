import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';
import fs from 'fs';
import path from 'path';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  const messages: { [key: string]: any } = {};

  const __dirname = path.join(process.cwd(), `messages/${locale}/`);
  const filenames = fs.readdirSync(__dirname);

  filenames.forEach((file: any) => {
    const name = file.split('.')[0];
    messages[name] = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
  });

  return {
    locale,
    messages,
  };
});
