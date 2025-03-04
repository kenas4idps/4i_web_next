import { useRef, useState } from 'react';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import CustomButton from '@/components/common/customButton';

import LearnMorePicture from '@/public/assets/img/learnMore.webp';
import PlayVideoIcon from '@/public/assets/icons/playVideo.svg';

import './LearnMore.scss';

const LearnMore = () => {
  const t = useTranslations('homepage');
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="learn-more">
      <div className="video-picture" style={{ backgroundImage: `url(${LearnMorePicture})` }}></div>

      <PageWrapper className="learn-more-container">
        <div className="video-container">
          <video ref={videoRef} onClick={() => pauseVideo()} onEnded={() => pauseVideo()}>
            <source src={`/public/assets/video/learnMore.mp4#t=1`} type="video/mp4" />
          </video>

          {!isVideoPlaying && (
            <div
              className="play-btn"
              style={{ backgroundImage: `url(${PlayVideoIcon})` }}
              onClick={() => playVideo()}
            ></div>
          )}
        </div>

        <div className="content-container">
          <div className="title">{t('learnMoreTitle')}</div>

          <div className="content">{t('learMoreContent')}</div>

          <CustomButton onClickBtn={() => router.push('/about-us')}>
            {t('learnMoreBtn')}
          </CustomButton>
        </div>
      </PageWrapper>
    </div>
  );
};

export default LearnMore;
