import React from 'react';
import { FaBook, FaGift, FaStar, FaGlobe, FaClock } from 'react-icons/fa';

const QuickFilters = ({ onQuickFilter, isLoading = false }) => {
  const quickFilterOptions = [
    {
      label: 'Free eBooks',
      icon: <FaGift />,
      filters: { filterBy: 'free-ebooks', printType: 'books' },
      color: 'emerald'
    },
    {
      label: 'Newest Books',
      icon: <FaClock />,
      filters: { sortBy: 'newest', printType: 'books' },
      color: 'blue'
    },
    {
      label: 'Full Preview',
      icon: <FaStar />,
      filters: { filterBy: 'full', printType: 'books' },
      color: 'orange'
    },
    {
      label: 'English Books',
      icon: <FaGlobe />,
      filters: { langRestrict: 'en', printType: 'books' },
      color: 'yellow'
    },
    {
      label: 'All eBooks',
      icon: <FaBook />,
      filters: { filterBy: 'ebooks' },
      color: 'primary'
    }
  ];

  const getColorStyles = (color) => {
    const colorMap = {
      emerald: { bg: 'var(--accent-emerald)', hover: 'var(--success-500)' },
      blue: { bg: 'var(--accent-blue)', hover: 'var(--primary-600)' },
      orange: { bg: 'var(--accent-orange)', hover: 'var(--warning-500)' },
      yellow: { bg: 'var(--accent-yellow)', hover: 'var(--warning-500)' },
      primary: { bg: 'var(--primary-500)', hover: 'var(--primary-600)' }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="mb-6">
      <h4 
        className="text-sm font-semibold mb-4 flex items-center gap-2" 
        style={{ color: "var(--text-primary)" }}
      >
        <FaStar style={{ color: "var(--accent-yellow)" }} />
        Quick Filters
      </h4>
      <div className="flex flex-wrap gap-3">
        {quickFilterOptions.map((option, index) => {
          const colors = getColorStyles(option.color);
          return (
            <button
              key={index}
              onClick={() => onQuickFilter(option.filters)}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-sm border border-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              style={{
                background: colors.bg,
                color: 'white'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = colors.hover;
                  e.target.style.boxShadow = "var(--shadow-md)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = colors.bg;
                  e.target.style.boxShadow = "var(--shadow-sm)";
                }
              }}
            >
              <span className="text-xs">{option.icon}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickFilters;
