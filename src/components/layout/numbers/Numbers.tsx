import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// eslint-disable-next-line
// @ts-ignore
import AnimatedNumber from 'animated-number-react';

import { NumbersDataContext } from '@/providers/numberDataProvider/NumberDataProvider';

import PageWrapper from '@/components/common/pageWrapper';

import LogoFullIcon from '@/public/assets/icons/logoFull.svg';
import BubblesBg from '@/public/assets/img/bubbles1.webp';

import './Numbers.scss';

interface Props {
  withBackgroundColor?: boolean;
}

const Numbers = ({ withBackgroundColor = false }: Props) => {
  const { numbers, init } = useContext(NumbersDataContext);
  const [isScrooledTo, setIsScrolledTo] = useState(false);
  const numberContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('homepage');

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

    init();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [numbers]);

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
