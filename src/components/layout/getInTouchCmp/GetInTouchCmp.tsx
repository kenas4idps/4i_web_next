'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import PageWrapper from '@/components/common/pageWrapper';

import GetInTouchForm from '@/components/common/getInTouchForm';

import './GetInTouchCmp.scss';

const DoubleCircleImg = '/assets/img/doubleCircle.svg';
const MapImg = '/assets/img/map.webp';

const GetInTouchCmp = () => {
  const t = useTranslations('getInTouch');

  return (
    <div className="get-in-touch">
      <div
        className="double-circle top"
        style={{ backgroundImage: `url(${DoubleCircleImg})` }}
      ></div>
      <div
        className="double-circle bottom"
        style={{ backgroundImage: `url(${DoubleCircleImg})` }}
      ></div>
      <PageWrapper className="info">
        {/* <div className='title'>
					{t("title")}
				</div> */}

        <div className="sub-title">{t('subtitle')}</div>

        <div className="description">{t('description')}</div>
      </PageWrapper>

      <PageWrapper className="content">
        <div className="map">
          <Image width={775} height={449} src={MapImg} alt="Map of 4i Tech localization" />
        </div>

        <div className="form-container">
          <GetInTouchForm />
        </div>
      </PageWrapper>
    </div>
  );
};

export default GetInTouchCmp;
