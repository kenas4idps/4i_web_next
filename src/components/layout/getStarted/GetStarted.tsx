import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

import './GetStarted.scss';

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const GetStarted = ({ style, className }: Props) => {
  const router = useRouter();
  const t = useTranslations('contactUs');

  return (
    <PageWrapper style={style} className={`get-started ${className}`}>
      <div className="get-started-container">
        <div className="title">{t('getStartedCmpTitle')}</div>

        <div className="content">{t('getStartedCmpContent')}</div>

        <CustomButton onClick={() => router.push('/contact-us')}>
          {t('getStartedCmpBtn')}
        </CustomButton>
      </div>
    </PageWrapper>
  );
};

export default GetStarted;
