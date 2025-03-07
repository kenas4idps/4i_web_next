import FullWidth from '@/components/common/fullWidth';

import './CyberSecurityOversight.scss';
import { getTranslations } from 'next-intl/server';

const CyberSecurityOversight = async () => {
  const t = await getTranslations('cyberSecurity');
  return (
    <div className="cyber-security-oversight">
      <FullWidth>
        <div className="cyber-security-oversight-container">
          <div className="title">{t('cyberSecurityOversightTitle')}</div>

          <div className="description">{t('cyberSecurityOversightDescription')}</div>
        </div>
      </FullWidth>
    </div>
  );
};

export default CyberSecurityOversight;
