import { useState } from "react";
import LibBookModal from "./LibBookModal";

const BookCard = ({ book, onBookChange }) => {
  const [isLibBookModalOpen, setIsLibBookModalOpen] = useState(false);
  const openLibModal = () => setIsLibBookModalOpen(true);
  // const closeLibModal = () => setIsLibBookModalOpen(false);
  const closeLibModal = () =>  {
    console.log("Closing the modal");
    setIsLibBookModalOpen(false);
  }

  return (
    <div onClick={openLibModal} 
      className="group relative w-28 h-40 rounded-md bg-white overflow-hidden shadow-2xl transform transition-all duration-300 min-w-[100px]
             hover:scale-105 hover:rotate-[-1deg] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
    >
      <img
        src={book.cover || "/placeholder.png"}
        alt="Book Cover"
        className="w-full h-full object-cover rounded-md"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition duration-300 rounded-md" />

      <LibBookModal isOpen={isLibBookModalOpen} onClose={closeLibModal} book={book} onBookChange={onBookChange} />
    </div>

  );
};

export default BookCard;
