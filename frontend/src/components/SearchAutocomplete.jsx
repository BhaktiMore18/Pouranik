// data-tour attribute added for custom tour guide
import React from 'react';

/**
 * @component SearchAutocomplete
 * @param {Object} props Component props
 * @param {Array} props.suggestions Array of suggestion objects
 * @param {Function} props.onSelect Callback when a suggestion is selected
 * @param {boolean} props.loading Whether suggestions are being loaded
 * @param {string} props.activeType Current search type ('books' or 'authors')
 * @returns {JSX.Element}
 */
export default function SearchAutocomplete({ suggestions, onSelect, loading, activeType }) {
  if (!suggestions?.length && !loading) return null;

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50" data-tour="search-autocomplete">
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="spinner-small mb-2" />
          Loading suggestions...
        </div>
      ) : (
        <ul className="py-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => onSelect(suggestion)}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">
                  {suggestion.type === 'book' ? '📚' : '✍️'}
                </span>
                <div>
                  <div className="font-medium text-gray-900">
                    {suggestion.text}
                  </div>
                  {suggestion.type === 'book' && suggestion.authors?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      by {suggestion.authors.join(', ')}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {suggestion.type === 'book' ? 'Book Title' : 'Author'}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="p-2 bg-gray-50 border-t border-gray-100 text-xs text-center text-gray-500">
        {activeType === 'books' ? 'Search for book titles' : 'Search for authors'}
      </div>
    </div>
  );
} 