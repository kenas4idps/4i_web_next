import { ReactNode, useState } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const Accordion = ({ title, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-lg bg-gray-100 p-4 shadow-lg ${isOpen ? 'open' : ''} ${className || ''}`}
    >
      <div className="relative overflow-hidden">
        <div
          className="absolute top-0 right-0 h-4 w-4 cursor-pointer transition-transform duration-500"
          onClick={() => setIsOpen(value => !value)}
        >
          <div className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 transform bg-gray-800"></div>
          <div
            className={`absolute top-1/2 left-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 transform bg-gray-800 ${isOpen ? 'rotate-45' : ''}`}
          ></div>
        </div>

        <div
          className="cursor-pointer text-lg font-medium"
          onClick={() => setIsOpen(value => !value)}
        >
          {title}
        </div>

        <div className={`transition-all duration-500 ${isOpen ? 'h-auto pt-6' : 'h-0'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
