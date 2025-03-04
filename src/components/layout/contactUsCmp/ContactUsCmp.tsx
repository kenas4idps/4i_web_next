import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import FullWidth from 'components/common/fullWidth';
import CustomButton from 'components/common/customButton';

import './ContactUsCmp.scss';

const ContactUsCmp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('contactUs');

  return (
    <FullWidth className="contact-us-cmp">
      <div className="contact-us-cmp-container">
        <div className="left-column">
          <div className="left-column-container">
            <div className="title">{t('contactUsCmpTitle')}</div>
          </div>
        </div>

        <div className="right-column">
          <div className="right-column-container">
            <div className="description">{t('contactUsCmpContent')}</div>

            <CustomButton onClickBtn={() => navigate('/contact-us')}>
              {t('contactUsCmpBtn')}
            </CustomButton>
          </div>
        </div>
      </div>
    </FullWidth>
  );
};

export default ContactUsCmp;
