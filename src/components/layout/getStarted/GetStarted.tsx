import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageWrapper from 'components/common/pageWrapper';
import CustomButton from 'components/common/customButton';

import './GetStarted.scss';

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const GetStarted = ({ style, className }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('contactUs');

  return (
    <PageWrapper style={style} className={`get-started ${className}`}>
      <div className="get-started-container">
        <div className="title">{t('getStartedCmpTitle')}</div>

        <div className="content">{t('getStartedCmpContent')}</div>

        <CustomButton onClickBtn={() => navigate('/contact-us')}>
          {t('getStartedCmpBtn')}
        </CustomButton>
      </div>
    </PageWrapper>
  );
};

export default GetStarted;
