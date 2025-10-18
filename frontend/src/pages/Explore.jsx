import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {
  FaBookOpen,
  FaPen,
  FaSearch,
  FaLightbulb,
  FaBookReader,
  FaGlobe,
  FaStar,
  FaLink,
} from "react-icons/fa";
import {
  searchBooks,
  getAutocompleteSuggestions,
} from "../services/bookService";
import BookCard from "../components/BookCard";
import NoBookFound from "../components/NoBookFound";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Pagination from "../components/Pagination";

import SortAndFilterControls from "../components/SortAndFilterControls";
import {
  loadFilterPreferences,
  saveFilterPreferences,
} from "../utils/filterPreferences";

import { toast } from "react-toastify";

import styles from "./Explore.module.css";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams] = useSearchParams();
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searchType, setSearchType] = useState("books"); // 'books' or 'authors'
  const debounceTimerRef = useRef(null);
  const resultsRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Changed to 1-based for UI
  const [totalItems, setTotalItems] = useState(0);
  const maxResultsPerPage = 10;

  // Load saved filter preferences on component mount
  const savedPreferences = loadFilterPreferences();

  // Sort and filter state with saved preferences as defaults
  const [sortBy, setSortBy] = useState(savedPreferences.sortBy);
  const [filterBy, setFilterBy] = useState(savedPreferences.filterBy);
  const [printType, setPrintType] = useState(savedPreferences.printType);
  const [langRestrict, setLangRestrict] = useState(
    savedPreferences.langRestrict
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / maxResultsPerPage);

  // Scroll reveal animation effect
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    // Observe all sections
    const sections = document.querySelectorAll(".scroll-reveal");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Ensure scroll-reveal animation is triggered after books update (fix invisible cards)
  useEffect(() => {
    // Remove animate-reveal from all .scroll-reveal elements
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => el.classList.remove("animate-reveal"));
    // Force reflow and re-add animate-reveal to trigger animation
    setTimeout(() => {
      elements.forEach((el) => el.classList.add("animate-reveal"));
    }, 10);
  }, [books]);
  // Add CSS for scroll reveal animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
      }
      
      .scroll-reveal.animate-reveal {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scroll-reveal.delay-200 {
        transition-delay: 0.2s;
      }
      
      .scroll-reveal.delay-400 {
        transition-delay: 0.4s;
      }
      
      .scroll-reveal.delay-600 {
        transition-delay: 0.6s;
      }
      
      .scroll-reveal.delay-800 {
        transition-delay: 0.8s;
      }
      
      .scroll-reveal.delay-1000 {
        transition-delay: 1.0s;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Save preferences whenever filter state changes
  useEffect(() => {
    const currentPreferences = {
      sortBy,
      filterBy,
      printType,
      langRestrict,
    };
    saveFilterPreferences(currentPreferences);
  }, [sortBy, filterBy, printType, langRestrict]);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      handleSearch(null, query, newPage - 1); // Convert to 0-based for API
      // Scroll to top of results
      const resultsSection = document.querySelector(".results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Function to debounce the autocomplete API calls
  const debouncedGetSuggestions = useCallback(
    async (searchQuery) => {
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
          const results = await getAutocompleteSuggestions(
            searchQuery,
            searchType
          );
          setSuggestions(results);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          // console.error("Error getting suggestions:", error);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 300); // 300ms delay
    },
    [searchType]
  );

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
   * @param {object} customFilters - Optional custom filter overrides
   * @description This function handles the search operation. It fetches books based on the search term and updates the state accordingly.
   * It also handles pagination by calculating the start index based on the current page and maximum results per page.
   */
  const handleSearch = useCallback(
    async (e, searchTerm = null, page = 0, customFilters = null) => {
      if (e && e.preventDefault) e.preventDefault();
      const searchQuery = searchTerm || query;
      if (!searchQuery.trim()) return;
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setLoading(true);
      setSearched(true);
      setSuggestions([]); // Clear suggestions when search is triggered

      try {
        const startIndex = page * maxResultsPerPage;
        // If searching for authors, add the inauthor: prefix
        const finalQuery =
          searchType === "authors" ? `inauthor:${searchQuery}` : searchQuery;

        // Use custom filters if provided, otherwise use current state
        const currentFilters = customFilters || {
          sortBy,
          filterBy,
          printType,
          langRestrict,
        };

        // Build options object for API call
        const options = {};
        if (currentFilters.sortBy !== "relevance")
          options.orderBy = currentFilters.sortBy;
        if (currentFilters.filterBy) options.filter = currentFilters.filterBy;
        if (currentFilters.printType !== "all")
          options.printType = currentFilters.printType;
        if (currentFilters.langRestrict)
          options.langRestrict = currentFilters.langRestrict;

        const response = await searchBooks(
          finalQuery,
          startIndex,
          maxResultsPerPage,
          options
        );

        setBooks(response.items || []);
        setTotalItems(response.totalItems || 0);
        setCurrentPage(page + 1); // Convert to 1-based for UI
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // console.error("Failed to fetch books:", error);
        toast.error("Failed to fetch books");
        setBooks([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    },
    [
      query,
      maxResultsPerPage,
      searchType,
      sortBy,
      filterBy,
      printType,
      langRestrict,
    ]
  );

  // Handle genre filtering from URL params
  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      setQuery(genreParam);
      setSearched(true);
      setLoading(true);

      // Perform the search directly here to avoid circular dependencies
      const performGenreSearch = async () => {
        try {
          // Build options object carefully - only include defined values
          const options = {};
          if (sortBy && sortBy !== "relevance") options.orderBy = sortBy;
          if (filterBy) options.filter = filterBy;
          if (printType && printType !== "all") options.printType = printType;
          if (langRestrict) options.langRestrict = langRestrict;

          const response = await searchBooks(
            genreParam,
            0,
            maxResultsPerPage,
            options
          );

          setBooks(response.items || []);
          setTotalItems(response.totalItems || 0);
          setCurrentPage(1);
        } catch (error) {
          console.error("Failed to fetch genre books:", error);
          setBooks([]);
          setTotalItems(0);
        } finally {
          setLoading(false);
        }
      };

      performGenreSearch();
    }
  }, [
    searchParams,
    maxResultsPerPage,
    sortBy,
    filterBy,
    printType,
    langRestrict,
  ]);

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

  const popularSearches =
    searchType === "books" ? popularBookSearches : famousAuthors;

  // Handle quick search from popular searches
  const handleQuickSearch = (term) => {
    setQuery(term);
    handleSearch({ preventDefault: () => {} }, term);
  };

  // Handle filter changes - triggers a new search with current query
  const handleApplyFilters = useCallback(
    (customFilters = null) => {
      if (query.trim() && searched) {
        setCurrentPage(1); // Reset to first page when filters change
        // Use custom filters if provided, otherwise use current state
        const filtersToUse = customFilters || {
          sortBy,
          filterBy,
          printType,
          langRestrict,
        };
        handleSearch(null, query, 0, filtersToUse);
      }
    },
    [query, searched, sortBy, filterBy, printType, langRestrict, handleSearch]
  );

  const handleCreateBookGenerally = async (book) => {
    // console.log("Creating book generally:", book);
    const info = book.volumeInfo;
    const bookData = {
      title: info.title,
      authors: info.authors[0],
      description: info.description,
      google_book_id: book.id,
      cover:
        info.imageLinks?.extraLarge ||
        info.imageLinks?.large ||
        info.imageLinks?.medium ||
        info.imageLinks?.thumbnail,
    };
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookData),
      }
    );
    const _data = await res.json();
    // if(data.success){
    //   toast.success(data.message);
    // }else{
    //   toast.error(data.message);
    //   console.error("Error creating book:", data.message);
    // }
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
      <section
        className={`${styles.searchSection} scroll-reveal search-form-container`}
      >
        <div className={styles.searchContainer}>
          <div className="glass-effect-strong card-modern border-medium p-8 relative z-5">
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchTypeToggle}>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("books");
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className={`${styles.searchTypeButton} ${
                    searchType === "books" ? styles.active : ""
                  }`}
                >
                  <FaBookOpen className="text-lg" />
                  Search by Title
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("authors");
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className={`${styles.searchTypeButton} ${
                    searchType === "authors" ? styles.active : ""
                  }`}
                >
                  <FaPen className="text-lg" />
                  Search by Author
                </button>
              </div>

              <div className="relative w-full max-w-2xl mx-auto dropdown-container">
                <input
                  className="input-modern w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10"
                  type="text"
                  placeholder={
                    searchType === "books"
                      ? "Search for book titles..."
                      : "Search for authors..."
                  }
                  value={query}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <span className="input-icon">
                  {searchType === "books" ? <FaBookOpen /> : <FaPen />}
                </span>

              {/* Autocomplete Dropdown */}
              <div className="w-full max-w-2xl mx-auto dropdown-container">
                <SearchAutocomplete
                  suggestions={suggestions}
                  onSelect={handleSuggestionSelect}
                  loading={loadingSuggestions}
                  activeType={searchType}
                />
              </div>
              </div>
              
             {/* Search Button  */}
              <div className="w-full max-w-2xl mx-auto">
                <button
                  type="submit"
                  className={`button-primary w-full ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="spinner" />
                      Searching through millions of books...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3"
                    style={{ color: "var(--text-primary)" }}
                    >
                      <FaSearch className="text-xl" />
                      Search {searchType === "books" ? "Books" : "by Author"}
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
              {searchType === "books" ? "Popular Searches" : "Famous Authors"}
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

      {/* Sort and Filter Controls - only show after a search has been performed */}
      {searched && !loading && books.length > 0 && (
        <section className="pb-6 scroll-reveal delay-200 filter-controls-section">
          <div className="container-modern">
            <SortAndFilterControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              printType={printType}
              setPrintType={setPrintType}
              langRestrict={langRestrict}
              setLangRestrict={setLangRestrict}
              onApplyFilters={handleApplyFilters}
              isLoading={loading}
            />
          </div>
        </section>
      )}

      {/* Results Section */}
      <section ref={resultsRef} className="pb-16 results-section">
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
                  {query
                    ? `Searching for "${query}"...`
                    : "Finding the perfect books for you..."}
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
            <div className="text-center py-16 scroll-reveal">
              <div className="glass-effect card-modern flex flex-col items-center md:flex-row max-w-5xl mx-auto border-subtle">
                <div>
                  <NoBookFound />
                  <h3
                    className="text-heading-2 mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No Books Found for "{query}"
                  </h3>
                </div>
                <div className="flex flex-col items-center justify-center p-8 gap-y-8">
                  <p
                    className="text-body mb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    We searched our database but couldn't find any books
                    matching "{query}". This might be due to:
                  </p>
                  <div className="space-y-4">
                    <ul className="text-left text-sm text-gray-600 space-y-2">
                      <li>• The search term might be too specific</li>
                      <li>• Try using broader keywords</li>
                      <li>• Check for spelling errors</li>
                      <li>• Try searching by author instead</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
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
            <div className="w-full !my-16 scroll-reveal delay-400">
              <div className="text-left mb-12">
                <h2
                  className="heading-secondary !mb-4"
                  style={{ color: "var(--primary-700)" }}
                >
                  Found {totalItems} Amazing Books!{" "}
                  <FaBookOpen className="inline ml-1" />
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p
                    className="text-body !mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {query && `Results for "${query}"`}
                  </p>

                  {/* Active filters summary */}
                  {(sortBy !== "relevance" ||
                    filterBy ||
                    printType !== "all" ||
                    langRestrict) && (
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-gray-600">Filtered by:</span>
                      {sortBy !== "relevance" && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {sortBy === "newest" ? "Newest" : sortBy}
                        </span>
                      )}
                      {filterBy && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {filterBy === "free-ebooks"
                            ? "Free"
                            : filterBy === "paid-ebooks"
                            ? "Paid"
                            : filterBy === "ebooks"
                            ? "eBooks"
                            : filterBy === "full"
                            ? "Full Text"
                            : filterBy === "partial"
                            ? "Preview"
                            : filterBy}
                        </span>
                      )}
                      {printType !== "all" && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {printType === "books" ? "Books" : "Magazines"}
                        </span>
                      )}
                      {langRestrict && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                          {langRestrict.toUpperCase()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid-modern grid-3">
                {books.map((book, index) => {
                  const delayClass =
                    index < 3
                      ? ""
                      : index < 6
                      ? "delay-200"
                      : index < 9
                      ? "delay-400"
                      : "delay-600";

                  return (
                    <div
                      key={book.id || index}
                      className={`slide-in-animation scroll-reveal ${delayClass}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <BookCard
                        book={book}
                        onClick={() => handleCreateBookGenerally(book)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="scroll-reveal delay-800">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </div>
            </div>
          )}

          {/* Welcome State */}
          {!searched && !loading && (
            <div
              className={`${styles.welcomeSection} scroll-reveal delay-600 `}
            >
              <div
                className={`${styles.glassEffect} ${styles.welcomeCard} start`}
              >
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
                      {
                        icon: <FaBookOpen className={styles.featureIcon} />,
                        label: "40M+ Books",
                      },
                      {
                        icon: <FaGlobe className={styles.featureIcon} />,
                        label: "100+ Languages",
                      },
                      {
                        icon: <FaStar className={styles.featureIcon} />,
                        label: "Rated & Reviewed",
                      },
                      {
                        icon: <FaLink className={styles.featureIcon} />,
                        label: "Preview Links",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`${styles.featureItem} scroll-reveal delay-${
                          200 + index * 200
                        }`}
                      >
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
