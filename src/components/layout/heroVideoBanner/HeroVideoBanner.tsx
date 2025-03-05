'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';

import CustomButton, { BtnStyles } from '@/components/common/customButton';
import PageWrapper from '@/components/common/pageWrapper';

import { getColoredText } from '@/utils/ColoredText';

import './HeroVideoBanner.scss';

interface BtnItem {
  btnTxt: string;
  onClickBtn: () => void;
  btnStyle?: string;
}

interface Props {
  linkVideo?: string;
  videoType?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  btnList: BtnItem[];
}

const HeroVideoBanner = ({
  linkVideo,
  videoType,
  title,
  subtitle,
  description,
  btnList,
}: Props) => {
  const t = useTranslations('homepage');

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const vidRef = useRef<HTMLVideoElement>(null);

  const videoControl = () => {
    if (isPlaying && vidRef.current) {
      vidRef.current.pause();
    } else if (!isPlaying && vidRef.current) {
      vidRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="video-wrapper">
      <div className="main-container">
        <PageWrapper className="">
          <h1 className="title">{getColoredText(title || '')}</h1>

          <h2 className="subtitle">{subtitle}</h2>

          <ReactMarkdown>{`${description}`}</ReactMarkdown>

          <div className="btn-container">
            {btnList.map((item, key) => {
              return (
                <CustomButton
                  onClickBtn={item.onClickBtn}
                  btnStyle={item.btnStyle as BtnStyles}
                  key={key}
                >
                  {item.btnTxt}
                </CustomButton>
              );
            })}
          </div>

          <div className={`play-button-container`} onClick={videoControl}>
            <p className="play-button-text">{`${isPlaying ? t('pauseVideo') : t('playVideo')}`}</p>
            <div className={`play-button ${isPlaying ? 'pause' : 'play'}`}></div>
          </div>
        </PageWrapper>
      </div>

      {linkVideo && (
        <video ref={vidRef} className="hero-video-banner" autoPlay loop muted playsInline>
          <source src={linkVideo} type={`${videoType}`} />
        </video>
      )}
    </header>
  );
};

export default HeroVideoBanner;
