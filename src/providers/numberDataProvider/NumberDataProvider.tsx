'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

import { NotificationContext } from '@/providers/notificationProvider';

import { NumbersTypeBE, NumberTypeFE } from '@/components/layout/numbers/SharedType';
import { api } from '@/api';

interface ApiProviderProps {
  children: ReactNode;
}

interface NumbersDataContextType {
  init: () => void;
  numbers?: NumberTypeFE[];
}

const NumbersDataContext = createContext<NumbersDataContextType>({
  init: async () => ({}),
  numbers: [],
});

const handleNumberData = (numbersData: NumbersTypeBE) => {
  const arr = [];

  if (numbersData?.projects_delivered) {
    arr.push({
      labelKey: 'projectsDelivered',
      number: numbersData?.projects_delivered,
      extraContent: numbersData?.projects_delivered_extra_content,
    });
  }

  if (numbersData?.industries_we_served) {
    arr.push({
      labelKey: 'industriesWeServed',
      number: numbersData?.industries_we_served,
      extraContent: numbersData?.industries_we_served_extra_content,
    });
  }

  if (numbersData?.office_locations) {
    arr.push({
      labelKey: 'officeLocations',
      number: numbersData?.office_locations,
      extraContent: numbersData?.office_locations_extra_content,
    });
  }

  if (numbersData?.number_of_professionals) {
    arr.push({
      labelKey: 'team',
      number: numbersData?.number_of_professionals,
      extraContent: numbersData?.number_of_professionals_extra_content,
    });
  }
  if (numbersData?.years_of_experience) {
    arr.push({
      labelKey: 'yearExperience',
      number: numbersData?.years_of_experience,
      extraContent: numbersData?.years_of_experience_extra_content,
    });
  }
  if (numbersData?.countries_served) {
    arr.push({
      labelKey: 'countriesServed',
      number: numbersData?.countries_served,
      extraContent: numbersData?.countries_served_extra_content,
    });
  }
  return arr;
};

const NumbersDataProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { displayNotification } = useContext(NotificationContext);

  const [fetched, setFetched] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<NumberTypeFE[]>();

  const init = async () => {
    if (!fetched) {
      try {
        const response = await api.shared.collection.getNumbers();
        if ('content' in response) {
          const numbersData: NumbersTypeBE = response.content;

          const numbers: NumberTypeFE[] = handleNumberData(numbersData);

          if (numbers) setNumbers(numbers);

          setFetched(true);
        }
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling Numbers Data, Please Try Again !',
          'error',
        );
      }
    }
  };

  return (
    <NumbersDataContext.Provider
      value={{
        numbers,
        init,
      }}
    >
      {children}
    </NumbersDataContext.Provider>
  );
};

export { NumbersDataContext, NumbersDataProvider };
