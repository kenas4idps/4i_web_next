'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// eslint-disable-next-line
// @ts-ignore
import AnimatedNumber from 'animated-number-react';

import PageWrapper from '@/components/common/pageWrapper';

const LogoFullIcon = '/assets/icons/logoFull.svg';
const BubblesBg = '/assets/img/bubbles1.webp';

import './Numbers.scss';
import { useQuery } from '@tanstack/react-query';
import { NumbersTypeBE } from '@/api/models/shared';
import { api } from '@/api';
import { NotificationContext } from '@/providers/notificationProvider';

interface Props {
  withBackgroundColor?: boolean;
}

const handleNumberData = (numbersData: NumbersTypeBE) => {
  const arr = [];

  if (numbersData?.attributes?.projects_delivered) {
    arr.push({
      labelKey: 'projectsDelivered',
      number: numbersData?.attributes?.projects_delivered,
      extraContent: numbersData?.attributes?.projects_delivered_extra_content,
    });
  }

  if (numbersData?.attributes?.industries_we_served) {
    arr.push({
      labelKey: 'industriesWeServed',
      number: numbersData?.attributes?.industries_we_served,
      extraContent: numbersData?.attributes?.industries_we_served_extra_content,
    });
  }

  if (numbersData?.attributes?.office_locations) {
    arr.push({
      labelKey: 'officeLocations',
      number: numbersData?.attributes?.office_locations,
      extraContent: numbersData?.attributes?.office_locations_extra_content,
    });
  }

  if (numbersData?.attributes?.number_of_professionals) {
    arr.push({
      labelKey: 'team',
      number: numbersData?.attributes?.number_of_professionals,
      extraContent: numbersData?.attributes?.number_of_professionals_extra_content,
    });
  }
  if (numbersData?.attributes?.years_of_experience) {
    arr.push({
      labelKey: 'yearExperience',
      number: numbersData?.attributes?.years_of_experience,
      extraContent: numbersData?.attributes?.years_of_experience_extra_content,
    });
  }
  if (numbersData?.attributes?.countries_served) {
    arr.push({
      labelKey: 'countriesServed',
      number: numbersData?.attributes?.countries_served,
      extraContent: numbersData?.attributes?.countries_served_extra_content,
    });
  }
  return arr;
};

const Numbers = ({ withBackgroundColor = false }: Props) => {
  const { displayNotification } = useContext(NotificationContext);
  const [isScrooledTo, setIsScrolledTo] = useState(false);
  const numberContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('homepage');

  const { data: numbers } = useQuery({
    queryKey: ['numbers'],
    queryFn: async () => {
      try {
        const response = await api.shared.collection.getNumbers();
        if ('content' in response) {
          const numbersData = response.content.data;

          const numbers = handleNumberData(numbersData);

          return numbers;
        }
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong When Handling Numbers Data, Please Try Again !',
          'error',
        );
      }

      return null;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (numberContainerRef.current) {
        const scrollTopElem =
          numberContainerRef.current.offsetTop - numberContainerRef.current.offsetHeight;
        // You can adjust the threshold as needed, e.g., 100 is the number of pixels from the top
        if (scrollTop >= scrollTopElem) {
          setIsScrolledTo(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {numbers && numbers?.length > 0 && (
        <div
          className={`numbers ${withBackgroundColor && 'withBackgroundColor'}`}
          ref={numberContainerRef}
        >
          <PageWrapper
            className="numbers-super-container"
            style={{ backgroundImage: `url(${BubblesBg})` }}
          >
            <PageWrapper pageWrapperStyle="small">
              <div className="company-logo">
                <Image width={150} height={50} src={LogoFullIcon} alt="company-logo" />
              </div>

              <div className="title">{t('numberTitle')}</div>

              <div className="numbers-container">
                {numbers?.map((item, key) => {
                  return (
                    <div className="number-item-super-container" key={key}>
                      <div className="number-item-container">
                        <div className="number">
                          <AnimatedNumber
                            value={() => {
                              return item?.number;
                            }}
                            className="value"
                            delay="0"
                            duration="1000"
                            formatValue={(value: any) => {
                              if (isScrooledTo) {
                                const fixed = value?.toFixed(0);
                                return Number(fixed)?.toLocaleString();
                              } else {
                                return 0;
                              }
                            }}
                          />

                          <span className="extra-content">{item?.extraContent}</span>
                        </div>

                        <div className="label">{t(item?.labelKey)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PageWrapper>
          </PageWrapper>
        </div>
      )}
    </>
  );
};

export default Numbers;
