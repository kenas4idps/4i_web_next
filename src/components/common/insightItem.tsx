import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

import ShareCmp from '@/components/common/shareCmp';
import ShareIcon from 'assets/icons/share.svg';

interface Props {
  item?: InsightFE;
  isMain?: boolean;
  withBg?: boolean;
}

export interface InsightFE {
  urlPath: string;
  type: string[];
  title: string;
  paragraph?: string;
  publishedDate: string;
}

const insightItemStyles = cva('p-8', {
  variants: {
    isMain: {
      true: 'py-16 px-8',
      false: '',
    },
    withBg: {
      true: 'bg-gray-100 rounded-lg shadow-lg',
      false: '',
    },
  },
  defaultVariants: {
    isMain: false,
    withBg: false,
  },
});

const InsightItem = ({ item, isMain = false, withBg = false }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('insights');
  const [isShareOpen, setIsOpen] = useState(false);
  const shareRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickShare = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', checkIfClickShare);

    return () => {
      document.removeEventListener('click', checkIfClickShare);
    };
  }, []);

  const onClickShareIcon = () => {
    setIsOpen(current => !current);
  };

  return (
    <div className={cn(insightItemStyles({ isMain, withBg }))}>
      <div className="pb-4 text-2xl font-bold">{item?.title}</div>

      <div className="flex justify-between font-medium text-gray-600">
        <div
          className="relative cursor-pointer hover:after:absolute hover:after:bottom-[-2px] hover:after:left-0 hover:after:h-1 hover:after:w-full hover:after:bg-gray-600 hover:after:content-['']"
          onClick={() => navigate('/insight/' + item?.urlPath)}
        >
          {t('readMoreLink')}
        </div>

        <div className="relative cursor-pointer" ref={shareRef}>
          <div className="flex items-center" onClick={() => onClickShareIcon()}>
            <img className="h-6 w-6" src={ShareIcon} alt="share icon" />
          </div>

          <div
            className={`absolute right-0 mt-2 rounded-lg bg-gray-300 p-2 ${isShareOpen ? 'block' : 'hidden'}`}
          >
            <ShareCmp url={`${window.location.origin}/insight/${item?.urlPath}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightItem;
