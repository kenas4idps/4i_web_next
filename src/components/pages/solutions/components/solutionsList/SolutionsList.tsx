'use client';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { SolutionsListFE } from '@/api/models/shared';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';
import BlurCircle from '@/components/common/blurCircle';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import './SolutionsList.scss';

interface Props {
  list?: SolutionsListFE[];
}

const SolutionsList = ({ list }: Props) => {
  const router = useRouter();
  const t = useTranslations('solutions');

  return (
    <PageWrapper className="solutions-list">
      {list?.map((solution, key) => {
        return (
          <div className="solution-container" key={key}>
            <div
              className="picture"
              style={{ backgroundImage: `url(${solution.bannerImage.url})` }}
            ></div>

            <BlurCircle size="1285px" className="blur-circle-container" />

            <div className="content-container">
              <div className="content">
                <div className="tag">{solution.label}</div>

                <div className="title">{solution.title}</div>

                <div className="description">
                  <RichTextTransformCmp>{solution.description}</RichTextTransformCmp>
                </div>

                <CustomButton onClick={() => router.push(solution.url)}>
                  {t('learnMore')}
                </CustomButton>
              </div>
            </div>
          </div>
        );
      })}
    </PageWrapper>
  );
};

export default SolutionsList;
