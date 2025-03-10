'use client';

import { ReactNode } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';

const SolutionImg1 = '/assets/img/solution1.png';
const SolutionImg2 = '/assets/img/solution2.jpg';

import './WhitePaper.scss';

interface Props {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const WhitePaper = ({ id, title, subtitle, children }: Props) => {
  const router = useRouter();
  const t = useTranslations('solutions');

  return (
    <PageWrapper className="white-paper">
      <DoubleCircleOverlay size="1540px" className="double-circle-container" />

      <div className="title">{title}</div>

      <div className="white-paper-container">
        <div className="pictures">
          <div className="left-column">
            <img className="medium-img image" src={SolutionImg1} alt="biotic eye" />

            <div className="small-img-container">
              <div className="dummy"></div>

              <div className="small-img image"></div>
            </div>
          </div>

          <div className="right-column">
            <img className="big-img image" src={SolutionImg2} alt="laptop with code" />
          </div>
        </div>

        <div className="informations">
          <div className="informations-container">
            <div className="subtitle">{subtitle}</div>

            <div className="content">{children}</div>

            <CustomButton onClick={() => router.push(`/white-paper/${id}`)}>
              {t('downloadWhitePaper')}
            </CustomButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default WhitePaper;
