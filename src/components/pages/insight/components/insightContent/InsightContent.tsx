'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { validateEmail, validateName } from '@/utils/validate';

import BlurCircle from '@/components/common/blurCircle';
import PageWrapper from '@/components/common/pageWrapper';
import CustomDropDown from '@/components/common/customDropDown';
import CustomInputText from '@/components/common/customInputText';
import CustomButton from '@/components/common/customButton';
import CustomCheckBox from '@/components/common/customCheckBox/CustomCheckBox';
import InlineErrorMessage from '@/components/common/inlineErrorMessage';

import { DropDownStyles } from '@/components/common/customDropDown/SharedTypes';
import { InputTextStyles } from '@/components/common/customInputText/SharedTypes';
import { NewsletterSubscriberType } from '@/api/models/shared';

import './InsightContent.scss';
import { Link } from '@/i18n/navigation';
import { api } from '@/api';

interface Props {
  children: ReactNode;
  tableOfContents: string[];
}

const InsightContent = ({ children, tableOfContents }: Props) => {
  const t = useTranslations('insights');
  const locale = useLocale();

  const [title, setTitle] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [firstNameError, setFirstNameError] = useState<string[]>([]);
  const [surnameError, setSurnameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [consentError, setConsentError] = useState<string[]>([]);
  const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<string>('');
  const [subscriptionError, setSubscriptionError] = useState<string>('');

  const timeoutFunc = useRef<NodeJS.Timeout | null>(null);

  const titleList = [
    {
      label: t('subscribeTitleOption1'),
      value: 'Mr',
    },
    {
      label: t('subscribeTitleOption2'),
      value: 'Ms',
    },
  ];

  const checkFirstName = (value: string) => {
    let isNoError = true;

    setFirstNameError([]);
    if (value === '') {
      setFirstNameError(errors => [...errors, t('subscribeFirstNameEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateName(value)) {
      setFirstNameError(errors => [...errors, t('subscribeFirstNameInvalidErrorMessage')]);
      isNoError = false;
    }
    return isNoError;
  };

  const checkSurname = (value: string) => {
    let isNoError = true;

    setSurnameError([]);
    if (value === '') {
      setSurnameError(errors => [...errors, t('subscribeSurnameEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateName(value)) {
      setSurnameError(errors => [...errors, t('subscribeSurnameEmptyErrorMessage')]);
      isNoError = false;
    }
    return isNoError;
  };

  const checkEmail = (value: string) => {
    let isNoError = true;

    setEmailError([]);
    if (value === '') {
      setEmailError(errors => [...errors, t('subscribeMailEmptyError')]);
      isNoError = false;
    } else if (validateEmail(value)) {
      setEmailError(errors => [...errors, t('subscribeMailInvalidError')]);
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

  const submitForm = async () => {
    setSubscriptionError('');
    setSubscriptionMessage('');

    const isEmailValid = checkEmail(email);
    const isSurnameValid = checkSurname(surname);
    const isFirstNameValid = checkFirstName(firstName);
    const isConsentValid = checkConsent(isConsentChecked);

    const isNoError = isFirstNameValid && isSurnameValid && isEmailValid && isConsentValid;

    if (isNoError) {
      try {
        const response = await api.newsletterSubscriber.collection.getSubscriberinfo(locale, email);

        if ('content' in response) {
          const subscriber = response.content;

          if (subscriber?.length === 0) {
            const url = window.location.origin;

            const formData: NewsletterSubscriberType = {
              title: title || '',
              first_name: firstName,
              surname: surname,
              user_email: email,
              locale: locale,
              request_base_url: url,
            };

            const result =
              await api.newsletterSubscriber.collection.createSubscriberEntry(formData);

            if ('content' in result) {
              if (result.content.status === 200) {
                setSubscriptionMessage(`${t('subscriptionMessage')}`);
                setTitle(null);
                setFirstName('');
                setSurname('');
                setEmail('');
                setIsConsentChecked(false);
              } else if (result.content.code === 'ERR_NETWORK') {
                setSubscriptionError(`${t('subscriptionError')}`);
              }
            }
          } else {
            setTitle(null);
            setFirstName('');
            setSurname('');
            setEmail('');
            setIsConsentChecked(false);
            if (subscriber[0]?.attributes?.confirmed) {
              setSubscriptionMessage(`${t('subscribed')}`);
            } else {
              await api.newsletterSubscriber.collection.updateSubscriberConfimationStatus(
                subscriber[0]?.id,
                false,
              );
              setSubscriptionMessage(`${t('subscriptionMessage')}`);
            }
          }
        }
      } catch (error) {
        console.log(error);
        setSubscriptionError(`${t('subscriptionError')}`);
      }
    }
  };

  const onInputChange = (value: string, id: string) => {
    switch (id) {
      case 'firstName':
        setFirstName(value);
        startTimeOut(checkFirstName, value);
        break;
      case 'surname':
        setSurname(value);
        startTimeOut(checkSurname, value);
        break;
      case 'email':
        setEmail(value);
        startTimeOut(checkEmail, value);
        break;
      default:
        break;
    }
  };

  const startTimeOut = (checkFunc: any, value: string) => {
    if (timeoutFunc.current) {
      clearTimeout(timeoutFunc.current);
    }

    timeoutFunc.current = setTimeout(() => {
      checkFunc(value);
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
    <PageWrapper className="insight-content">
      <div className="insight-content-container">
        <BlurCircle className="blur-circle-top-container" size="922px" />

        <BlurCircle className="blur-circle-bottom-container" size="922px" />

        <div className="content-super-container">
          <div className="content-container">{children}</div>
        </div>
        {/* <ul className="table-of-contents">
					{tableOfContents.map(content => {
						return (
							<li>
								<a href={`#${content}`}>{content}</a>
							</li>
						)
					})}
				</ul> */}
        <div className="subscribe-form">
          <div className="subscribe-form-container">
            <div className="description">{t('subscribeDescription')}</div>

            <div className="form">
              <CustomDropDown
                placeholder={t('subscribeTitlePlaceholder') || ''}
                options={titleList}
                dropDownStyle={DropDownStyles.QUATERNARY}
                onSelect={setTitle}
                value={title}
              />

              <CustomInputText
                placeholder={t('subscribeFirstNamePlaceholder') || ''}
                styleInpt={InputTextStyles.QUATERNARY}
                errorsList={firstNameError}
                onChange={value => {
                  onInputChange(value, 'firstName');
                }}
                isRequired={true}
                value={firstName}
              />

              <CustomInputText
                placeholder={t('subscribeSurnamePlaceholder') || ''}
                styleInpt={InputTextStyles.QUATERNARY}
                onChange={value => {
                  onInputChange(value, 'surname');
                }}
                errorsList={surnameError}
                isRequired={true}
                value={surname}
              />

              <CustomInputText
                placeholder={t('subscribeMailPlaceholder') || ''}
                styleInpt={InputTextStyles.QUATERNARY}
                onChange={value => {
                  onInputChange(value, 'email');
                }}
                errorsList={emailError}
                isRequired={true}
                value={email}
              />

              <CustomCheckBox
                identifier="insight-consent"
                onChange={setIsConsentChecked}
                value={isConsentChecked}
              >
                *
                {t.rich('consentStatement', {
                  link: chunks => (
                    <Link href="/privacy-policy" target="_blank">
                      {chunks}
                    </Link>
                  ),
                })}
              </CustomCheckBox>

              <InlineErrorMessage
                errorMessageList={[
                  ...firstNameError,
                  ...surnameError,
                  ...emailError,
                  ...consentError,
                ]}
              />

              <div className="subscription-status">
                <>
                  {subscriptionMessage && (
                    <p className="subscription-message">{subscriptionMessage}</p>
                  )}

                  {subscriptionError && <p className="subscription-error">{subscriptionError}</p>}
                </>
              </div>

              <CustomButton onClick={() => submitForm()} className="subscribe-btn">
                {t('subscribeBtn')}
              </CustomButton>
            </div>

            <div className="privacy-statement">{t('subscribePrivacyStatement')}</div>

            <div className="termes">{t('subscribeTerme')}</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default InsightContent;
