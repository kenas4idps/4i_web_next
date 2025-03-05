import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Script from 'next/script';
import ReactGA from 'react-ga4';

import CustomButton from '@/components/common/customButton';

import './CookiePopUp.scss';
import Link from 'next/link';

const CookiePopUp = () => {
  const t = useTranslations('cookiePolicy');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isCookieAllowed, SetIsCookieAllowed] = useState<boolean>(false);
  const [chatWidgetURL, setChatWidgetURL] = useState<string>('');

  const getCookieValue = (cookieName: string) => {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return '';
  };

  const handleCookie = (value?: string) => {
    const userConfig = getCookieValue('userCookieConfig');

    if (userConfig === 'Accept' || value === 'Accept') {
      ReactGA.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });

      setIsOpen(false);
      SetIsCookieAllowed(true);

      if (userConfig === '') {
        document.cookie = 'userCookieConfig = Accept';
      }
    } else if (userConfig === 'Deny' || value === 'Deny') {
      setIsOpen(false);
      SetIsCookieAllowed(false);

      if (userConfig === '') {
        document.cookie = 'userCookieConfig = Deny';
      }
    }
  };

  useEffect(() => {
    const en = 'https://embed.tawk.to/636df5ccdaff0e1306d6dc48/1ghiogaa6';
    const zh = 'https://embed.tawk.to/636df5ccdaff0e1306d6dc48/1gic5o8eo';
    const fr = 'https://embed.tawk.to/639030aeb0d6371309d301de/1gjllijlg';
    const de = 'https://embed.tawk.to/639030aeb0d6371309d301de/1gjlmhhvt';

    switch (locale) {
      case 'en':
        setChatWidgetURL(en);
        break;
      case 'zh':
        setChatWidgetURL(zh);
        break;
      case 'fr':
        setChatWidgetURL(fr);
        break;
      case 'de':
        setChatWidgetURL(de);
        break;
      default:
        break;
    }
  }, [locale]);

  useEffect(() => {
    const userConfig = getCookieValue('userCookieConfig');
    handleCookie(userConfig);
    // eslint-disable-next-line
  }, [isOpen, isCookieAllowed]);

  return (
    <>
      {isCookieAllowed && (
        <Script id="tawk-script" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='${chatWidgetURL}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      )}

      {isOpen && (
        <div className={`cookie-popup-container`}>
          <div className="cookie-pop-up-main">
            <p className="statement">
              {t.rich('popUpText', {
                link: chunks => (
                  <Link href="/cookie-policy" target="_blank">
                    {chunks}
                  </Link>
                ),
              })}
            </p>

            <div className="buttons-container">
              <div>
                <CustomButton
                  onClickBtn={() => handleCookie('Accept')}
                  className="consent-popup-button accept"
                >
                  {t('accept')}
                </CustomButton>
              </div>
              <div>
                <CustomButton
                  onClickBtn={() => handleCookie('Deny')}
                  className="consent-popup-button deny"
                >
                  {t('deny')}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopUp;
