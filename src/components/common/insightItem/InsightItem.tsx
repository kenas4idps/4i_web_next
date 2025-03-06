import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// import RichTextTransformCmp from "components/common/richTextTransformCmp";
// import RichTextStylingCmp from "components/common/richTextStylingCmp";
import ShareCmp from 'components/common/shareCmp';

import ShareIcon from 'assets/icons/share.svg';

import { InsightFE } from './sharedType';

import './InsightItem.scss';

interface Props {
  item?: InsightFE;
  isMain?: boolean;
  withBg?: boolean;
}

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
    <div className={`insight-item ${isMain && 'main'} ${withBg && 'with-bg'}`}>
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
        <div className="link" onClick={() => navigate('/insight/' + item?.urlPath)}>
          {t('readMoreLink')}
        </div>

        <div className="share-container" ref={shareRef}>
          <div className="share-icon-container" onClick={() => onClickShareIcon()}>
            <img className="share-icon" src={ShareIcon} alt="share icon" />
          </div>

          <div className={`share-options-container ${isShareOpen ? 'open' : ''}`}>
            <ShareCmp url={`${window.location.origin}/insight/${item?.urlPath}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightItem;
