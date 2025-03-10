'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';

import { validateEmail, validateName } from '@/utils/validate';

import { WhitePaperFormPayloadType } from '../../WhitePaperTypes';

import PageWrapper from '@/components/common/pageWrapper';
import CustomInputText from '@/components/common/customInputText';
import CustomButton from '@/components/common/customButton';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import { InputTextStyles } from '@/components/common/customInputText/SharedTypes';
import { DoubleCircleOverlayStyles } from '@/components/common/doubleCircleOverlay/SharedTypes';
import { BlurCircleStyles } from '@/components/common/blurCircle/SharedTypes';
import InlineErrorMessage from '@/components/common/inlineErrorMessage/InlineErrorMessage';

import './WhitePaperForm.scss';
import CustomDropDown from '@/components/common/customDropDown';
import { countryList } from '@/utils/CountryList';
import { DropDownStyles } from '@/components/common/customDropDown/SharedTypes';
import CustomCheckBox from '@/components/common/customCheckBox/CustomCheckBox';
import { useParams } from 'next/navigation';
import { api } from '@/api';

interface Props {
  tag: string;
  title: string;
  description: string;
}

interface OptionType {
  label: string;
  value: string;
}

const WhitePaperForm = ({ tag, title, description }: Props) => {
  const t = useTranslations('whitePaper');
  const locale = useLocale();
  const router = useRouter();
  const { id } = useParams();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [countries, setCountries] = useState<OptionType[]>(countryList);

  const [isAgreedToReceiveWhitePaper, setIsAgreedToReceiveWhitePaper] = useState<boolean>(false);
  const [isAgreedToReceiveNewsLetter, setIsAgreedToReceiveNewsLetter] = useState<boolean>(false);
  const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);

  const [firstNameError, setFirstNameError] = useState<string[]>([]);
  const [lastNameError, setLastNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);
  const [consentError, setConsentError] = useState<string[]>([]);

  const timeoutFunc = useRef<NodeJS.Timeout | null>(null);

  const checkFirstName = (value: string) => {
    let isNoError = true;

    setFirstNameError([]);
    if (value === '') {
      setFirstNameError(errors => [...errors, t('firstNameEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateName(value)) {
      setFirstNameError(errors => [...errors, t('firstNameInvalidErrorMessage')]);
      isNoError = false;
    }
    return isNoError;
  };

  const checkLastName = (value: string) => {
    let isNoError = true;

    setLastNameError([]);
    if (value === '') {
      setLastNameError(errors => [...errors, t('lastNameEmptyErrorMessage')]);
      isNoError = false;
    } else if (validateName(value)) {
      setLastNameError(errors => [...errors, t('lastNameInvalidErrorMessage')]);
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
      setEmailError(errors => [...errors, t('emailInvalidErrorMessage')]);
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

  const handleInputChange = (inputValue: string) => {
    if (!inputValue || inputValue === '') {
      setCountries(countryList);
    } else {
      const capitalized = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      const filteredCountries = countryList.filter(country =>
        country?.label?.startsWith(capitalized),
      );
      setCountries(filteredCountries);
    }
  };

  const onFormSumbit = async () => {
    const isEmailValid = checkEmail(email);
    const isLastNameValid = checkLastName(lastName);
    const isFirstnameValid = checkFirstName(firstName);
    const isConsentValid = checkConsent(isConsentChecked);

    const isNoError = isEmailValid && isLastNameValid && isFirstnameValid && isConsentValid;

    if (isNoError) {
      const formData: WhitePaperFormPayloadType = {
        white_paper_type: `${id}`,
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        company: company,
        job_title: job,
        country: country,
        whitepaper_consent: isAgreedToReceiveWhitePaper,
        newsletter_consent: isAgreedToReceiveNewsLetter,
        locale: locale,
      };

      try {
        const response = await api.whitePaperForm.collection.submitWhitePaperForm(formData);

        if ('content' in response) {
          const responseData = response.content;

          if (responseData.status === 200) {
            router.push('/white-paper/inquiry');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onInputChange = (value: string, id: string) => {
    switch (id) {
      case 'firstName':
        setFirstName(value);
        startTimeOut(checkFirstName, value);
        break;
      case 'lastName':
        setLastName(value);
        startTimeOut(checkLastName, value);
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
    <div className="white-paper-form">
      <BlurCircle
        className="blur-circle-top-container"
        size="980px"
        style={BlurCircleStyles.GREY}
      />

      <BlurCircle
        className="blur-circle-bottom-container"
        size="980px"
        style={BlurCircleStyles.GREY}
      />

      <DoubleCircleOverlay
        size="1363px"
        className="double-circle-container"
        style={DoubleCircleOverlayStyles.GREY}
      />

      <PageWrapper className="white-paper-form-super-container">
        <div className="introduction">
          <div className="introduction-container">
            <div className="tag">{tag}</div>

            <h1 className="title">{title}</h1>

            <div className="description">{description}</div>
          </div>
        </div>

        <div className="white-paper-form-container">
          <div className="form-description">{t('description')}</div>

          <div className="form">
            <div className="form-input-list">
              <div className="form-item">
                <CustomInputText
                  label={t('firstName') as string}
                  placeholder={t('firstNamePlaceHolder') as string}
                  styleInpt={InputTextStyles.SECONDARY}
                  onChange={value => {
                    onInputChange(value, 'firstName');
                  }}
                  errorsList={firstNameError}
                  isRequired={true}
                />
              </div>

              <div className="form-item">
                <CustomInputText
                  label={t('lastName') as string}
                  placeholder={t('lastNamePlaceHolder') as string}
                  styleInpt={InputTextStyles.SECONDARY}
                  onChange={value => {
                    onInputChange(value, 'lastName');
                  }}
                  errorsList={lastNameError}
                  isRequired={true}
                />
              </div>

              <div className="form-item">
                <CustomInputText
                  label={t('email') as string}
                  placeholder={t('emailPlaceHolder') as string}
                  styleInpt={InputTextStyles.SECONDARY}
                  onChange={value => {
                    onInputChange(value, 'email');
                  }}
                  errorsList={emailError}
                  isRequired={true}
                />
              </div>

              <div className="form-item">
                <CustomInputText
                  label={t('companyName') as string}
                  placeholder={t('companyNamePlaceholder') as string}
                  styleInpt={InputTextStyles.SECONDARY}
                  onChange={setCompany}
                />
              </div>

              <div className="form-item">
                <CustomInputText
                  label={t('jobTitle') as string}
                  placeholder={t('jobTitlePlaceholder') as string}
                  styleInpt={InputTextStyles.SECONDARY}
                  onChange={setJob}
                />
              </div>

              <div className="form-item">
                <CustomDropDown
                  label={t('country') as string}
                  options={countries}
                  onSelect={setCountry}
                  dropDownStyle={DropDownStyles.QUINARY}
                  placeholder={t('countryPlaceholder') as string}
                  inputEnabled={true}
                  handleInputChange={handleInputChange}
                />
              </div>

              <CustomCheckBox
                identifier="whitepaper-agreement"
                onChange={setIsAgreedToReceiveWhitePaper}
              >
                {t('whitepaperAgreement')}
              </CustomCheckBox>

              <CustomCheckBox
                identifier="newsletter-agreement"
                onChange={setIsAgreedToReceiveNewsLetter}
              >
                {t('newsletterAgreement')}
              </CustomCheckBox>
            </div>

            <CustomCheckBox identifier="whitepaper-consent" onChange={setIsConsentChecked}>
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
                ...lastNameError,
                ...emailError,
                ...consentError,
              ]}
            />

            <CustomButton onClick={onFormSumbit} className="validation-btn">
              {t('btnFormValidation')}
            </CustomButton>
          </div>

          <div className="privacy-statement">{t('privacyStatement')}</div>
        </div>

        <div className="hidden-link-for-seo">
          <Link href={'/solutions'}>solutions</Link>

          <Link href={'/'}>home</Link>
        </div>
      </PageWrapper>
    </div>
  );
};

export default WhitePaperForm;
