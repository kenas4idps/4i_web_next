import { useContext } from 'react';
import { NotificationContext } from 'providers/notificationProvider';

import SeoDataHandler from './SeoDataHandler';
import DetailDataHandler from './DetailDataHandler';

import CommonPageApi from 'api/CommonPageApi';

import { PageDetailFE, SeoFE } from '@/api/models/shared';

const PageDataHandler = () => {
  const { displayNotification } = useContext(NotificationContext);

  const commonPageApi = CommonPageApi();
  const seoDataHandler = SeoDataHandler();
  const detailDataHandler = DetailDataHandler();

  const getPageInfo = async (pageName: string, locale: string) => {
    try {
      const pageData = await commonPageApi.getPageData(pageName, locale);

      const seo: SeoFE = seoDataHandler.handleSeoData(pageData?.seo);
      const detail: PageDetailFE = detailDataHandler.handleDetailData(pageData?.detail);

      return {
        seo,
        detail,
        pageData,
      };
    } catch (error) {
      displayNotification(
        `Something Went Wrong Fetching ${pageName} Data, Please Try Again !`,
        'error',
      );
      console.error(`[Error - API] Error calling ${pageName} data`, error);
    }
  };

  return {
    getPageInfo: getPageInfo,
  };
};

export default PageDataHandler;
