import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import Image from 'next/image';
import './ProjectManagementMainPoints.scss';

const Img1 = '/assets/img/projectManagement1.png';
const Img2 = '/assets/img/projectManagement2.png';

const ProjectManagementMainPoints = () => {
  const t = useTranslations('projectManagement');

  return (
    <PageWrapper className="project-management-main-points">
      <DoubleCircleOverlay size="1541px" className="double-circle-container" />

      <BlurCircle size="922px" className="blur-circle-container" />

      <div className="left-column">
        <div className="img-container">
          <Image src={Img1} alt="computer on a office desk with code on it" fill />
        </div>

        <div className="img-container">
          <Image src={Img2} alt="bionic eyes" fill />
        </div>
      </div>

      <div className="right-column">
        <div className="main-point">
          <div className="title">{t('projectManagementMainPointTitle1')}</div>

          <div className="description">{t('projectManagementMainPointDescription1')}</div>
        </div>

        <div className="main-point">
          <div className="title">{t('projectManagementMainPointTitle2')}</div>

          <div className="description">{t('projectManagementMainPointDescription2')}</div>
        </div>

        <div className="main-point">
          <div className="title">{t('projectManagementMainPointTitle3')}</div>

          <div className="description">{t('projectManagementMainPointDescription3')}</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProjectManagementMainPoints;
