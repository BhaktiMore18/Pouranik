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

  // FIX: Switching to a light background (bg-gray-100) and black text (text-black) 
  // for the suggestions list to maximize visibility and contrast, as requested.
  return (
    <div 
      className="absolute left-0 right-0 top-full mt-2 
                 bg-gray-100 rounded-xl shadow-2xl border border-gray-300 
                 max-h-80 overflow-y-auto z-[100] autocomplete-dropdown" 
      data-tour="search-autocomplete"
    >
      {loading ? (
        <div className="p-4 text-center text-gray-600">
          <div className="spinner-small mb-2" />
          Loading suggestions...
        </div>
      ) : (
        <ul className="py-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              // Set base text color to black for high contrast, and use a strong primary color on hover.
              className="px-4 py-2 text-black hover:bg-teal-500 hover:text-white cursor-pointer transition-colors duration-150"
              onClick={() => onSelect(suggestion)}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">
                  {suggestion.type === 'book' ? '📚' : '✍️'}
                </span>
                <div>
                  {/* Title text is now explicitly black */}
                  <div className="font-medium text-black">
                    {suggestion.text}
                  </div>
                  {suggestion.type === 'book' && suggestion.authors?.length > 0 && (
                    // Author text adjusted to gray for hierarchy, visible on light background
                    <div className="text-sm text-gray-600">
                      by {suggestion.authors.join(', ')}
                    </div>
                  )}
                  {/* Descriptor text adjusted to a subtle gray */}
                  <div className="text-xs text-gray-500 mt-1">
                    {suggestion.type === 'book' ? 'Book Title' : 'Author'}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Footer also switched to a light background */}
      <div className="p-2 bg-gray-200 border-t border-gray-300 text-xs text-center text-gray-500 rounded-b-xl">
        {activeType === 'books' ? 'Search for book titles' : 'Search for authors'}
      </div>
    </div>
  );
}
