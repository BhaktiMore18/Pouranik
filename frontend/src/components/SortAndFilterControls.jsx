import React from 'react';
import { FiChevronDown, FiFilter, FiArrowUp } from 'react-icons/fi';
import { FaBook, FaGlobe, FaStar, FaDownload, FaSort } from 'react-icons/fa';
import QuickFilters from './QuickFilters';

const SortAndFilterControls = ({ 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy, 
  printType, 
  setPrintType,
  langRestrict,
  setLangRestrict,
  onApplyFilters,
  isLoading = false
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: <FaStar /> },
    { value: 'newest', label: 'Newest First', icon: <FaSort /> }
  ];

  const filterOptions = [
    { value: '', label: 'All Books', icon: <FaBook /> },
    { value: 'partial', label: 'Preview Available', icon: <FaStar /> },
    { value: 'full', label: 'Full Text Available', icon: <FaBook /> },
    { value: 'free-ebooks', label: 'Free eBooks', icon: <FaDownload /> },
    { value: 'paid-ebooks', label: 'Paid eBooks', icon: <FaDownload /> },
    { value: 'ebooks', label: 'All eBooks', icon: <FaDownload /> }
  ];

  const printTypeOptions = [
    { value: 'all', label: 'All Types', icon: <FaBook /> },
    { value: 'books', label: 'Books Only', icon: <FaBook /> },
    { value: 'magazines', label: 'Magazines Only', icon: <FaBook /> }
  ];

  const languageOptions = [
    { value: '', label: 'All Languages', icon: <FaGlobe /> },
    { value: 'en', label: 'English', icon: <FaGlobe /> },
    { value: 'es', label: 'Spanish', icon: <FaGlobe /> },
    { value: 'fr', label: 'French', icon: <FaGlobe /> },
    { value: 'de', label: 'German', icon: <FaGlobe /> },
    { value: 'it', label: 'Italian', icon: <FaGlobe /> },
    { value: 'pt', label: 'Portuguese', icon: <FaGlobe /> },
    { value: 'zh', label: 'Chinese', icon: <FaGlobe /> },
    { value: 'ja', label: 'Japanese', icon: <FaGlobe /> },
    { value: 'ko', label: 'Korean', icon: <FaGlobe /> },
    { value: 'ru', label: 'Russian', icon: <FaGlobe /> },
    { value: 'ar', label: 'Arabic', icon: <FaGlobe /> },
    { value: 'hi', label: 'Hindi', icon: <FaGlobe /> }
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    // Call onApplyFilters with the new sort value
    const newFilters = { sortBy: value, filterBy, printType, langRestrict };
    onApplyFilters(newFilters);
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
    // Call onApplyFilters with the new filter value
    const newFilters = { sortBy, filterBy: value, printType, langRestrict };
    onApplyFilters(newFilters);
  };

  const handlePrintTypeChange = (value) => {
    setPrintType(value);
    // Call onApplyFilters with the new print type value
    const newFilters = { sortBy, filterBy, printType: value, langRestrict };
    onApplyFilters(newFilters);
  };

  const handleLanguageChange = (value) => {
    setLangRestrict(value);
    // Call onApplyFilters with the new language value
    const newFilters = { sortBy, filterBy, printType, langRestrict: value };
    onApplyFilters(newFilters);
  };

  const handleQuickFilter = (filters) => {
    // Create the new filter state by merging current state with the new filters
    const newFilters = {
      sortBy: filters.sortBy !== undefined ? filters.sortBy : sortBy,
      filterBy: filters.filterBy !== undefined ? filters.filterBy : filterBy,
      printType: filters.printType !== undefined ? filters.printType : printType,
      langRestrict: filters.langRestrict !== undefined ? filters.langRestrict : langRestrict
    };

    // Update all states that are defined in the filters object
    if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
    if (filters.filterBy !== undefined) setFilterBy(filters.filterBy);
    if (filters.printType !== undefined) setPrintType(filters.printType);
    if (filters.langRestrict !== undefined) setLangRestrict(filters.langRestrict);
    
    // Call onApplyFilters with the new filter state immediately
    onApplyFilters(newFilters);
  };

  const SelectDropdown = ({ label, value, options, onChange, icon }) => (
    <div className="relative">
      <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
        {icon}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          className="select-dropdown w-full pl-4 pr-10 py-3 border-2 rounded-xl appearance-none cursor-pointer transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="dropdown-option"
            >
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-200" 
          style={{ color: "var(--text-secondary)" }}
        />
      </div>
    </div>
  );

  return (
    <div className="glass-effect-strong card-modern border-medium p-8 mb-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <FiFilter 
          className="text-2xl" 
          style={{ color: "var(--primary-600)" }}
        />
        <h3 
          className="text-xl font-bold" 
          style={{ color: "var(--text-primary)" }}
        >
          Sort & Filter
        </h3>
      </div>
      
      {/* Quick Filters */}
      <QuickFilters onQuickFilter={handleQuickFilter} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <SelectDropdown
          label="Sort By"
          value={sortBy}
          options={sortOptions}
          onChange={handleSortChange}
          icon={<FaSort style={{ color: "var(--accent-blue)" }} />}
        />
        
        <SelectDropdown
          label="Availability"
          value={filterBy}
          options={filterOptions}
          onChange={handleFilterChange}
          icon={<FiFilter style={{ color: "var(--accent-emerald)" }} />}
        />
        
        <SelectDropdown
          label="Content Type"
          value={printType}
          options={printTypeOptions}
          onChange={handlePrintTypeChange}
          icon={<FaBook style={{ color: "var(--accent-orange)" }} />}
        />
        
        <SelectDropdown
          label="Language"
          value={langRestrict}
          options={languageOptions}
          onChange={handleLanguageChange}
          icon={<FaGlobe style={{ color: "var(--accent-yellow)" }} />}
        />
      </div>

      {/* Active filters indicator */}
      {(sortBy !== 'relevance' || filterBy || printType !== 'all' || langRestrict) && (
        <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="flex flex-wrap items-center gap-3">
            <span 
              className="text-sm font-medium flex items-center gap-2" 
              style={{ color: "var(--text-secondary)" }}
            >
              <FaStar style={{ color: "var(--accent-yellow)" }} />
              Active filters:
            </span>
            {sortBy !== 'relevance' && (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "var(--accent-blue)",
                  color: "white"
                }}
              >
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
              </span>
            )}
            {filterBy && (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "var(--accent-emerald)",
                  color: "white"
                }}
              >
                Filter: {filterOptions.find(opt => opt.value === filterBy)?.label}
              </span>
            )}
            {printType !== 'all' && (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "var(--accent-orange)",
                  color: "white"
                }}
              >
                Type: {printTypeOptions.find(opt => opt.value === printType)?.label}
              </span>
            )}
            {langRestrict && (
              <span 
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "var(--accent-yellow)",
                  color: "white"
                }}
              >
                Language: {languageOptions.find(opt => opt.value === langRestrict)?.label}
              </span>
            )}
            <button
              onClick={() => {
                // Reset all filters
                setSortBy('relevance');
                setFilterBy('');
                setPrintType('all');
                setLangRestrict('');
                // Call onApplyFilters with the reset values
                const resetFilters = { 
                  sortBy: 'relevance', 
                  filterBy: '', 
                  printType: 'all', 
                  langRestrict: '' 
                };
                onApplyFilters(resetFilters);
              }}
              className="clear-filters-btn px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:transform hover:scale-105"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortAndFilterControls;
