'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

// import RichTextTransformCmp from "components/common/richTextTransformCmp";
// import RichTextStylingCmp from "components/common/richTextStylingCmp";
import ShareCmp from '@/components/common/shareCmp';

import { InsightFE } from './sharedType';

import './InsightItem.scss';

const ShareIcon = '/assets/icons/share.svg';

interface Props {
  item?: InsightFE;
  isMain?: boolean;
  withBg?: boolean;
}

const InsightItem = ({ item, isMain = false, withBg = false }: Props) => {
  const router = useRouter();
  const t = useTranslations('insights');
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
    <>
      <div
        onClick={() => router.push(`/insight/${item?.urlPath}`)}
        className={`insight-item ${isMain && 'main'} ${withBg && 'with-bg'}`}
      >
        {/* <div className='tag'>
					<div className='types-container'>
						{item?.type?.map((value, key) => {
							return (
								<span className='type' key={key}>
									{value}
								</span>
							)
						})}
					</div>
					
					<div className='date'>
						{item?.publishedDate}
					</div>
				</div> */}

        <div className="title">{item?.title}</div>

        {/* {item?.paragraph && (
					<div className="description">
						<RichTextStylingCmp>
							<RichTextTransformCmp>{item?.paragraph}</RichTextTransformCmp>
						</RichTextStylingCmp>
					</div>
				)} */}

        <div className="actions">
          <div className="link">
            <p>{item?.publishedDate}</p>
            {t('readMoreLink')}
          </div>
        </div>
      </div>
      <div className="share-container" ref={shareRef}>
        <div className="share-icon-container" onClick={() => onClickShareIcon()}>
          <img className="share-icon" src={ShareIcon} alt="share icon" />
        </div>

        <div className={`share-options-container ${isShareOpen ? 'open' : ''}`}>
          <ShareCmp url={`${window.location.origin}/insight/${item?.urlPath}`} />
        </div>
      </div>
    </>
  );
};

export default InsightItem;
