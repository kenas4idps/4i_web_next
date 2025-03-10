import { useRouter } from 'next/navigation';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

import './Partnership.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FrontImg = '/assets/img/ourClients1.webp';
const BehindImg = '/assets/img/ourClients2.png';

const Partnership = () => {
  const router = useRouter();
  const t = useTranslations('ourClients');

  return (
    <div className="partnership">
      <div className="behind-picture">
        <Image src={BehindImg} alt="bionic eyes" fill />
      </div>

      <PageWrapper className="partnership-container">
        <div className="introduction">
          <div className="introduction-container">
            <div className="tag">{t('partnershipTag')}</div>

            <div className="title">{t('partnershipTitle')}</div>

            <div className="description">{t('partnershipDescription')}</div>

            <CustomButton onClick={() => router.push('/contact-us')}>
              {t('patnershiptBtn')}
            </CustomButton>
          </div>
        </div>

        <div className="picture-container">
          <div className="front-picture">
            <Image src={FrontImg} alt="bionic eyes" fill />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Partnership;
