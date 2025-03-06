import { useRouter } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';
import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';
import BlurCircle from '@/components/common/blurCircle';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';
import Image from 'next/image';

import ComputerIcon from '@/public/assets/icons/computer.svg';
import BlockchainIcon from '@/public/assets/icons/blockchain.svg';
import CloudIcon from '@/public/assets/icons/cloud.svg';
import HubspotIcon from '@/public/assets/icons/hubspot.svg';

import './AllSolution.scss';

const AllSolution = () => {
  const router = useRouter();
  const t = useTranslations('homepage');

  const listOfSolution = [
    {
      icon: ComputerIcon,
      title: t('solution1Title'),
      description: t('solution1Description'),
      url: '/solution/software-development',
    },
    {
      icon: CloudIcon,
      title: t('solution3Title'),
      description: t('solution3Description'),
      url: '/solution/salesforce-crm',
    },
    {
      icon: BlockchainIcon,
      title: t('solution2Title'),
      description: t('solution2Description'),
      url: '/solution/blockchain-development',
    },

    {
      icon: HubspotIcon,
      title: t('solution4Title'),
      description: t('solution4Description'),
      url: '/solution/hubspot',
    },
  ];

  return (
    <PageWrapper className="all-solution">
      <BlurCircle size="850px" className="blur-circle-container" />

      <div className="left-container">
        <div className="title">{t('allSolutionTitle')}</div>

        <div className="description">
          <RichTextTransformCmp>{t('allSolutionDescription')}</RichTextTransformCmp>
        </div>

        <div className="btn-container">
          <CustomButton onClick={() => router.push('/solutions')}>
            {t('allSolutionBtn')}
          </CustomButton>
        </div>
      </div>

      <div className="right-container">
        <div className="all-solutions-container">
          {listOfSolution.map((solution, key) => {
            return (
              <div onClick={() => router.push(solution.url)} className="solution" key={key}>
                <div className="solution-container">
                  <div className="solution-icon">
                    <div className="img-container">
                      <Image fill src={solution.icon} alt={`icon ${solution.title}`} />
                    </div>
                  </div>

                  <div className="solution-title">{solution.title}</div>

                  <div className="solution-description">
                    <RichTextTransformCmp>{solution.description}</RichTextTransformCmp>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default AllSolution;
