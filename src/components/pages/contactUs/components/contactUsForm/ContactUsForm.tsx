import { getTranslations } from 'next-intl/server';

import PageWrapper from '@/components/common/pageWrapper';
import GetInTouchForm from '@/components/common/getInTouchForm';
import ContactUsOffice from './components/contactUsOffice';

import './ContactUsForm.scss';

const ContactUsForm = async () => {
  const t = await getTranslations('contactUs');
  const tGetInTouch = await getTranslations('getInTouch');
  const tOffices = await getTranslations('offices');

  return (
    <PageWrapper className="contact-us-form">
      <div className="contact-us-form-container">
        <div className="info">
          <div className="tag">{t('tag')}</div>

          <div className="title">{t('formInfoTitle')}</div>

          <div className="description">{t('formInfoDescription')}</div>

          <div className="subtitle">{t('formContactInfo')}</div>

          <ContactUsOffice
            name={tOffices('swissOfficeTitle') as string}
            adress={tOffices('swissOfficeLocation')}
            phone={tOffices('swissOfficePhone')}
          />

          <ContactUsOffice
            name={tOffices('usOfficeTitle') as string}
            adress={tOffices('usOfficeLocation')}
            adress2={tOffices('usOfficeLocation2') || undefined}
            phone={tOffices('usOfficePhone')}
          />

          <ContactUsOffice
            name={tOffices('taiwanOfficeTitle') as string}
            adress={tOffices('taiwanOfficeLocation')}
            phone={tOffices('taiwanOfficePhone')}
          />

          <ContactUsOffice
            name={tOffices('taiwanOfficeTitle2') as string}
            adress={tOffices('taiwanOfficeLocation2')}
            phone={tOffices('taiwanOfficePhone2')}
          />
        </div>

        <div className="form-container">
          <div className="form-container-header">
            <div className="title">{tGetInTouch('subtitle')}</div>

            <div className="description">{tGetInTouch('description')}</div>
          </div>
          <GetInTouchForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactUsForm;
