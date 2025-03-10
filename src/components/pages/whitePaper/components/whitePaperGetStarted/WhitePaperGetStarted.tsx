'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import FullWidth from '@/components/common/fullWidth';
import CustomButton from '@/components/common/customButton';

const TeamImg = '/assets/img/team2.webp';

import './WhitePaperGetStarted.scss';

const WhitePaperGetStarted = () => {
  const router = useRouter();
  const t = useTranslations('whitePaper');

  return (
    <FullWidth>
      <div className="white-paper-get-started">
        <div className="left-column">
          <div className="title">{t('anyQuestionTitle')}</div>

          <div className="description">{t('anyQuestionDescription')}</div>

          <CustomButton onClick={() => router.push('/contact-us')}>
            {t('anyQuestionBtn')}
          </CustomButton>
        </div>

        <div className="right-column">
          <div className="team-image" style={{ backgroundImage: `url(${TeamImg})` }}></div>
        </div>
      </div>
    </FullWidth>
  );
};

export default WhitePaperGetStarted;
