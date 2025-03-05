import { useContext } from 'react';
import { NotificationContext } from '@/providers/notificationProvider';

import SeoDataHandler from './SeoDataHandler';
import DetailDataHandler from './DetailDataHandler';

import { PageDetailFE, SeoFE } from '@/api/models/shared';
import { api } from '@/api';

const PageDataHandler = () => {
  const { displayNotification } = useContext(NotificationContext);

  const seoDataHandler = SeoDataHandler();
  const detailDataHandler = DetailDataHandler();

  const getPageInfo = async (pageName: string, locale: string) => {
    try {
      const response = await api.commonPage.collection.getPageData({ pageName, locale });

      if ('content' in response) {
        const pageData: any = response.content;

        const seo: SeoFE = seoDataHandler.handleSeoData(pageData?.seo as any);
        const detail: PageDetailFE = detailDataHandler.handleDetailData(pageData?.detail as any);

        return {
          seo,
          detail,
          pageData,
        };
      }
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
