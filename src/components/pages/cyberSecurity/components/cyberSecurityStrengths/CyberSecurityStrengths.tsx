import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import './CyberSecurityStrengths.scss';
import { getTranslations } from 'next-intl/server';

const CyberSecurityStrengths = async () => {
  const t = await getTranslations('cyberSecurity');

  return (
    <PageWrapper className="cyber-security-strengths">
      <BlurCircle size="922px" className="blur-circle-container" />

      <DoubleCircleOverlay size="1278px" className="double-circle-container" />

      <div className="strength-container">
        <div className="left-column">
          <div className="title">{t('strengthTitle1')}</div>

          <div className="tag">{t('strengthTag1')}</div>
        </div>

        <div className="right-column">
          <div className="description">{t('strengthDescription1')}</div>
        </div>
      </div>

      <div className="strength-container">
        <div className="left-column">
          <div className="title">{t('strengthTitle2')}</div>

          <div className="tag">{t('strengthTag2')}</div>
        </div>

        <div className="right-column">
          <div className="description">{t('strengthDescription2')}</div>
        </div>
      </div>

      <div className="strength-container">
        <div className="left-column">
          <div className="title">{t('strengthTitle3')}</div>

          <div className="tag">{t('strengthTag3')}</div>
        </div>

        <div className="right-column">
          <div className="description">{t('strengthDescription3')}</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CyberSecurityStrengths;
