import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 ease-out flex items-center justify-center group ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
