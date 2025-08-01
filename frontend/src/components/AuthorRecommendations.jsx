import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AuthorRecommendations({ currentBookId, author }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!author || author.length === 0) return;

    const authorNames = Array.isArray(author) ? author : [author];

    const fetchBooksByAuthors = async () => {
      setLoading(true);
      const allResults = [];

      for (const name of authorNames) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(name)}&maxResults=20`
          );
          const data = await response.json();
          if (data.items) {
            allResults.push(...data.items);
          }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          // console.error(`Error fetching books for author ${name}:`, err);
          toast.error("Failed to fetch author books");
        }
      }

      // Remove duplicates and the current book
      const seen = new Set();
      const filtered = allResults.filter(book => {
        if (!book || !book.id || seen.has(book.id)) return false;
        if (book.id === currentBookId) return false;
        seen.add(book.id);

        const bookAuthors = book.volumeInfo?.authors || [];
        return bookAuthors.some(bookAuthor =>
          authorNames.some(a =>
            bookAuthor.toLowerCase().includes(a.toLowerCase())
          )
        );
      });

      setBooks(filtered.slice(0, 6));
      setLoading(false);
    };

    fetchBooksByAuthors();
  }, [author, currentBookId]);

  if (loading) return null;

  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12 mt-12">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-yellow-500 text-3xl">📚</span>
          More Books by {Array.isArray(author) ? author.join(', ') : author}
        </h2>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(bookItem => {
              const info = bookItem.volumeInfo || {};
              const image = info.imageLinks?.extraLarge ||
                info.imageLinks?.large ||
                info.imageLinks?.medium ||
                info.imageLinks?.thumbnail ||
                info.imageLinks?.smallThumbnail ||
                '';

              return (
                <Link
                  key={bookItem.id}
                  to={`/book/${bookItem.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:shadow-md transition m-8"
                >
                  {image ? (
                    <img
                      src={image.replace('http:', 'https:')}
                      alt={info.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500 text-sm">
                      No Image Available
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{info.title}</h3>
                  {info.authors && (
                    <p className="text-sm text-gray-600 mb-1">
                      by {info.authors.join(', ')}
                    </p>
                  )}
                  {info.publishedDate && (
                    <p className="text-sm text-gray-500">{info.publishedDate}</p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-md italic text-center py-4">
            No more books found by this author.
          </p>
        )}
      </div>
    </section>
  );
}
