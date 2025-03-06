import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import CustomButton from '@/components/common/customButton';

import ClientsCarousel from './components/clientsCarousel';
import ClientsList from './components/clientsList';

import { NotificationContext } from '@/providers/notificationProvider';

import { ClientBE, ClientFE } from './SharedType';

import { api } from '@/api';

interface ClientListBE {
  data: ClientBE[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

const handleClientsData = (clientsData: ClientBE[]) => {
  const clients = clientsData?.map(client => {
    return {
      name: client?.attributes.name,
      country: client?.attributes?.country,
      logo: {
        url: `${process.env.REACT_APP_STRAPI_URL}${client?.attributes?.logo?.data?.attributes?.url}`,
        caption: client?.attributes?.logo?.data?.attributes?.caption,
        alternativeText: client?.attributes?.logo?.data?.attributes?.alternativeText,
      },
    };
  });

  return clients;
};

interface Props {
  filter?: string;
  isCarousel?: boolean;
  onFetch?: (isEmpty: boolean) => void;
}

const Clients = ({ filter = 'All', isCarousel = false, onFetch }: Props) => {
  const t = useTranslations('ourClients');
  const locale = useLocale();
  const { displayNotification } = useContext(NotificationContext);

  const [clients, setClients] = useState<ClientFE[]>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;

    fetchClientsData(currentPage.current);
  };

  const fetchClientsData = async (page: number) => {
    try {
      const encodedFilter = encodeURIComponent(filter);

      const response = await api.shared.collection.getClients(
        encodedFilter,
        currentPage.current,
        locale,
      );

      if ('content' in response) {
        const clientsData = response.content as ClientListBE;
        const newClients: ClientFE[] = handleClientsData(clientsData?.data);

        const expectedNumOfClients = (currentPage.current + 1) * 8;

        const totalNumOfClients = clientsData?.meta?.pagination?.total;

        if (expectedNumOfClients < totalNumOfClients) {
          setCanLoadMore(true);
        } else {
          setCanLoadMore(false);
        }

        if (newClients) {
          if (newClients?.length < 1) {
            if (onFetch) onFetch(true);
          } else {
            if (onFetch) {
              onFetch(false);
            }
          }
          if (page === 0) {
            setClients(newClients);
          } else {
            setClients(prevClients => [...prevClients, ...newClients]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      displayNotification(
        'Something Went Wrong When Handling Clients Data, Please Try Again  !',
        'error',
      );
    }
  };

  useEffect(() => {
    currentPage.current = 0;
    fetchClientsData(0);
    // eslint-disable-next-line
  }, [locale, filter]);

  return (
    <div className="clients">
      {isCarousel ? (
        <ClientsCarousel clients={clients} />
      ) : (
        <>
          <ClientsList clients={clients} />
          {canLoadMore && (
            <CustomButton onClick={() => loadMore()}>{t('loadMoreBtn')}</CustomButton>
          )}
        </>
      )}
    </div>
  );
};

export default Clients;
