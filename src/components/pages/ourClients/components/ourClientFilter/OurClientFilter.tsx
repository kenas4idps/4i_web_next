'use client';

import { useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import Clients from '@/components/layout/clients';
import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';

import { ClientIndustryListContext } from '@/providers/clientsTypeProvider/ClientsTypeProvider';

import './OurClientFilter.scss';

interface Props {
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
}

const OurClientFilter = ({ currentFilter, setCurrentFilter }: Props) => {
  const { clientsIndustryList, getClientsIndustryList } = useContext(ClientIndustryListContext);
  const t = useTranslations('ourClients');

  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  useEffect(() => {
    getClientsIndustryList();
    // eslint-disable-next-line
  }, [clientsIndustryList]);

  return (
    <PageWrapper className={`our-clients-filter ${!isEmpty && 'show'}`}>
      <DoubleCircleOverlay size="1541px" className="double-circle-container" />
      <BlurCircle size="1285px" className="blur-circle-container" />

      <div className="filter-container">
        <div className="title">{t('filterTitle')}</div>

        <div className="filter-list">
          {clientsIndustryList?.map((filter, key) => {
            return (
              <div
                className={`filter-item ${filter?.name === currentFilter && 'selected'}`}
                onClick={() => setCurrentFilter(filter?.name)}
                key={key}
              >
                {filter?.name}
              </div>
            );
          })}
        </div>
      </div>

      <Clients filter={currentFilter && currentFilter} onFetch={onFetch} />
    </PageWrapper>
  );
};

export default OurClientFilter;
