import { useTranslation } from 'react-i18next';

import PageWrapper from 'components/common/pageWrapper';

import DoubleCircleImg from 'assets/img/doubleCircle.svg';
import MapImg from 'assets/img/map.webp';

import GetInTouchForm from 'components/common/getInTouchForm';

import './GetInTouchCmp.scss';

const GetInTouchCmp = () => {
  const { t } = useTranslation('getInTouch');

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
          <img src={MapImg} alt="Map of 4i Tech localisation" />
        </div>

        <div className="form-container">
          <GetInTouchForm />
        </div>
      </PageWrapper>
    </div>
  );
};

export default GetInTouchCmp;
