
/**
 * @function searchBooks
 * @param {*} query the search query for books
 * @param {*} startIndex the index to start the search from
 * @param {*} maxResults the maximum number of results to return
 * @returns {Promise<{ items: Array, totalItems: number }>} the search results
 * @description This function searches for books using the Google Books API.
 * It takes a query, start index, and maximum results as parameters,
 * and returns a promise that resolves to an object containing the items
 */

export const searchBooks = async (
  query,
  startIndex = 0,
  maxResults = 10,
  options = {}
) => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    console.error(
      "Google Books API key is not configured. Please add VITE_GOOGLE_BOOKS_API_KEY to your .env file"
    );
    return { items: [], totalItems: 0 };
  }

  const encodedQuery = encodeURIComponent(query);
  let url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

  // Add sorting parameter
  if (options.orderBy && options.orderBy !== 'undefined') {
    url += `&orderBy=${options.orderBy}`;
  }

  // Add filter parameter
  if (options.filter && options.filter !== 'undefined') {
    url += `&filter=${options.filter}`;
  }

  // Add print type parameter
  if (options.printType && options.printType !== 'undefined') {
    url += `&printType=${options.printType}`;
  }

  // Add language restriction
  if (options.langRestrict && options.langRestrict !== 'undefined') {
    url += `&langRestrict=${options.langRestrict}`;
  }

  // Add download format restriction
  if (options.download) {
    url += `&download=${options.download}`;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Google Books API Error:", errorData);
      throw new Error(
        `HTTP error! status: ${res.status}. ${errorData.error ? errorData.error.message : ""
        }`
      );
    }

    const data = await res.json();

    return {
      items: data.items || [],
      totalItems: data.totalItems || 0,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { items: [], totalItems: 0 };
  }
};

/**
 * @function getAutocompleteSuggestions
 * @param {string} query The search query to get suggestions for
 * @param {string} type The type of suggestions to get ('books' or 'authors')
 * @returns {Promise<Array>} Array of suggestion objects
 * @description Fetches autocomplete suggestions for books or authors based on the query
 */
export const getAutocompleteSuggestions = async (query, type = 'books') => {
  if (!query.trim()) return [];

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    console.error("Google Books API key is not configured");
    return [];
  }

  try {
    // For authors, we specifically search in the author field
    const searchQuery = type === 'authors' ? `inauthor:${query}` : query;
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&maxResults=5&fields=items(id,volumeInfo(title,authors))&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    if (!data.items) return [];

    // Process the results based on type
    if (type === 'authors') {
      // Extract unique authors from the results
      const authors = new Set();
      data.items.forEach(item => {
        if (item.volumeInfo.authors) {
          item.volumeInfo.authors.forEach(author => {
            if (author.toLowerCase().includes(query.toLowerCase())) {
              authors.add(author);
            }
          });
        }
      });
      return Array.from(authors).slice(0, 5).map(author => ({
        id: author,
        text: author,
        type: 'author'
      }));
    } else {
      // Return book suggestions
      return data.items.map(item => ({
        id: item.id,
        text: item.volumeInfo.title,
        type: 'book',
        authors: item.volumeInfo.authors || []
      }));
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }

};