/**
 * @file BookCard.jsx
 * @description A React component that displays a book card with details like title, authors, description, cover image, rating, and category.
 */
import React from 'react';

const Link = ({ to, className, children, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function BookCard({ book }) {
  const info = book.volumeInfo;


  /**
   * @function getHighResImageUrl
   * @returns {string|null} Returns the high-resolution image URL for the book cover. If no image is available, returns null.
   * The function checks for various image sizes and formats and ensures the URL is secure (https).
   */
  const getHighResImageUrl = () => {
    if (!info.imageLinks) {
      return null;
    }

    let baseUrl =
      info.imageLinks.extraLarge ||
      info.imageLinks.large ||
      info.imageLinks.medium ||
      info.imageLinks.thumbnail ||
      info.imageLinks.smallThumbnail;

    if (baseUrl) {
      baseUrl = baseUrl.replace("http:", "https:");

      if (baseUrl.includes('zoom=')) {
        baseUrl = baseUrl.replace(/zoom=\d+/, 'zoom=6');
        if (!baseUrl.includes('zoom=6')) {
          baseUrl = baseUrl.replace(/zoom=\d+/, 'zoom=7');
        }
      } else {
        baseUrl += '&zoom=6';
      }
      baseUrl = baseUrl.replace(/&edge=curl/, '');
    }

    return baseUrl;
  };

  const imageUrl = getHighResImageUrl();

  /**
   * @function renderRating
   * @returns {JSX.Element} Returns a JSX element representing the book's rating.
   */
  const renderRating = () => {
    const rating = info.averageRating ? parseFloat(info.averageRating) : 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm !px-3 !py-1.5 border border-white rounded-full flex items-center gap-1.5 shadow-lg">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs text-white">
              {i < fullStars ? '⭐' : i === fullStars && hasHalfStar ? '✨' : '☆'}
            </span>
          ))}
        </div>
        <span className="text-white text-xs font-semibold">
          {rating > 0 ? rating.toFixed(1) : 'N/A'}
        </span>
      </div>
    );
  };

  /**
   * @function renderCategory
   * @returns {JSX.Element} Returns a JSX element representing the book's category.
   */
  const renderCategory = () => {
    const category = info.categories && info.categories.length > 0 ? info.categories[0] : 'No Category';

    return (
      <div className="absolute top-3 left-3">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white !px-3 !py-1 border-[2px] border-purple-800 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
          {category}
        </span>
      </div>
    );
  };

  return (
    <Link
      to={`/book/${book.id}`}
      className="block no-underline group"
    >
      <article className="relative shadow shadow-md bg-white rounded-2xl shadow-lg border border-gray-100 group h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transform" data-tour="book-card">

        <div className="relative overflow-hidden h-80 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
          {imageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={imageUrl.replace("http:", "https:")}
                alt={info.title || "Book Cover"}
                className="w-full h-full object-cover transition-all duration-700 transform-gpu group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center h-full w-full text-gray-500 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50" />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4 opacity-60">📚</div>
                <p className="text-sm font-medium">No Cover Available</p>
              </div>
            </div>
          )}

          {/* Rating Badge */}
          {renderRating()}

          {/* Category Badge */}
          {renderCategory()}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="bg-white/95 backdrop-blur-sm !px-6 !py-3 rounded-full shadow-xl border border-white/20">
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-blue-600">📖</span>
                  View Details
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="!p-4 flex-1 flex flex-col justify-between bg-white">
          <div className="mb-4">
            {/* Title */}
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[50px]">
              {info.description
                ? `${info.description.replace(/<[^>]*>/g, "").substring(0, 60)}${info.description.replace(/<[^>]*>/g, "").length > 60 ? "..." : ""}`
                : "No description available for this book."
              }
            </h3>

            {/* Authors */}
            <p className="text-gray-600 text-sm font-medium mb-3 flex items-center gap-1 min-h-[20px]">
              <span className="text-xs">✍️</span>
              {info.authors && info.authors.length > 0
                ? `${info.authors.slice(0, 2).join(", ")}${info.authors.length > 2 ? " & others" : ""}`
                : "No Author Found"
              }
            </p>

            {/* Description */}
            <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed min-h-[60px]">
              {info.description
                ? `${info.description.replace(/<[^>]*>/g, "").substring(0, 120)}${info.description.replace(/<[^>]*>/g, "").length > 120 ? "..." : ""}`
                : "No description available for this book."
              }
            </p>
          </div>

          <div className="mt-auto space-y-3 pt-4">
            <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-3 min-h-[44px]">
              <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                <span className="text-blue-500">📅</span>
                {info.publishedDate
                  ? new Date(info.publishedDate).getFullYear()
                  : "No Date"
                }
              </span>
              <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                <span className="text-green-500">📄</span>
                {info.pageCount ? `${info.pageCount} pages` : "No Pages"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs min-h-[20px]">
              <span className="text-gray-500 font-medium flex items-center gap-1">
                <span className="text-orange-500">👥</span>
                {info.ratingsCount
                  ? `${info.ratingsCount.toLocaleString()} reviews`
                  : "No Reviews"
                }
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase font-medium">
                {info.language || "N/A"}
              </span>
            </div>

            <div className="!my-8">
              <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white !py-2 !px-3 rounded-xl text-center shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-semibold flex items-center justify-center gap-2">
                  <span>📖</span>
                  Read More
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}