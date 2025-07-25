import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchBooks, getAutocompleteSuggestions } from "../services/bookService";
import BookCard from "../components/BookCard";
import NoBookFound from "../components/NoBookFound";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Pagination from "../components/Pagination";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams] = useSearchParams();
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searchType, setSearchType] = useState('books'); // 'books' or 'authors'
  const debounceTimerRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Changed to 1-based for UI
  const [totalItems, setTotalItems] = useState(0);
  const maxResultsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / maxResultsPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      handleSearch(null, query, newPage - 1); // Convert to 0-based for API
      // Scroll to top of results
      const resultsSection = document.querySelector('.results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Function to debounce the autocomplete API calls
  const debouncedGetSuggestions = useCallback(async (searchQuery) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const results = await getAutocompleteSuggestions(searchQuery, searchType);
        setSuggestions(results);
      } catch (error) {
        console.error("Error getting suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300); // 300ms delay
  }, [searchType]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedGetSuggestions(value);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion.text);
    setSuggestions([]); // Clear suggestions
    handleSearch(null, suggestion.text); // Trigger search with selected suggestion
  };

  /**
   * @function handleSearch
   * @param {Event} e - The event object from the form submission
   * @param {string|null} searchTerm - The search term to use, defaults to the current query state
   * @param {number} page - The page number to fetch results
   * @description This function handles the search operation. It fetches books based on the search term and updates the state accordingly.
   * It also handles pagination by calculating the start index based on the current page and maximum results per page.
   */
  const handleSearch = useCallback(
    async (e, searchTerm = null, page = 0) => {
      if (e && e.preventDefault) e.preventDefault();
      const searchQuery = searchTerm || query;
      if (!searchQuery.trim()) return;

      setLoading(true);
      setSearched(true);
      setSuggestions([]); // Clear suggestions when search is triggered

      try {
        const startIndex = page * maxResultsPerPage;
        // If searching for authors, add the inauthor: prefix
        const finalQuery = searchType === 'authors' ? `inauthor:${searchQuery}` : searchQuery;
        const response = await searchBooks(
          finalQuery,
          startIndex,
          maxResultsPerPage
        );

        setBooks(response.items || []);
        setTotalItems(response.totalItems || 0);
        setCurrentPage(page + 1); // Convert to 1-based for UI
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    },
    [query, maxResultsPerPage, searchType]
  );

  // Handle genre filtering from URL params
  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      setQuery(genreParam);
      handleSearch({ preventDefault: () => { } }, genreParam, 0);
    }
  }, [searchParams, handleSearch]);

  const popularSearches = [
    "Harry Potter",
    "Fiction",
    "Self Help",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Biography",
    "History",
    "Philosophy",
    "Psychology",
    "Business",
    "Technology",
  ];

  const handleQuickSearch = (term) => {
    setQuery(term);
    handleSearch({ preventDefault: () => { } }, term);
  };

  return (
    <React.Fragment>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="page-hero section-spacing-small text-center flex items-center justify-center">
  <div className="container-modern mx-auto flex flex-col items-center justify-center text-center">
    <h1
      className="heading-primary mb-6 floating-animation"
      style={{ color: "var(--primary-700)" }}
    >
      🔍 Explore Books
    </h1>
    <p
      className="text-body-large max-w-4xl mb-12"
      style={{ color: "var(--text-secondary)" }}
    >
      Search through millions of books and discover your next favorite read.
      Use our advanced search to find exactly what you're looking for.
    </p>
  </div>
</section>


        {/* Search Section */}
        <section className="pb-16">
          <div className="container-narrow">
            <div className="glass-effect-strong card-modern border-medium">
              <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
                <div className="relative w-full">
                  {/* Search Type Toggle */}
                  <div className="flex justify-center mb-6">
                    <div className="search-type-toggle">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchType('books');
                          setQuery('');
                          setSuggestions([]);
                        }}
                        className={`search-type-button ${searchType === 'books' ? 'active' : ''}`}
                      >
                        <span className="text-lg">📚</span>
                        Search by Title
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchType('authors');
                          setQuery('');
                          setSuggestions([]);
                        }}
                        className={`search-type-button ${searchType === 'authors' ? 'active' : ''}`}
                      >
                        <span className="text-lg">✍️</span>
                        Search by Author
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      className="input-modern w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder={searchType === 'books' ? "Search for book titles..." : "Search for authors..."}
                      value={query}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none">
                      {searchType === 'books' ? '📚' : '✍️'}
                    </span>
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  <SearchAutocomplete
                    suggestions={suggestions}
                    onSelect={handleSuggestionSelect}
                    loading={loadingSuggestions}
                    activeType={searchType}
                  />
                </div>
                <button
                  type="submit"
                  className={`mt-14 button-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="spinner" />
                      Searching through millions of books...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-xl">🔍</span>
                      Search {searchType === 'books' ? 'Books' : 'by Author'}
                    </span>
                  )}
                </button>
              </form>

              {/* Quick Filters */}
              <div className="popular-searches-section">
                <h3
                  className="font-semibold mb-6 text-center"
                  style={{ color: "var(--text-primary)" }}
                >
                  Popular Searches
                </h3>
                <div className="search-button-grid">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="search-button"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="pb-16 results-section">
          <div className="container-modern flex flex-col items-center">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="glass-effect card-small max-w-md mx-auto border-subtle">
                  <div className="pulse-animation text-6xl mb-6">📚</div>
                  <h3
                    className="heading-tertiary mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Searching Books
                  </h3>
                  <p
                    className="text-body"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Finding the perfect books for you...
                  </p>
                  <div className="mt-6">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* No Results */}
            {searched && !loading && books.length === 0 && (
              <div className="text-center py-16">
                <div className="glass-effect card-modern flex flex-col items-center md:flex-row max-w-5xl mx-auto border-subtle">
                  <div>
                    <NoBookFound />
                    <h3
                      className="text-heading-2 mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      No Books Found
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 gap-y-8">
                    <p
                      className="text-body mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      We couldn't find any books matching your search. Try different
                      keywords or browse our popular genres.
                    </p>
                    <div className="space-y-8">
                      <p className="glass-effect text-xs !p-3 rounded-xl !border !border-red-400 border-opacity-30">
                        💡 Make sure your Google Books API key is properly
                        configured
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => {
                            setQuery("");
                            setSearched(false);
                            setBooks([]);
                          }}
                          className="button-secondary !hover:text-white"
                        >
                          Clear Search
                        </button>
                        <Link
                          to="/genres"
                          className="button-primary !hover:text-white no-underline text-center"
                        >
                          Browse Genres
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {books.length > 0 && (
              <div className="w-full !my-16">
                <div className="text-left mb-12">
                  <h2
                    className="heading-secondary !mb-4"
                    style={{ color: "var(--primary-700)" }}
                  >
                    Found {totalItems} Amazing Books! 📚
                  </h2>
                  <p
                    className="text-body !mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {query && `Results for "${query}"`}
                  </p>
                </div>

                <div className="grid-modern grid-3">
                  {books.map((book, index) => (
                    <div
                      key={book.id || index}
                      className="slide-in-animation"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </div>
            )}

            {/* Welcome State */}
            {!searched && !loading && (
              <div className="text-center py-16">
                <div className="glass-effect card-modern max-w-2xl mx-auto border-subtle">
                  <div className="text-8xl mb-8 floating-animation">📖</div>
                  <h3 className="heading-secondary text-white mb-6">
                    Start Your Book Discovery Journey
                  </h3>
                  <p className="text-body-large text-gray-500 mb-8 max-w-lg mx-auto">
                    Enter a book title, author name, or topic in the search box
                    above to begin exploring our vast collection.
                  </p>
                  <div className="grid grid-cols-2 !mt-4 md:grid-cols-4 gap-4">
                    {[
                      { icon: "📚", label: "40M+ Books" },
                      { icon: "🌍", label: "100+ Languages" },
                      { icon: "⭐", label: "Rated & Reviewed" },
                      { icon: "🔗", label: "Preview Links" },
                    ].map((feature, index) => (
                      <div key={index} className="text-center p-4">
                        <div className="text-3xl mb-2">{feature.icon}</div>
                        <div className="text-small text-gray-500">
                          {feature.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

    </React.Fragment>
  );
}