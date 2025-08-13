// Utility functions for managing filter preferences in localStorage

const FILTER_PREFERENCES_KEY = 'pouranik_filter_preferences';

export const saveFilterPreferences = (preferences) => {
  try {
    localStorage.setItem(FILTER_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save filter preferences:', error);
  }
};

export const loadFilterPreferences = () => {
  try {
    const saved = localStorage.getItem(FILTER_PREFERENCES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load filter preferences:', error);
  }
  
  // Return default preferences
  return {
    sortBy: 'relevance',
    filterBy: '',
    printType: 'all',
    langRestrict: ''
  };
};

export const clearFilterPreferences = () => {
  try {
    localStorage.removeItem(FILTER_PREFERENCES_KEY);
  } catch (error) {
    console.warn('Failed to clear filter preferences:', error);
  }
};

// Preset filter combinations for common use cases
export const filterPresets = {
  freeEbooks: {
    name: 'Free eBooks',
    filters: {
      sortBy: 'relevance',
      filterBy: 'free-ebooks',
      printType: 'books',
      langRestrict: ''
    }
  },
  newestBooks: {
    name: 'Newest Books',
    filters: {
      sortBy: 'newest',
      filterBy: '',
      printType: 'books',
      langRestrict: ''
    }
  },
  fullPreview: {
    name: 'Full Preview Available',
    filters: {
      sortBy: 'relevance',
      filterBy: 'full',
      printType: 'books',
      langRestrict: ''
    }
  },
  englishBooks: {
    name: 'English Books',
    filters: {
      sortBy: 'relevance',
      filterBy: '',
      printType: 'books',
      langRestrict: 'en'
    }
  },
  allEbooks: {
    name: 'All eBooks',
    filters: {
      sortBy: 'relevance',
      filterBy: 'ebooks',
      printType: 'all',
      langRestrict: ''
    }
  }
};

export const getPresetByName = (name) => {
  return Object.values(filterPresets).find(preset => preset.name === name);
};

export const applyPreset = (presetName, setters) => {
  const preset = getPresetByName(presetName);
  if (preset && setters) {
    const { setSortBy, setFilterBy, setPrintType, setLangRestrict } = setters;
    const { sortBy, filterBy, printType, langRestrict } = preset.filters;
    
    setSortBy(sortBy);
    setFilterBy(filterBy);
    setPrintType(printType);
    setLangRestrict(langRestrict);
    
    // Save the applied preset as current preferences
    saveFilterPreferences(preset.filters);
  }
};
