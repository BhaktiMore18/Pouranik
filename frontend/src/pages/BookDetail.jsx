
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { IoLibraryOutline } from "react-icons/io5";
import AddBookModal from '../components/Library_components/AddBookModal';

import AuthorRecommendations from '../components/AuthorRecommendations';


import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
 

  useEffect(() => {
    setBook(null);
    setLoading(true);

    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.error("Failed to fetch book details:", error);
        setLoading(false);
      });
  }, [id]);

  const cardBaseClasses = "bg-white rounded-xl shadow-lg border border-gray-100 !p-6 transition-all duration-300";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-items-center bg-gray-50 p-6">
        <div className={`${cardBaseClasses} max-w-md text-center`}>
          <div className="animate-bounce text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Loading Book Details</h3>
          <p className="text-gray-600 mb-8">
            Fetching comprehensive information about this book...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book || book.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className={`${cardBaseClasses} max-w-lg text-center`}>
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the book you're looking for. It might have been removed or the link is incorrect.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 no-underline"
            >
              <span className="mr-2">🔍</span>
              Explore Other Books
            </Link>
            <Link
              to="/genres"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 no-underline"
            >
              <span className="mr-2">📚</span>
              Browse Genres
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const info = book.volumeInfo || {};
  const imageUrl =
    info.imageLinks?.extraLarge || info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formattedHTML = info.description
    .replace(/<br\s*\/?>/gi, "<br/>")
    .replace(/<p>/gi, '<p class="mb-4">')
    .replace(/<strong>/gi, '<strong class="font-semibold text-gray-900">')
    .replace(/<em>/gi, '<em class="text-gray-600">');

  const preview = formattedHTML.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 400);
  

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Navigation */}
      <section className="!py-8 bg-white shadow-sm">
        <div className="!max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <Link
            to="/explore"
            className="inline-flex items-center !px-4 !py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 no-underline"
          >
            <span className="!mr-2 text-lg">←</span>
            Back to Explore
          </Link>
          <button
            className='inline-flex items-center !px-4 !py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 no-underline'
            onClick={openModal}
          >
            <span className='!mr-2 text-lg'><IoLibraryOutline /></span>
            Add to Library 
          </button>
        </div>
      </section>

      <section className="!py-12 !px-17 !md:py-16 justify-items-center">
        <div className="max-w-7xl mx-auto !px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 !gap-12 lg:gap-16">

            <div className="lg:col-span-2">
              <div className={`${cardBaseClasses} sticky !top-8 flex flex-col items-center !p-8`}>
                <div className="!mb-8 w-full max-w-xs sm:max-w-sm lg:max-w-full">
                  {imageUrl ? (
                    <img
                      className="w-full h-auto rounded-lg shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300 mx-auto"
                      src={imageUrl.replace('http:', 'https:')}
                      alt={info.title || "Book Cover"}
                    />
                  ) : (
                    <div className="w-full aspect-w-2 aspect-h-3 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg flex flex-col items-center justify-center p-8 text-gray-400 text-center shadow-md">
                      <span className="text-7xl !mb-3" role="img" aria-label="No Cover">
                        📖
                      </span>
                      <p className="text-lg font-semibold">No Cover Available</p>
                    </div>
                  )}
                </div>

                <div className="w-full grid grid-cols-1  md:grid-cols-2 !gap-4 text-center !mb-8">
                  {info.averageRating && (
                    <div className="bg-blue-50 text-blue-700 !p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">

                      <span className="text-4xl !mb-1"><StarBorderOutlinedIcon className="w-10 h-10 text-yellow-500 mb-1"/></span> 
                      <span className="text-2xl font-bold">{info.averageRating.toFixed(1)}</span>
                      {info.ratingsCount && (
                        <p className="text-xs text-blue-600 !mt-1">
                          ({info.ratingsCount.toLocaleString()} ratings)
                        </p>
                      )}
                    </div>
                  )}

                  {info.publishedDate && (
                    <div className="bg-green-50 text-green-700 !p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-3xl !mb-1"><CalendarTodayOutlinedIcon/></span>
                      <span className="text-xl font-bold">{new Date(info.publishedDate).getFullYear()}</span>
                      <p className="text-xs text-green-600 !mt-1">Published Year</p>
                    </div>
                  )}

                  {info.pageCount && (
                    <div className="bg-yellow-50 text-yellow-700 !p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-3xl !mb-1"><AutoStoriesOutlinedIcon/></span>
                      <span className="text-xl font-bold">{info.pageCount}</span>
                      <p className="text-xs text-yellow-600 !mt-1">Pages</p>
                    </div>
                  )}

                  {info.language && (
                    <div className="bg-purple-50 text-purple-700 !p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-3xl !mb-1"><LanguageOutlinedIcon/></span>
                      <span className="text-xl font-bold uppercase">{info.language}</span>
                      <p className="text-xs text-purple-600 !mt-1">Language</p>
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  {info.previewLink && (
                    <a
                      href={info.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center !px-6 !py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md no-underline"
                    >
                      {/* <span className="!mr-2">📖</span> */}
                      Preview Book
                    </a>
                  )}
                  {info.infoLink && (
                    <a
                      href={info.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center !px-6 !py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm no-underline"
                    >
                      
                      View on Google Books 
                      <span className="ml-4"><EastOutlinedIcon/></span>
                      
                    </a>
                     
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">

              <header className={cardBaseClasses}>
                {info.title && (
                  <h1 className="text-4xl font-extrabold text-gray-900 leading-tight !mb-3">
                    {info.title}
                  </h1>
                )}
                {info.subtitle && (
                  <p className="text-xl text-gray-600 font-medium !mb-4">
                    {info.subtitle}
                  </p>
                )}
                {info.authors && info.authors.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 !mb-6">
                    <span className="text-gray-500 text-lg !mr-1">by</span>
                    {info.authors.map((author, index) => (
                      <span key={index} className="text-blue-700 font-semibold text-lg hover:underline">
                        {author}{index < info.authors.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
                {info.categories && info.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {info.categories.slice(0, 3).map((category, index) => (
                      <Link
                        key={index}
                        to={`/explore?genre=${encodeURIComponent(category)}`}
                        className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200 no-underline shadow-sm"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}

                 {/* Description */}
              {info.description && (
                // <section className={cardBaseClasses}>
                <section className=" !mt-4">
                  <h3 className="text-2xl font-bold text-gray-800 !mb-4 flex items-center gap-3">
                    <span className="text-blue-500 text-3xl"><SubjectOutlinedIcon className="!text-3xl"/></span>
                    About This Book
                  </h3>

                  <p className="text-gray-700 text-lg ">
                {expanded ? 
                 <div
                    className="text-gray-700 text-lg leading-relaxed space-y-4 prose prose-indigo max-w-none"
                    dangerouslySetInnerHTML={{ __html: formattedHTML }}
                  />  : `${preview}...`}
                  <span
                    onClick={() => setExpanded(!expanded)}
                    className="text-gray-600 cursor-pointer font-medium ml-1 hover:underline"
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </span>
                </p>

                 
                </section>
              )}
              </header>

             {/* ************************** */}

               {(info.industryIdentifiers || info.pageCount || info.printType || info.maturityRating || info.contentVersion || info.publisher || info.publishedDate) && (
                <section className={cardBaseClasses}>
                    <h3 className="text-2xl font-bold text-gray-800 !mb-4 flex items-center gap-3">
                    <span className="text-green-500 text-3xl"><BusinessOutlinedIcon className="!text-3xl "/></span>
                    Publisher Information
                  </h3>
                  {info.publisher && (
                    <p className="text-gray-700 text-lg">{info.publisher}</p>
                  )}
                  {info.publishedDate && (
                    <p className="text-gray-500 text-sm !mt-1">
                      Published on {new Date(info.publishedDate).toLocaleDateString()}
                    </p>
                  )}

                  <h3 className="text-2xl font-bold text-gray-800 !mb-4 flex items-center gap-3 !mt-4">
                    <span className="text-purple-500 text-3xl"><LibraryBooksOutlinedIcon className="!text-2xl"/></span>
                    More Details
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { label: 'ISBN-10', value: info.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier },
                      { label: 'ISBN-13', value: info.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier },
                      { label: 'Page Count', value: info.pageCount ? `${info.pageCount} pages` : null },
                      { label: 'Print Type', value: info.printType },
                      { label: 'Maturity Rating', value: info.maturityRating },
                      { label: 'Content Version', value: info.contentVersion }
                    ].filter(item => item.value).map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-gray-500 text-sm font-medium">{item.label}:</span>
                        <span className="text-gray-800 text-lg font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
               )}

                <section className={`${cardBaseClasses} border-l-4 border-indigo-500`}> 

                  
                <div className=' grid grid-cols-1'>
                  {[
                    {
                      icon: <DriveFileRenameOutlineOutlinedIcon className="!text-3xl"/>,
                      title: 'User Reviews & Ratings',
                      description: 'Read and write detailed reviews from fellow readers'
                    },
                  ].map((feature, index) => (
                    <Link to={`/book/${id}/reviews`} key={index} className="bg-gray-50 !p-6 rounded-lg shadow-sm flex items-start space-x-4 w-full">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 !mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                  </section>


              <section className={`${cardBaseClasses} border-l-4 border-indigo-500`}> {/* Accent border */}
                <h3 className="text-2xl font-bold text-gray-800 !mb-6 flex items-center gap-3">
                  <span className="text-yellow-500 text-3xl">🌟</span>
                  Coming Soon
                </h3>
                <div className="grid md:grid-cols-2 !gap-6">
                  {[
                    // {
                    //   icon: <DriveFileRenameOutlineOutlinedIcon className="!text-3xl"/>,
                    //   title: 'User Reviews & Ratings',
                    //   description: 'Read and write detailed reviews from fellow readers'
                    // },
                    // {
                    //   icon: <CollectionsBookmarkOutlinedIcon className="!text-3xl"/>,
                    //   title: 'Personal Library',
                    //   description: 'Add books to your reading lists and track progress'
                    // },
                    {
                      icon: <RecommendOutlinedIcon className="!text-3xl"/>,
                      title: 'Smart Recommendations',
                      description: 'Get personalized book suggestions based on your reading history'
                    },
                    {
                      icon: <PeopleOutlinedIcon className="!text-3xl"/>,
                      title: 'Book Clubs & Community',
                      description: 'Join discussions and connect with other book lovers'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-gray-50 !p-6 rounded-lg shadow-sm flex items-start space-x-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 !mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              

            </div>
          </div>
          <div className={"`${cardBaseClasses}` !mt-2"}>
            <AuthorRecommendations
              currentBookId={id}
              author={info.authors}
            />
          </div>
          
          

        </div>
      </section>

      <AddBookModal isOpen={isModalOpen} onClose={closeModal} bookInfo={info} book={book} />

    </div>
    
  );

}