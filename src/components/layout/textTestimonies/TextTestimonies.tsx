import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TestimonialContext } from 'providers/testimonialDataProvider/testimonialProvider';

import './TextTestimonies.scss';

interface Props {
  isDarkBg?: boolean;
  onFetch?: (isEmpty: boolean) => void;
}
const TextTestimonies = ({ isDarkBg = false, onFetch }: Props) => {
  const { i18n } = useTranslation();
  const { writtenTestimonials, init } = useContext(TestimonialContext);

  useEffect(() => {
    if (writtenTestimonials && writtenTestimonials?.length < 1) {
      onFetch && onFetch(true);
    } else {
      onFetch && onFetch(false);
    }
    init();
    //eslint-disable-next-line
  }, [writtenTestimonials, i18n.language]);

  const [index, setIndex] = useState(0);

  const goToprev = () => {
    if (index > 0) {
      setIndex(current => current - 1);
    }
  };

  const goToNext = () => {
    if (writtenTestimonials && index < writtenTestimonials?.length - 1) {
      setIndex(current => current + 1);
    }
  };

  return (
    <>
      {writtenTestimonials && writtenTestimonials?.length > 0 && (
        <div className={`text-testimonies ${isDarkBg && 'dark-bg'}`}>
          <div
            className={`arrow-container left-arrow ${index <= 0 ? 'innactive' : ''}`}
            onClick={() => {
              goToprev();
            }}
          >
            <div className="arrow"></div>
          </div>

          <div className="testimonies-container">
            <div className="carousel" style={{ transform: `translate(${index * 100 * -1}%, 0)` }}>
              {writtenTestimonials?.map((testimony, key) => {
                return (
                  <div className="carousel-item" key={key}>
                    <div className="testimony-container">
                      <div
                        className="avatar"
                        style={{ backgroundImage: `url(${testimony?.client_Image?.url})` }}
                      ></div>

                      <div className="content">{testimony?.testimonial_Text}</div>

                      <div className="author">{testimony?.client_Name}</div>

                      <div className="role">{testimony?.client_Occupation}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`arrow-container right-arrow ${writtenTestimonials && index >= writtenTestimonials?.length - 1 ? 'innactive' : ''}`}
            onClick={() => {
              goToNext();
            }}
          >
            <div className="arrow"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextTestimonies;
