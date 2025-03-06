import { useState, ReactNode, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { ImageFE } from '@/api/models/shared';

import PageWrapper from '@/components/common/pageWrapper';

import variables from '@/styles/_other.module.scss';
import './CarouselCmp.scss';

interface CarouselItemType {
  id?: string;
  title?: string;
  description: string;
  bannerImage: ImageFE;
  otherInformation?: ReactNode;
}

interface Props {
  title: string;
  description?: string;
  listItem?: CarouselItemType[];
  extraContent?: ReactNode;
  isDarkBg?: boolean;
  isBig?: boolean;
  onClickFunc?: (id: string) => void;
}

const dektopItemSize = 75;
const mobileItemSize = 125;

const CarouselCmp = ({
  title,
  description,
  listItem,
  extraContent,
  isDarkBg = false,
  isBig = false,
  onClickFunc,
}: Props) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const goToprev = () => {
    if (index > 0) {
      setIndex(current => current - 1);
    }
  };

  const goToNext = () => {
    if (listItem && index < listItem?.length - 1) {
      setIndex(current => current + 1);
    }
  };

  const getTranslate = () => {
    const itemSize = getItemSize();
    return index * itemSize * -1;
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

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`carousel-cmp ${isDarkBg && 'dark-bg'} ${isBig && 'big'}`}>
      <PageWrapper className="carousel-cmp-container">
        <div className="top-container">
          <div className="introduction">
            {title && <div className="title">{title}</div>}

            {description && <div className="description">{description}</div>}
          </div>

          <div className="controls">
            <div
              className={`arrow-container ${index <= 0 ? 'innactive' : ''}`}
              onClick={() => goToprev()}
            >
              <div className="arrow left-arrow"></div>
            </div>

            <div
              className={`arrow-container ${listItem && index >= listItem?.length - 1 ? 'innactive' : ''}`}
              onClick={() => goToNext()}
            >
              <div className="arrow right-arrow"></div>
            </div>
          </div>
        </div>

        <div className="carousel" style={{ transform: `translate(${getTranslate()}%, 0)` }}>
          {listItem?.map((item, key) => {
            return (
              <div
                className={`item-super-container ${index === key && 'current'}`}
                style={{
                  flex: `0 0 ${getItemSize()}%`,
                }}
                key={key}
                onClick={() => onClickFunc && item?.id && onClickFunc(item?.id)}
              >
                <div
                  className="item-container"
                  style={{ backgroundImage: `url(${item?.bannerImage?.url})` }}
                >
                  <div className="item-content">
                    {item?.title && (
                      <div className="title">
                        <ReactMarkdown>{item?.title}</ReactMarkdown>
                      </div>
                    )}

                    {item?.description && (
                      <div className="description">
                        <ReactMarkdown>{item?.description}</ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {item?.otherInformation && (
                    <div className="other-info">{item?.otherInformation}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {extraContent && <div className="extra-content">{extraContent}</div>}
      </PageWrapper>
    </div>
  );
};

export default CarouselCmp;
