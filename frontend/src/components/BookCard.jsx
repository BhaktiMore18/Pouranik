
/**
 * @file BookCard.jsx
 * @description A React component that displays a book card with details like title, authors, description, cover image, rating, and category.
 */
import React from 'react';
import { Calendar1, StickyNote, ThumbsUp, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Link = ({ to, className, children, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function BookCard({ book, onClick }) {
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
      <div className="flex gap-4 items-center">
        <div className="w-fit px-3 py-1.5 flex items-center gap-5">

          <p className="text-black text-xs font-semibold flex items-center gap-2 ">
            <ThumbsUp className='text-yellow-400' size={16} absoluteStrokeWidth />
            {rating > 0 ? rating.toFixed(1) : 'N/A'}
          </p>

          <div className="flex items-center text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '⯨' : '☆'}
              </span>
            ))}
          </div>
        </div>
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
      <div className="my-1">
        <span className="text-xs font-medium">
          {category}
        </span>
      </div>
    );
  };

  const navigate = useNavigate();

const handleClick = (e) => {
  e.preventDefault();
  onClick?.(); 
  navigate(`/book/${book.id}`); 
};


  return (
    <div
      className="block no-underline cursor-pointer"
      onClick={handleClick}
    >
      <article className="relative shadow-md bg-white rounded-2xl border border-gray-100 group h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transform" data-tour="book-card">

        {/* card image */}
        <div className="relative h-72 flex justify-center  items-center overflow-hidden group bg-gray-200 dark:bg-gray-600">
          {imageUrl ? (
            <div className="relative h-56 w-auto">
              <img
                src={imageUrl.replace("http:", "https:")}
                alt={info?.title || "Book Cover"}
                className="w-full h-full object-contain object-center transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="relative h-full w-full flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50" />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-3 opacity-60">📚</div>
                <p className="text-sm font-medium">No Cover Available</p>
              </div>
            </div>
          )}

          {/* Authors */}
          <p className="absolute bottom-2 right-2 text-gray-600 text-sm font-medium mb-3 ">
            {/* <span className="text-xs">✍️</span> */}
            ~
            {info?.authors?.length > 0 ? (
              <>
                <span title={info.authors.join(", ")}>
                  {info.authors.slice(0, 2).join(", ")}
                  {info.authors.length > 2 && " and others"}
                </span>
              </>
            ) : (
              "No Author Found"
            )}
          </p>
        </div>


        {/* Card body */}
        <div className="!p-4 flex-1 flex flex-col justify-between bg-white">
          <div className="mb-0">
            {renderCategory()}

            {/* Title */}
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[50px]">
              {info.title
                ? `${info.title.replace(/<[^>]*>/g, "").substring(0, 60)}${info.title.replace(/<[^>]*>/g, "").length > 60 ? "..." : ""}`
                : "No description available for this book."
              }
            </h3>




            {/* Description */}
            <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed min-h-[60px]">
              {info.description
                ? `${info.description.replace(/<[^>]*>/g, "").substring(0, 120)}${info.description.replace(/<[^>]*>/g, "").length > 120 ? "..." : ""}`
                : "No description available for this book."
              }
            </p>
          </div>


          {renderRating()}


          <div className="mt-auto space-y-3 !pt-4">
            <div className="flex items-center justify-between space-x-2 text-xs bg-gray-700 dark:bg-gray-800   rounded-lg !p-3 min-h-[44px]">

              <div className='flex space-x-2'>
                <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                  <Calendar1 className='size-4' />
                  {info.publishedDate
                    ? new Date(info.publishedDate).getFullYear()
                    : "No Date"
                  }
                </span>

                <span className="text-gray-600 flex items-center gap-1.5 font-medium">
                  <StickyNote className='size-4' />
                  {info.pageCount ? `${info.pageCount} pages` : "No Pages"}
                </span>
              </div>

              <div className='flex space-x-2'>
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <User size={16} absoluteStrokeWidth />
                  {info.ratingsCount
                    ? `${info.ratingsCount.toLocaleString()}`
                    : "0"
                  } Ratings
                </span>

                <span className="text-gray-500 px-2 py-1 uppercase font-medium">
                  {info.language || "N/A"}
                </span>
              </div>
            </div>
          </div>


        </div>


      </article>
    </div>
  );

}