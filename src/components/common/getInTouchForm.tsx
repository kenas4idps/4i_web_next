'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { validateEmail, validateName, validatePhoneNumber } from '@/utils/validate';

import CustomInputText from '@/components/common/customInputText';
import CustomDropDown from '@/components/common/customDropDown';
import CustomTextArea from '@/components/common/customTextArea';
import CustomButton from '@/components/common/customButton';
import InlineErrorMessage from '@/components/common/inlineErrorMessage';
import CustomCheckBox from '@/components/common/customCheckBox';
import CustomInputPhone from '@/components/common/customInputPhone';
import { api } from '@/api';
import Script from 'next/script';
import Link from 'next/link';

export interface GetInTouchPayloadType {
  full_name: string;
  email_address: string;
  phone_number: string;
  company?: string;
  topic: string;
  message: string;
  locale: string;
}

const GetInTouchForm = () => {
  const t = useTranslations('getInTouch');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const listTopic = [
    {
      label: t('inputTopicChoice1'),
      value: 'quote_request',
    },
    {
      label: t('inputTopicChoice2'),
      value: 'look_for_partner',
    },
    {
      label: t('inputTopicChoice3'),
      value: 'apply_job',
    },
    {
      label: t('inputTopicChoice4'),
      value: 'other',
    },
  ];

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);

  const [fullNameError, setFullNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [phoneNumberError, setPhoneNumberError] = useState<string[]>([]);
  const [topicError, setTopicError] = useState<string[]>([]);
  const [messageError, setMessageError] = useState<string[]>([]);
  const [consentError, setConsentError] = useState<string[]>([]);

  const timeoutFunc = useRef<NodeJS.Timeout | null>(null);

  const checkFullName = (value: string) => {
    let isNoError = true;
    setFullNameError([]);

    if (value === '') {
      setFullNameError(errors => [...errors, t('fullNameEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateName(value)) {
      setFullNameError(errors => [...errors, t('fullNameInvalidErrorMessage')]);
      isNoError = false;
    }

    return isNoError;
  };

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

  const checkPhoneNumber = (value: string) => {
    let isNoError = true;
    setPhoneNumberError([]);

    if (value === '') {
      setPhoneNumberError(errors => [...errors, t('phoneNumberEmptyErrorMessage')]);
      isNoError = false;
    } else if (validatePhoneNumber(value)) {
      setPhoneNumberError(errors => [...errors, t('phoneNumberInvalidErrorMessage')]);
      isNoError = false;
    }

    return isNoError;
  };

  const checkTopic = (value: string) => {
    let isNoError = true;
    setTopicError([]);
    if (value === '') {
      setTopicError(errors => [...errors, t('topicNeedSelectErrorMessage')]);
      isNoError = false;
    }

    return isNoError;
  };

  const checkMessage = (value: string) => {
    let isNoError = true;

    setMessageError([]);
    if (value === '') {
      setMessageError(errors => [...errors, t('messageEmptyErrorMessage')]);
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

  const gtag_report_conversion = (url: string) => {
    const callback = function () {
      if (typeof url !== 'undefined') {
        router.push(url);
      }
    };
    window.gtag('event', 'conversion', {
      send_to: `${process.env.REACT_APP_GOOGLE_FORM_TRACK_ID}/${process.env.REACT_APP_GOOGLE_FORM_TRACK_SUB_ID}`,
      event_callback: callback,
    });
    return false;
  };

  const onSend = async () => {
    const isEmailValid = checkEmail(email);
    const isTopicValid = checkTopic(topic);
    const isMessageValid = checkMessage(message);
    const isFullNameValid = checkFullName(fullName);
    const isConsentValid = checkConsent(isConsentChecked);
    const isPhoneNumberValid = checkPhoneNumber(phoneNumber);

    const isNoError =
      isFullNameValid &&
      isEmailValid &&
      isPhoneNumberValid &&
      isTopicValid &&
      isMessageValid &&
      isConsentValid;

    if (isNoError) {
      const formData: GetInTouchPayloadType = {
        full_name: fullName,
        email_address: email,
        phone_number: phoneNumber,
        company: company,
        topic: topic,
        message: message,
        locale: locale,
      };

      try {
        const response = await api.getInTouchForm.collection.submitGetInTouchForm(formData);
        if ('content' in response && response.content === 200) {
          if (locale === 'en' || locale === 'de') {
            gtag_report_conversion(pathname);
          }
          router.push('/contact-us/inquiry');
        } else {
          console.error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const onInputChange = (value: string, id: string) => {
    switch (id) {
      case 'fullName':
        setFullName(value);
        startTimeOut(checkFullName, value);
        break;
      case 'email':
        setEmail(value);
        startTimeOut(checkEmail, value);
        break;
      case 'phone-number':
        setPhoneNumber(value);
        startTimeOut(checkPhoneNumber, value);
        break;
      case 'topic':
        setTopic(value);
        startTimeOut(checkTopic, value);
        break;
      case 'message':
        setMessage(value);
        startTimeOut(checkMessage, value);
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
    <>
      <Script id="google-analytics-dataLayer">
        {`// Define dataLayer and the gtag function.
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Set default consent to 'denied' as a placeholder
          // Determine actual values based on your own requirements
          gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
          });`}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GOOGLE_FORM_TRACK_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics-config">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.REACT_APP_GOOGLE_FORM_TRACK_ID}');
        `}
      </Script>

      <Script id="google-analytics-conversion">
        {`function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': '${process.env.REACT_APP_GOOGLE_FORM_TRACK_ID}/${process.env.REACT_APP_GOOGLE_FORM_TRACK_SUB_ID}',
                'event_callback': callback
            });
            return false;
          }`}
      </Script>

      <div className="get-in-touch-form-container">
        <div>
          <CustomInputText
            label={t('inputFullNameLabel') as string}
            placeholder={t('inputFullNamePlaceholder') as string}
            onChange={value => {
              onInputChange(value, 'fullName');
            }}
            errorsList={fullNameError}
            isRequired={true}
          />

          <CustomInputText
            label={t('inputEmailLabel') as string}
            placeholder={t('inputEmailPlaceholder') as string}
            onChange={value => {
              onInputChange(value, 'email');
            }}
            errorsList={emailError}
            isRequired={true}
          />

          <CustomInputPhone
            label={t('inputPhoneNumberLabel') as string}
            placeholder={t('inputPhoneNumberPlaceholder') as string}
            onChange={value => {
              onInputChange(value, 'phone-number');
            }}
            errorsList={phoneNumberError}
            isRequired={true}
          />

          <CustomInputText
            label={t('inputCompanyLabel') as string}
            placeholder={t('inputCompanyPlaceholder') as string}
            onChange={setCompany}
          />

          <CustomDropDown
            label={t('inputTopicLabel') as string}
            options={listTopic}
            placeholder={t('inputTopicPlaceholder') as string}
            onSelect={value => {
              onInputChange(value, 'topic');
            }}
            errorsList={topicError}
            isRequired={true}
          />

          <CustomTextArea
            label={t('inputMessagesLabel') as string}
            placeholder={t('inputMessagesPlaceholder') as string}
            onChange={value => {
              onInputChange(value, 'message');
            }}
            errorsList={messageError}
            isRequired={true}
          />

          <CustomCheckBox identifier="getInTouch-consent" onChange={setIsConsentChecked}>
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
              ...fullNameError,
              ...emailError,
              ...phoneNumberError,
              ...topicError,
              ...messageError,
              ...consentError,
            ]}
          />

          <CustomButton onClickBtn={onSend} className="validation-btn">
            {t('formBtnLabel')}
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default GetInTouchForm;
