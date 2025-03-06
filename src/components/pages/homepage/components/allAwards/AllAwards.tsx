'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AwardFE } from './SharedType';

import PageWrapper from '@/components/common/pageWrapper';

import './AllAwards.scss';

interface Props {
  awards: AwardFE[];
}

const AllAwards = ({ awards }: Props) => {
  const t = useTranslations('homepage');

  return (
    <PageWrapper className="all-awards">
      <div className="title">{t('awardsTitle')}</div>

      <div className="awards-list">
        {awards?.map((item, key) => {
          return item.link ? (
            <a href={item.link} target="__blank" className="award-item-container" key={key}>
              <div className="award-item">
                <div className="img-container">
                  <Image
                    fill
                    className="object-contain"
                    src={item?.logo?.url}
                    alt={item?.logo?.alternativeText || 'Award logo'}
                  />
                </div>
              </div>
            </a>
          ) : (
            <div className="award-item-container" key={key}>
              <div className="award-item">
                <div className="img-container">
                  <Image
                    fill
                    className="object-contain"
                    src={item?.logo?.url}
                    alt={item?.logo?.alternativeText || 'Award logo'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default AllAwards;
