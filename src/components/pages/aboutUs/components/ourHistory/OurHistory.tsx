'use client';

import { useContext } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import HistoricListCmp from '@/components/layout/historicListCmp';

import { NotificationContext } from '@/providers/notificationProvider';

import './OurHistory.scss';
import { api } from '@/api';
import { CompanyHistoryApi } from '@/api/models/CompanyHistory';
import { useQuery } from '@tanstack/react-query';

const handleCompanyMileStonesData = (companyHistoryListData: CompanyHistoryApi['data']) => {
  return companyHistoryListData?.map(history => {
    return {
      tag: new Date(history?.attributes?.date)?.getFullYear()?.toString(),
      title: history?.attributes?.title,
      description: history?.attributes?.description,
    };
  });
};

const OurHistory = () => {
  const t = useTranslations('aboutUs');
  const locale = useLocale();
  const { displayNotification } = useContext(NotificationContext);

  const { data: companyMileStoneList } = useQuery({
    queryKey: ['companyMileStoneList'],
    queryFn: async () => {
      try {
        const companyMileStonesData =
          await api.companyHistory.collection.getCompanyMileStonesData(locale);

        console.log({ companyMileStonesData });
        if ('content' in companyMileStonesData) {
          const companyHistoryList = handleCompanyMileStonesData(
            companyMileStonesData.content.data,
          );

          return companyHistoryList ?? null;
        }
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling History List Data, Please Try Again !',
          'error',
        );
      }

      return null;
    },
  });

  return (
    <>
      {companyMileStoneList && companyMileStoneList?.length > 0 && (
        <div className="our-history">
          <HistoricListCmp
            tag={t('historyTag')}
            title={t('historyTitle')}
            description={t('historyDescription')}
            list={companyMileStoneList}
          />
        </div>
      )}
    </>
  );
};

export default OurHistory;
