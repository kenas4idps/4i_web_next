import { useState, ReactNode, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { cva } from 'class-variance-authority';

import { ImageFE } from '@/api/models/shared';
import PageWrapper from 'components/common/pageWrapper';
import { cn } from '@/lib/cn';

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

const carouselCmpStyles = cva('overflow-hidden', {
  variants: {
    isDarkBg: {
      true: 'bg-gray-800 text-white',
      false: 'bg-white text-black',
    },
    isBig: {
      true: 'h-[595px]',
      false: 'h-[440px]',
    },
  },
  defaultVariants: {
    isDarkBg: false,
    isBig: false,
  },
});

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
    const phoneSize = 768; // Adjust this value based on your tailwind config

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
    <div className={cn(carouselCmpStyles({ isDarkBg, isBig }))}>
      <PageWrapper className="container mx-auto">
        <div className="flex justify-between pb-12">
          <div className="w-3/4">
            {title && <div className="text-4xl font-bold">{title}</div>}
            {description && <div className="pt-5 text-lg">{description}</div>}
          </div>
          <div className="flex">
            <div
              className={`relative h-14 w-14 cursor-pointer rounded-lg bg-gray-300 ${index <= 0 ? 'cursor-default opacity-50' : ''}`}
              onClick={() => goToprev()}
            >
              <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-t-2 border-l-2 border-gray-800"></div>
            </div>
            <div
              className={`relative ml-6 h-14 w-14 cursor-pointer rounded-lg bg-gray-300 ${listItem && index >= listItem?.length - 1 ? 'cursor-default opacity-50' : ''}`}
              onClick={() => goToNext()}
            >
              <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform border-t-2 border-l-2 border-gray-800"></div>
            </div>
          </div>
        </div>
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translate(${getTranslate()}%, 0)` }}
        >
          {listItem?.map((item, key) => (
            <div
              className={`flex-none w-[${getItemSize()}%] p-2 ${index === key ? 'shadow-lg' : 'grayscale'}`}
              key={key}
              onClick={() => onClickFunc && item?.id && onClickFunc(item?.id)}
            >
              <div
                className="relative flex justify-between rounded-lg bg-cover bg-center p-10"
                style={{ backgroundImage: `url(${item?.bannerImage?.url})` }}
              >
                <div className="relative z-10 max-w-1/2">
                  {item?.title && (
                    <div className="pb-5 text-2xl font-bold">
                      <ReactMarkdown>{item?.title}</ReactMarkdown>
                    </div>
                  )}
                  {item?.description && (
                    <div className="text-lg">
                      <ReactMarkdown>{item?.description}</ReactMarkdown>
                    </div>
                  )}
                </div>
                {item?.otherInformation && (
                  <div className="relative z-10">{item?.otherInformation}</div>
                )}
                <div className="bg-opacity-50 absolute inset-0 bg-black"></div>
              </div>
            </div>
          ))}
        </div>
        {extraContent && <div className="pt-16">{extraContent}</div>}
      </PageWrapper>
    </div>
  );
};

export default CarouselCmp;
