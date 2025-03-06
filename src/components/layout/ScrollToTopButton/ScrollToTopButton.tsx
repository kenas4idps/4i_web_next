'use client';

import PageWrapper from '@/components/common/pageWrapper';
import React, { useEffect } from 'react';
import './ScrollToTopButton.scss';

export default function ScrollToTopButton() {
  const scrollBtnRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (scrollY >= 1000) {
        if (scrollBtnRef.current !== null) {
          scrollBtnRef.current.classList.add('show');
        }
      } else {
        if (scrollBtnRef.current !== null) {
          scrollBtnRef.current.classList.remove('show');
        }
      }
    });
  }, []);

  return (
    <PageWrapper>
      <div ref={scrollBtnRef} onClick={() => onClick()} className="scroll-to-top-btn">
        <div className="arrow"></div>
      </div>
    </PageWrapper>
  );
}

export {};
