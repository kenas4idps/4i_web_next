import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { BtnStyles } from '@/components/common/customButton';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';
import Clients from '@/components/layout/clients';

import './MainClients.scss';

const MainClients = () => {
  const t = useTranslations('homepage');
  const router = useRouter();

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  return (
    <div className={`main-clients ${!isEmpty && 'show'}`}>
      <PageWrapper className="top-bar">
        <div className="title">{t('clientsTitle')}</div>

        <div className="link-clients-btn">
          <CustomButton
            onClickBtn={() => router.push('/our-clients')}
            btnStyle={BtnStyles.TERTIARY}
          >
            {t('clientBtnLabel')}
          </CustomButton>
        </div>
      </PageWrapper>

      <Clients filter="NoPagination" isCarousel={true} onFetch={onFetch} />
    </div>
  );
};

export default MainClients;
