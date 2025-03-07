'use client';

import { ReactNode, useState } from 'react';

import './Accordion.scss';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const Accordion = ({ title, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion ${isOpen && 'open'} ${className && className}`}>
      <div className="accordion-container">
        <div className="accordion-btn" onClick={() => setIsOpen(value => !value)}></div>

        <div className="accordion-title" onClick={() => setIsOpen(value => !value)}>
          {title}
        </div>

        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
