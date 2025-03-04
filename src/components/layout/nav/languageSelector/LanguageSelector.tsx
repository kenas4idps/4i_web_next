import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import './LanguageSelector.scss';
import { useLocation } from 'react-router-dom';

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
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const location = useLocation();
  const currentPath = location.pathname;

  /* We want to redirect to different domain for some language and change the language for the other */
  const handleChangeLanguage = (newLanguage: langType) => {
    document.location.href = newLanguage.url;
  };

  /* We want to print the language without url only on the english domain */
  const shouldPrintLang = (lang: langType) => {
    if (currentLanguage === lang.value) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Helmet>
        {listLanguages.map(item => {
          return (
            <link
              key={item.value}
              rel="alternate"
              href={item.url + currentPath}
              hrefLang={item.value}
            />
          );
        })}
      </Helmet>

      <div className="list-languages">
        {listLanguages.map((item, key) => {
          if (shouldPrintLang(item)) {
            return (
              <button
                key={key}
                className="language-item"
                onClick={() => handleChangeLanguage(item)}
              >
                {item.label}
              </button>
            );
          }

          return null;
        })}
      </div>
    </>
  );
};

export default LanguageSelector;
