'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useLocale } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider';
import { api } from '@/api';
import { ClientIndustryType } from '@/api/models/ClientIndustry';

interface ApiProviderProps {
  children: ReactNode;
}

interface ClientIndustryTypeFE {
  name: string;
}

interface ClientDataContextType {
  getClientsIndustryList: () => void;
  clientsIndustryList?: ClientIndustryTypeFE[];
}

const ClientIndustryListContext = createContext<ClientDataContextType>({
  getClientsIndustryList: async () => ({}),
  clientsIndustryList: [
    {
      name: '',
    },
  ],
});

const handleClientsIndustryListData = (caseStudyTypeData: ClientIndustryType[]) => {
  const clientsIndustryList = [];

  caseStudyTypeData?.forEach(industry => {
    if (industry?.clients?.data?.length > 0) {
      clientsIndustryList?.push({ name: industry?.name });
    }
  });

  const all = {
    name: 'All',
  };

  clientsIndustryList?.unshift(all);

  return clientsIndustryList;
};

const ClientIndustryListProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { displayNotification } = useContext(NotificationContext);
  const locale = useLocale();
  const [clientsIndustryList, setClientsIndustryListList] = useState<ClientIndustryTypeFE[]>();
  const [language, setLanguage] = useState<string>('');
  const [fetched, setFetched] = useState<boolean>();

  const getClientsIndustryList = async () => {
    if (!fetched || language !== locale) {
      try {
        const response = await api.shared.collection.getClientIndustries(locale);
        if ('content' in response) {
          const clientsIndustryListData = response.content;
          const clientsIndustryList: ClientIndustryTypeFE[] = handleClientsIndustryListData(
            clientsIndustryListData.data,
          );

          if (clientsIndustryList) setClientsIndustryListList(clientsIndustryList);
        }

        setFetched(true);
        setLanguage(locale);
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling Clients Type Data, Please Try Again !',
          'error',
        );
      }
    }
  };

  return (
    <ClientIndustryListContext.Provider
      value={{
        clientsIndustryList,
        getClientsIndustryList,
      }}
    >
      {children}
    </ClientIndustryListContext.Provider>
  );
};

export { ClientIndustryListContext, ClientIndustryListProvider };
