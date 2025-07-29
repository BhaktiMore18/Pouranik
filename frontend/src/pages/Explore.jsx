import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaBookOpen, FaPen, FaSearch, FaLightbulb, FaBookReader, FaGlobe, FaStar, FaLink } from "react-icons/fa";
import { searchBooks, getAutocompleteSuggestions } from "../services/bookService";
import BookCard from "../components/BookCard";
import NoBookFound from "../components/NoBookFound";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Pagination from "../components/Pagination";
import styles from "./Explore.module.css";

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
  }, [searchParams]);

const popularBookSearches = [
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

const famousAuthors = [
  "J.K. Rowling",
  "Agatha Christie",
  "Stephen King",
  "Paulo Coelho",
  "George Orwell",
  "Jane Austen",
  "Mark Twain",
  "C.S. Lewis",
  "Leo Tolstoy",
  "Ernest Hemingway",
  "Dan Brown",
  "Haruki Murakami",
];


const popularSearches = searchType === 'books' ? popularBookSearches : famousAuthors;


  const handleQuickSearch = (term) => {
    setQuery(term);
    handleSearch({ preventDefault: () => { } }, term);
  };

  return (



    <div className={styles.exploreContainer}>
      {/* Header Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>
              <FiSearch className={styles.searchIcon} />
              <span>Explore Books</span>
            </h1>
          </div>
          <p className={styles.subHeading}>
            Search through millions of books and discover your next favorite
            read. Use our advanced search to find exactly what you're looking
            for.
          </p>
        </div>
      </section>


      {/* Search Section */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className="glass-effect-strong card-modern border-medium p-8">
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchTypeToggle}>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType('books');
                    setQuery('');
                    setSuggestions([]);
                  }}
                  className={`${styles.searchTypeButton} ${searchType === 'books' ? styles.active : ''}`}
                >
                  <FaBookOpen className="text-lg" />
                  Search by Title
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType('authors');
                    setQuery('');
                    setSuggestions([]);
                  }}
                  className={`${styles.searchTypeButton} ${searchType === 'authors' ? styles.active : ''}`}
                >
                  <FaPen className="text-lg" />
                  Search by Author
                </button>
              </div>

              <div className="relative w-full max-w-2xl mx-auto">
                <input
                  className="input-modern w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder={searchType === 'books' ? "Search for book titles..." : "Search for authors..."}
                  value={query}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none">
                  {searchType === 'books' ? <FaBookOpen /> : <FaPen />}
                </span>
              </div>
              
              {/* Autocomplete Dropdown */}
              <div className="w-full max-w-2xl mx-auto">
                <SearchAutocomplete
                  suggestions={suggestions}
                  onSelect={handleSuggestionSelect}
                  loading={loadingSuggestions}
                  activeType={searchType}
                />
              </div>
              
              <div className="w-full max-w-2xl mx-auto">
                <button
                  type="submit"
                  className={`mt-6 button-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="spinner" />
                      Searching through millions of books...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <FaSearch className="text-xl" />
                      Search {searchType === 'books' ? 'Books' : 'by Author'}
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Filters */}
            <h3
  className="font-semibold mb-6 text-center"
  style={{ color: "var(--text-primary)" }}
>
  {searchType === 'books' ? 'Popular Searches' : 'Famous Authors'}
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
        </section>

        {/* Results Section */}
        <section className="pb-16 results-section">
          <div className="container-modern flex flex-col items-center">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="flex flex-col justify-center gap-y-1 glass-effect card-small max-w-md mx-auto border-subtle">
                  <div className="pulse-animation text-6xl mb-6 flex flex-col justify-center items-center">
                    <FaBookOpen className="mx-auto" />
                  </div>
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
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-3/4"></div>
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
                        <FaLightbulb className="inline mr-1" /> Make sure your Google Books API key is properly
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
                    Found {totalItems} Amazing Books! <FaBookOpen className="inline ml-1" />
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
              <div className={styles.welcomeSection}>
                <div className={`${styles.glassEffect} ${styles.welcomeCard}`}>
                  <div className={styles.welcomeIconContainer}>
                    <FaBookReader className={styles.welcomeIcon} />
                  </div>
                  <h3 className={styles.welcomeTitle}>
                    Start Your Book Discovery Journey
                  </h3>
                  <p className={styles.welcomeSubtitle}>
                    Enter a book title, author name, or topic in the search box
                    above to begin exploring our vast collection.
                  </p>
                  <div className={styles.featureGridContainer}>
                    <div className={styles.featureGrid}>
                      {[
                        { icon: <FaBookOpen className={styles.featureIcon} />, label: "40M+ Books" },
                        { icon: <FaGlobe className={styles.featureIcon} />, label: "100+ Languages" },
                        { icon: <FaStar className={styles.featureIcon} />, label: "Rated & Reviewed" },
                        { icon: <FaLink className={styles.featureIcon} />, label: "Preview Links" },
                      ].map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                          <div className={styles.featureIconContainer}>
                            {feature.icon}
                          </div>
                          <div className={styles.featureLabel}>
                            {feature.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
  );
}