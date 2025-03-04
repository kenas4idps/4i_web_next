import { useContext, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

import { TestimonialContext } from '@/providers/testimonialDataProvider/testimonialProvider';

import PlayVideoIcon from '@/public/assets/icons/playVideo.svg';

import variables from '@/styles/_other.module.scss';
import './VideoTestimonies.scss';

interface Props {
  title: string;
  onFetch?: (isEmpty: boolean) => void;
}

const dektopItemSize = 50;
const mobileItemSize = 100;

const VideoTestimonies = ({ title, onFetch }: Props) => {
  const locale = useLocale();
  const { videoTestimonials, init } = useContext(TestimonialContext);

  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>([]);

  const videoRefArray = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (videoTestimonials && videoTestimonials?.length > 0) {
      if (onFetch) onFetch(false);
      setIsVideoPlaying(new Array(videoTestimonials?.length)?.fill(false));
    } else {
      if (onFetch) onFetch(true);
    }

    init();
    // eslint-disable-next-line
  }, [videoTestimonials, locale]);

  const goToprev = () => {
    if (index > 0) {
      setIndex(current => current - 1);
    }
  };

  const goToNext = (isMobile = false) => {
    if (isMobile) {
      if (videoTestimonials && index < videoTestimonials?.length - 1) {
        setIndex(current => current + 1);
      }
    } else {
      if (videoTestimonials && index < videoTestimonials?.length - 2) {
        setIndex(current => current + 1);
      }
    }
  };

  const getTranslate = () => {
    const itemSize = getItemSize();
    return index * itemSize * -1;
  };

  const getItemSize = () => {
    if (isMobile) {
      return mobileItemSize;
    } else {
      return dektopItemSize;
    }
  };

  const playVideo = (id: number) => {
    if (videoRefArray?.current[id]) {
      videoRefArray?.current[id]?.play();

      setIsVideoPlaying(prevState =>
        prevState?.map((value, index) => (index === id ? true : value)),
      );
    }
  };

  const pauseVideo = (id: number) => {
    if (videoRefArray?.current[id]) {
      videoRefArray?.current[id]?.pause();

      setIsVideoPlaying(prevState =>
        prevState?.map((value, index) => (index === id ? false : value)),
      );
    }
  };

  useEffect(() => {
    const phoneSize = parseInt(variables?.mediaQueryPhone?.slice(0, -2));

    const handleResize = () => {
      if (window.innerWidth <= phoneSize) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {videoTestimonials && videoTestimonials?.length > 0 && (
        <div className="video-testimonies">
          <div className="top-container">
            <div className="title">{title}</div>

            <div className="controls">
              <div
                className={`arrow left-arrow ${index <= 0 ? 'innactive' : ''} `}
                onClick={() => goToprev()}
              ></div>

              <div
                className={`arrow right-arrow desktop-only ${videoTestimonials && index >= videoTestimonials?.length - 2 ? 'innactive' : ''} `}
                onClick={() => goToNext()}
              ></div>

              <div
                className={`arrow right-arrow mobile-only ${videoTestimonials && index >= videoTestimonials?.length - 1 ? 'innactive' : ''} `}
                onClick={() => goToNext(true)}
              ></div>
            </div>
          </div>

          <div className="carousel" style={{ transform: `translate(${getTranslate()}%, 0)` }}>
            {videoTestimonials &&
              videoTestimonials?.map((testimony, key) => {
                return (
                  <div
                    className="testimony-container"
                    key={key}
                    style={{ flex: `0 0 ${getItemSize()}%` }}
                  >
                    <div className="video-container">
                      <video
                        className="video"
                        poster={testimony?.video?.thumbnail}
                        ref={el => {
                          if (el) {
                            videoRefArray.current[key] = el;
                          }
                        }}
                        onClick={() => pauseVideo(key)}
                        onEnded={() => pauseVideo(key)}
                      >
                        <source src={testimony?.video?.url} type={`${testimony?.video?.type}`} />
                      </video>

                      {!isVideoPlaying[key] && (
                        <div
                          className="play-btn"
                          onClick={() => playVideo(key)}
                          style={{ backgroundImage: `url(${PlayVideoIcon})` }}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTestimonies;
