import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { validateEmail } from 'utils/validate';

import NewsletterSubscriberApi from 'api/NewsletterSubscriberApi';

import PageWrapper from 'components/common/pageWrapper';
import CustomInputText from 'components/common/customInputText';
import InlineErrorMessage from 'components/common/inlineErrorMessage';
import CustomCheckBox from 'components/common/customCheckBox/CustomCheckBox';

import { InputTextStyles } from 'components/common/customInputText/SharedTypes';
import { NewsletterSubscriberType } from 'types/SharedType';

import { transformCurlyFromLangStrToLink } from 'utils/langTransform';

import Logo from 'assets/icons/logoWhite.svg';
import MapPositionIcon from 'assets/icons/mapPosition.svg';
import PhoneIcon from 'assets/icons/phone.svg';

import './Footer.scss';

const Footer = () => {
  const navigate = useNavigate();
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
    {
      label: t('linkHome'),
      destination: '/',
    },
    {
      label: t('linkAboutUs'),
      destination: '/about-us',
    },
    {
      label: t('linkSolutions'),
      destination: '/solutions',
    },
    {
      label: t('linkCaseStudies'),
      destination: '/case-studies',
    },
    {
      label: t('linkInsights'),
      destination: '/insights',
    },
    {
      label: t('linkOurClients'),
      destination: '/our-clients',
    },
    {
      label: t('linkEvents'),
      destination: '/events',
    },
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

    let isNoError = isEmailValid && isConsentValid;

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
    <footer className="footer">
      <PageWrapper>
        <div className="content">
          <div className="info column">
            <img src={Logo} alt="company logo" className="logo" />

            <div className="description">{t('description')}</div>

            <div className="newsletter">
              <CustomInputText
                label={t('joinNewsLetter') as string}
                placeholder={t('joinNewsLetterPlaceholder') as string}
                styleInpt={InputTextStyles.SECONDARY}
                onChange={value => {
                  onInputChange(value);
                }}
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
                *{transformCurlyFromLangStrToLink(t('consentStatement'), '/privacy-policy', true)}
              </CustomCheckBox>

              <div className="subscription-status">
                <>
                  {subscriptionMessage && (
                    <p className="subscription-message">{subscriptionMessage}</p>
                  )}

                  {subscriptionError && <p className="subscription-error">{subscriptionError}</p>}
                </>
              </div>

              <InlineErrorMessage errorMessageList={[...emailError, ...consentError]} />
            </div>
          </div>

          <div className="links column">
            <div className="links-column-container">
              <div className="links-container">
                <div className="title">{t('linksTitle')}</div>

                <div className="links-list">
                  {linksList.map((link, key) => {
                    return (
                      <div key={key} onClick={() => navigate(link.destination)} className="link">
                        {link.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="social-media">
                <div className="title">{t('socialMedia')}</div>

                <div className="list-social-media">
                  <a
                    className="social-link"
                    href={t('linkedInLink') as string}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="text">in</div>
                  </a>

                  <a
                    className="social-link"
                    href={t('facebookLink') as string}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="text">fb</div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="offices column">
            <div className="office-container">
              <div className="title">{tOffices('swissOfficeTitle')}</div>

              <div
                className="adress with-icon"
                style={{ backgroundImage: `url(${MapPositionIcon})` }}
              >
                {tOffices('swissOfficeLocation')}
              </div>

              <div className="phone with-icon" style={{ backgroundImage: `url(${PhoneIcon})` }}>
                {tOffices('swissOfficePhone')}
              </div>
            </div>

            <div className="office-container">
              <div className="title">{tOffices('usOfficeTitle')}</div>

              <div
                className="adress with-icon"
                style={{ backgroundImage: `url(${MapPositionIcon})` }}
              >
                {tOffices('usOfficeLocation')}
              </div>

              <div
                className="adress with-icon"
                style={{ backgroundImage: `url(${MapPositionIcon})` }}
              >
                {tOffices('usOfficeLocation2')}
              </div>

              <div className="phone with-icon" style={{ backgroundImage: `url(${PhoneIcon})` }}>
                {tOffices('usOfficePhone')}
              </div>
            </div>
          </div>

          <div className="offices column">
            <div className="office-container">
              <div className="title">{tOffices('taiwanOfficeTitle')}</div>

              <div
                className="adress with-icon"
                style={{ backgroundImage: `url(${MapPositionIcon})` }}
              >
                {tOffices('taiwanOfficeLocation')}
              </div>

              <div className="phone with-icon" style={{ backgroundImage: `url(${PhoneIcon})` }}>
                {tOffices('taiwanOfficePhone')}
              </div>
            </div>

            <div className="office-container">
              <div className="title">{tOffices('taiwanOfficeTitle2')}</div>

              <div
                className="adress with-icon"
                style={{ backgroundImage: `url(${MapPositionIcon})` }}
              >
                {tOffices('taiwanOfficeLocation2')}
              </div>

              <div className="phone with-icon" style={{ backgroundImage: `url(${PhoneIcon})` }}>
                {tOffices('taiwanOfficePhone2')}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="right-reserved">{t('allRightReserved')}</div>

          <div className="other-links">
            <div className="link" onClick={() => navigate('/privacy-policy')}>
              {t('privacyPolicy')}
            </div>

            {/* requested to be hidden temporarily */}
            {/* <div
							className='link'
							onClick={()=> navigate('/terms-and-conditions')}>
							{t("thermsAndConditions")}
						</div> */}
          </div>
        </div>
      </PageWrapper>
    </footer>
  );
};

export default Footer;
