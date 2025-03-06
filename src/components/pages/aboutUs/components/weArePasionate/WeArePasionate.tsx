import { useTranslations } from 'next-intl';

import FullWidth from '@/components/common/fullWidth';

import './WeArePasionate.scss';

const WeArePasionate = () => {
  const t = useTranslations('aboutUs');

  return (
    <FullWidth className="we-are-passionate">
      <div className="title">{t('passionateTitle')}</div>

      <div className="description">{t('passionateDescription')}</div>
    </FullWidth>
  );
};

export default WeArePasionate;
