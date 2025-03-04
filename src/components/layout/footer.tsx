import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { validateEmail } from 'utils/validate';
import NewsletterSubscriberApi from 'api/NewsletterSubscriberApi';
import CustomInputText from 'components/common/customInputText';
import InlineErrorMessage from 'components/common/inlineErrorMessage';
import CustomCheckBox from 'components/common/customCheckBox/CustomCheckBox';
import { InputTextStyles } from 'components/common/customInputText/SharedTypes';
import { NewsletterSubscriberType } from 'types/SharedType';
import { transformCurlyFromLangStrToLink } from 'utils/langTransform';

const Footer = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation('footer');
  const { t: tOffices } = useTranslation('offices');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string[]>([]);
  const [consentError, setConsentError] = useState<string[]>([]);
  const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<string>('');
  const [subscriptionError, setSubscriptionError] = useState<string>('');

  const timeoutFunc = useRef<NodeJS.Timeout | null>(null);
  const newsletterSubscriberApi = NewsletterSubscriberApi();

  const linksList = [
    { label: t('linkHome'), destination: '/' },
    { label: t('linkAboutUs'), destination: '/about-us' },
    { label: t('linkSolutions'), destination: '/solutions' },
    { label: t('linkCaseStudies'), destination: '/case-studies' },
    { label: t('linkInsights'), destination: '/insights' },
    { label: t('linkOurClients'), destination: '/our-clients' },
    { label: t('linkEvents'), destination: '/events' },
  ];

  const checkEmail = (value: string) => {
    let isNoError = true;
    setEmailError([]);

    if (value === '') {
      setEmailError(errors => [...errors, t('emailEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateEmail(value)) {
      setEmailError(errors => [...errors, t('emailNoMatchErrorMessage')]);
      isNoError = false;
    }

    return isNoError;
  };

  const checkConsent = (value: boolean) => {
    let isNoError = true;
    setConsentError([]);
    if (!value) {
      setConsentError(errors => [...errors, t('noConsentError')]);
      isNoError = false;
    }
    return isNoError;
  };

  const handleSubscription = async (userEmail: string) => {
    setSubscriptionError('');
    setSubscriptionMessage('');

    const isEmailValid = checkEmail(email);
    const isConsentValid = checkConsent(isConsentChecked);
    const isNoError = isEmailValid && isConsentValid;

    if (isNoError) {
      try {
        const subscriber = await newsletterSubscriberApi.getSubscriberinfo(
          i18n.language,
          userEmail,
        );
        if (subscriber?.length === 0) {
          createSubscriber();
        } else {
          setEmail('');
          setIsConsentChecked(false);
          if (subscriber[0]?.attributes?.confirmed) {
            setSubscriptionMessage(`${t('subscribed')}`);
          } else {
            await newsletterSubscriberApi?.updateSubscriberConfimationStatus(
              subscriber[0]?.id,
              false,
            );
            setSubscriptionMessage(`${t('subscriptionMessage')}`);
          }
        }
      } catch (error) {
        setSubscriptionError(`${t('subscriptionError')}`);
      }
    }
  };

  const createSubscriber = async () => {
    try {
      const url = window.location.origin;
      const formData: NewsletterSubscriberType = {
        user_email: email,
        locale: i18n.language,
        request_base_url: url,
      };

      const result = await newsletterSubscriberApi?.createSubscriberEntry(formData);
      if ((await result) === 200) {
        setEmail('');
        setIsConsentChecked(false);
        setSubscriptionMessage(`${t('subscriptionMessage')}`);
      } else if (result.code === 'ERR_NETWORK') {
        setSubscriptionError(`${t('subscriptionError')}`);
      }
    } catch (error) {
      setSubscriptionError(`${t('subscriptionError')}`);
    }
  };

  const onInputChange = (value: string) => {
    setEmail(value);
    if (timeoutFunc.current) {
      clearTimeout(timeoutFunc.current);
    }
    timeoutFunc.current = setTimeout(() => {
      checkEmail(value);
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timeoutFunc.current) {
        clearTimeout(timeoutFunc.current);
      }
    };
  }, []);

  return (
    <footer className="bg-primary text-secondary py-16">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full px-4 md:w-1/4">
          <img src="/assets/icons/logoWhite.svg" alt="company logo" className="w-36 pb-4" />
          <div className="pb-12">{t('description')}</div>
          <div className="newsletter">
            <CustomInputText
              label={t('joinNewsLetter') as string}
              placeholder={t('joinNewsLetterPlaceholder') as string}
              styleInpt={InputTextStyles.SECONDARY}
              onChange={onInputChange}
              value={email}
              withBtn={true}
              onBtnClick={handleSubscription}
              errorsList={emailError}
            />
            <CustomCheckBox
              identifier="footer-consent"
              onChange={setIsConsentChecked}
              value={isConsentChecked}
            >
              {transformCurlyFromLangStrToLink(t('consentStatement'), '/privacy-policy', true)}
            </CustomCheckBox>
            <div className="subscription-status">
              {subscriptionMessage && <p className="text-green-500">{subscriptionMessage}</p>}
              {subscriptionError && <p className="text-red-500">{subscriptionError}</p>}
            </div>
            <InlineErrorMessage errorMessageList={[...emailError, ...consentError]} />
          </div>
        </div>

        <div className="w-full px-4 md:w-1/4">
          <div className="title">{t('linksTitle')}</div>
          <div className="links-list">
            {linksList.map((link, key) => (
              <div
                key={key}
                onClick={() => router.push(link.destination)}
                className="cursor-pointer pb-2"
              >
                {link.label}
              </div>
            ))}
          </div>
          <div className="social-media mt-4">
            <div className="title">{t('socialMedia')}</div>
            <div className="flex space-x-4">
              <a
                className="text-primary"
                href={t('linkedInLink') as string}
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                className="text-primary"
                href={t('facebookLink') as string}
                target="_blank"
                rel="noreferrer"
              >
                fb
              </a>
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:w-1/4">
          <div className="office-container">
            <div className="title">{tOffices('swissOfficeTitle')}</div>
            <div
              className="address flex items-center pb-2"
              style={{ backgroundImage: `url(/assets/icons/mapPosition.svg)` }}
            >
              {tOffices('swissOfficeLocation')}
            </div>
            <div
              className="phone flex items-center"
              style={{ backgroundImage: `url(/assets/icons/phone.svg)` }}
            >
              {tOffices('swissOfficePhone')}
            </div>
          </div>
          {/* Repeat for other offices */}
        </div>
      </div>

      <div className="footer-bottom mt-8 flex justify-between opacity-50">
        <div className="right-reserved">{t('allRightReserved')}</div>
        <div className="other-links flex">
          <div className="link cursor-pointer pr-6" onClick={() => router.push('/privacy-policy')}>
            {t('privacyPolicy')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
