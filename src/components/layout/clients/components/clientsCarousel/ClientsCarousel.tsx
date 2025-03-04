import { useState, useEffect, useRef } from 'react';

import { ClientFE } from '../../SharedType';

import PageWrapper from 'components/common/pageWrapper';

import variables from 'styles/_other.module.scss';
import './ClientsCarousel.scss';

interface Props {
  clients: ClientFE[];
}

const dektopItemSize = 14.285;
const mobileItemSize = 33.33;

const ClientsCarousel = ({ clients }: Props) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const maxCarousel = useRef(0);

  // const getTranslate = () => {
  // 	const itemSize = getItemSize();
  // 	return carouselIndex * -1;
  // }

  const onRightClick = () => {
    const itemSize = getItemSize();
    const indexDecimal = carouselIndex / itemSize;
    setCarouselIndex(itemSize * Math.ceil(indexDecimal) + 10);
  };

  const onLeftClick = () => {
    const itemSize = getItemSize();
    const indexDecimal = carouselIndex / itemSize;
    setCarouselIndex(itemSize * Math.floor(indexDecimal) - 10);
  };

  const getItemSize = () => {
    if (isMobile) {
      return mobileItemSize;
    } else {
      return dektopItemSize;
    }
  };

  useEffect(() => {
    const phoneSize = parseInt(variables.mediaQueryPhone.slice(0, -2));
    const handleResize = () => {
      if (window.innerWidth <= phoneSize) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    const carouselInterval = setInterval(() => {
      const itemSize = getItemSize();
      setCarouselIndex(currentIndex => {
        if (
          currentIndex >= clients.length * itemSize - maxCarousel.current * itemSize + 20 ||
          currentIndex <= -20
        ) {
          return -10;
        } else {
          return currentIndex + 1;
        }
      });
    }, 100);

    return () => {
      clearInterval(carouselInterval);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [clients]);

  useEffect(() => {
    maxCarousel.current = Math.trunc(100 / getItemSize());
    // eslint-disable-next-line
  }, [isMobile]);

  return (
    <PageWrapper className="clients-carousel">
      <div className="left-click" onClick={() => onLeftClick()}></div>

      <div className="carousel-container">
        <div className="carousel" style={{ transform: `translate(${-carouselIndex}%, 0)` }}>
          {clients?.map((client, key) => {
            return (
              <div
                className="carousel-item"
                key={key}
                style={{
                  flex: `0 0 ${getItemSize()}%`,
                }}
              >
                <div className="client-container">
                  <div
                    className="client-bg"
                    style={{ backgroundImage: `url(${client?.logo?.url})` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="right-click" onClick={() => onRightClick()}></div>
    </PageWrapper>
  );
};

export default ClientsCarousel;
