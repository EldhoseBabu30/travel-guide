// src/components/FloatingButton.jsx
import React from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid'; // Adjust the path for v2

const FloatingButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-orange-400 text-white rounded-full shadow-lg hover:bg-orange-500 transition-colors"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

export default FloatingButton;
