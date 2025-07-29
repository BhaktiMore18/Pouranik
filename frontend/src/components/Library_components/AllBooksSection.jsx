import React from 'react'
import BookCard from './BookCard'

const AllBooksSection = ({ title, books, onBookChange }) => {
  return (
    <div className="!my-8 h-[30%] w-[96%]">
      <div className="text-xl font-semibold !mb-7 !text-[#a16207]">{title}</div>
      
      {books.length>0 ? (
        <div className="flex items-end space-x-4 space-y-4 !px-2 !pt-2 flex-wrap justify-center">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} onBookChange={onBookChange} />
        ))}
      </div>
      ) : (
        <div className="h-[150px]" />
      )}
    </div>
  )
}

export default AllBooksSection
