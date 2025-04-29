import { useState, useRef, ReactNode } from 'react';

interface CollapsibleInfoProps {
    title: string;
    children: ReactNode; // children can be any valid React node (elements, strings, etc.)
  }

const Dropdown = ({ title, children }: CollapsibleInfoProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="border border-gray-200 rounded-md mb-2">
        <button
          className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0',
            overflow: 'hidden',
            transition: 'max-height 0.2s ease-in-out',
          }}
          aria-hidden={!isOpen}
        >
          <div className="px-4 py-3 border-t border-gray-200">
            {children}
          </div>
        </div>
      </div>
    );
  };
export default Dropdown;