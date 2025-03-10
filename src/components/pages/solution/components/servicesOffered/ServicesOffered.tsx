import { useTranslations } from 'next-intl';

import { DevelopmentServicesTypeFE } from '@/api/models/shared';

import PageWrapper from '@/components/common/pageWrapper';
import BlurCircle from '@/components/common/blurCircle';

import './ServicesOffered.scss';

const ServicesOffered = ({ title, description, serviceList }: DevelopmentServicesTypeFE) => {
  const t = useTranslations('solutions');

  return (
    <>
      {serviceList && serviceList?.length > 0 && (
        <PageWrapper className="services-offered">
          <div className="tag">{t('servicesOffered')}</div>

          <div className="introduction">
            <div className="title">{title}</div>

            <div className="description">
              {description}
              <BlurCircle size="914px" className="blur-circle-container" />
            </div>
          </div>

          <div className="services-list">
            {serviceList?.map((service, key) => {
              return (
                <div className="service" key={key}>
                  <div className="service-container">
                    <div className="icon-container">
                      {service?.icon?.url && (
                        <img src={service?.icon?.url} alt={`${service?.title} icon`} />
                      )}
                    </div>

                    <div className="title">{service?.title}</div>

                    <div className="description">{service?.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageWrapper>
      )}
    </>
  );
};

export default ServicesOffered;
