import { useEffect, useRef, useState } from 'react';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { IconFilter, IconChevronDown, IconList, IconCheck, IconClock } from '@tabler/icons-react';

export function FilterSelect({ filter, setFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  const FILTER_OPTIONS = [
    { value: 'all', label: t`All Tasks`, icon: IconList },
    { value: 'completed', label: t`Completed Tasks`, icon: IconCheck },
    { value: 'pending', label: t`Pending Tasks`, icon: IconClock }
  ];

  const selectedFilter = FILTER_OPTIONS.find(option => option.value === filter);

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onKeyDown={(e) => {
          if(e.key === 'Escape') setIsDropdownOpen(false);
        }}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <IconFilter className="w-4 h-4 text-blue-500" />
          <span>{selectedFilter?.label ?? t`All Tasks`}</span>
        </div>
        <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                      {FILTER_OPTIONS.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFilterSelect(option.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors duration-300 ${
                    filter === option.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
