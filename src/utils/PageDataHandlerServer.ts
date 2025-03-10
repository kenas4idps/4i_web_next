import SeoDataHandler from './SeoDataHandler';
import DetailDataHandler from './DetailDataHandler';

import { PageDetailFE, SeoFE } from '@/api/models/shared';
import { api } from '@/api';

const PageDataHandlerServer = () => {
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
      console.error(`[Error - API] Error calling ${pageName} data`, error);
    }

    return null;
  };

  return {
    getPageInfo: getPageInfo,
  };
};

export default PageDataHandlerServer;
