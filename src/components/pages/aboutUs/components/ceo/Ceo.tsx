import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import Image from 'next/image';

import './Ceo.scss';

const CeoPicture = '/assets/img/ceo.png';

const Ceo = () => {
  const t = useTranslations('aboutUs');

  return (
    <PageWrapper className="ceo small">
      <BlurCircle className="blur-circle-container" size="922px" />

      <DoubleCircleOverlay size="1541px" className="double-circle-container" />

      <div className="ceo-picture-container">
        <Image src={CeoPicture} alt="Corrado von Planta, 4i Tech CEO" width={233} height={237} />
      </div>

      <div className="tag">{t('ceoTag')}</div>

      <div className="name">{t('ceoName')}</div>

      <div className="description">{t('ceoDescription')}</div>
    </PageWrapper>
  );
};

export default Ceo;
