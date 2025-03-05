import { useEffect, useRef } from 'react';
import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        if (window.scrollY > 300) {
          buttonRef.current.style.display = 'flex';
        } else {
          buttonRef.current.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      className="scroll-to-top-button"
      onClick={scrollToTop}
      style={{ display: 'none' }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
