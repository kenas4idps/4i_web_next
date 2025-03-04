import PageWrapper from 'components/common/pageWrapper';
import React from 'react';
import './ScrollToTopButton.scss';

export default function ScrollToTopButton() {
  const scrollBtnRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY >= 1000) {
      scrollBtnRef.current !== null && scrollBtnRef?.current.classList.add('show');
    } else {
      scrollBtnRef.current !== null && scrollBtnRef?.current.classList.remove('show');
    }
  });

  return (
    <PageWrapper>
      <div ref={scrollBtnRef} onClick={() => onClick()} className="scroll-to-top-btn">
        <div className="arrow"></div>
      </div>
    </PageWrapper>
  );
}

export {};
