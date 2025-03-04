import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import './LanguageSelector.scss';

interface langType {
  label: string;
  value: string;
  url: string;
}

const listLanguages = [
  {
    label: 'EN',
    value: 'en',
    url: 'https://4itech.io',
  },
  {
    label: 'DE',
    value: 'de',
    url: 'https://4itech.ch',
  },
  {
    label: 'FR',
    value: 'fr',
    url: 'https://4itech.co',
  },
  {
    label: '中文',
    value: 'zh',
    url: 'https://4idps.com.tw',
  },
  {
    label: '日本語',
    value: 'ja',
    url: 'https://4i-ai.com',
  },
];

const LanguageSelector = () => {
  const locale = useLocale();
  const router = useRouter();

  /* We want to redirect to different domain for some language and change the language for the other */
  const handleChangeLanguage = (newLanguage: langType) => {
    router.push(newLanguage.url);
  };

  /* We want to print the language without url only on the english domain */
  const shouldPrintLang = (lang: langType) => {
    if (locale === lang.value) {
      return false;
    }

    return true;
  };

  return (
    <div className="list-languages">
      {listLanguages.map((item, key) => {
        if (shouldPrintLang(item)) {
          return (
            <button key={key} className="language-item" onClick={() => handleChangeLanguage(item)}>
              {item.label}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
};

export default LanguageSelector;
