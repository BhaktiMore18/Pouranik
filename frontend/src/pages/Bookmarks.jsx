import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import NoBookFound from '../components/NoBookFound';

export default function Bookmarks() {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      const savedIds = JSON.parse(localStorage.getItem("bookmarks")) || [];

      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Fetch book details for each bookmarked ID
        const bookPromises = savedIds.map(async (id) => {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`);
          if (!response.ok) {
            console.warn(`Failed to fetch book ${id}`);
            return null;
          }
          return response.json();
        });

        const books = await Promise.all(bookPromises);
        const validBooks = books.filter(book => book !== null);
        setBookmarkedBooks(validBooks);
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f766e] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
          <p className="text-gray-600">
            {bookmarkedBooks.length > 0
              ? `You have ${bookmarkedBooks.length} bookmarked ${bookmarkedBooks.length === 1 ? 'book' : 'books'}`
              : 'No bookmarks yet. Start exploring and bookmark your favorite books!'
            }
          </p>
        </div>

        {bookmarkedBooks.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <NoBookFound />
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                No Bookmarks Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring books and click the heart icon to bookmark your favorites.
              </p>
              <a
                href="/explore"
                className="inline-block bg-[#0f766e] text-white px-6 py-3 rounded-lg hover:bg-[#0f766e]/90 transition-colors"
              >
                Explore Books
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bookmarkedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
