import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContext } from '@/providers/notificationProvider';

import SharedApi from 'api/SharedApi';

import { ClientBE } from '@/components/layout/clients/SharedType';

interface ApiProviderProps {
  children: ReactNode;
}

interface ClientIndustryTypeFE {
  name: string;
}

interface ClientIndustryTypeBE {
  id: number;
  attributes: {
    name: string;
    clients: {
      data: ClientBE[];
    };
  };
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

const handleClientsIndustryListData = (caseStudyTypeData: ClientIndustryTypeBE[]) => {
  const clientsIndustryList = [];

  caseStudyTypeData?.forEach(industry => {
    if (industry?.attributes?.clients?.data?.length > 0) {
      clientsIndustryList?.push({ name: industry?.attributes?.name });
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
  const { i18n } = useTranslation();

  const [clientsIndustryList, setClientsIndustryListList] = useState<ClientIndustryTypeFE[]>();
  const [language, setLanguage] = useState<string>('');
  const [fetched, setFetched] = useState<boolean>();

  const sharedApi = SharedApi();

  const getClientsIndustryList = async () => {
    if (!fetched || language !== i18n.language) {
      try {
        const clientsIndustryListData: ClientIndustryTypeBE[] = await sharedApi.getClientIndustries(
          i18n.language,
        );

        const clientsIndustryList: ClientIndustryTypeFE[] =
          handleClientsIndustryListData(clientsIndustryListData);

        clientsIndustryList && setClientsIndustryListList(clientsIndustryList);

        setFetched(true);
        setLanguage(i18n.language);
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
