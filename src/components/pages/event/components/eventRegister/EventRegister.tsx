'use client';

import PageWrapper from '@/components/common/pageWrapper';
import { useEffect } from 'react';

import './EventRegister.scss';
import { useTranslations } from 'next-intl';

interface Props {
  formId: string;
}

const EventRegister = ({ formId }: Props) => {
  const t = useTranslations('events');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // eslint-disable-next-line
      // @ts-ignore
      if (window.hbspt) {
        // eslint-disable-next-line
        // @ts-ignore
        window.hbspt.forms.create({
          portalId: `${process.env.REACT_APP_HUBSPOT_PORTAL_ID}`,
          formId: `${formId}`,
          target: '#hubspotForm',
          region: 'na1',
        });
      }
    });
  }, [formId]);

  return (
    <div className="event-register">
      <PageWrapper className="event-register-container">
        <div className="title">{t('registerTitle')}</div>

        {/* for temporary testing*/}
        <div id="hubspotForm" className="iframe-container"></div>
      </PageWrapper>
    </div>
  );
};

export default EventRegister;
