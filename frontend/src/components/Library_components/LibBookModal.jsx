import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const LibBookModal = ({ isOpen, onClose, book, onBookChange }) => {
  const [bookmark, setBookmark] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const handleUpdateDetails = async() => {
    const updatedDetails = {
      titleByYou: title,
      notes_bookmarks: bookmark,
      category: category,
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/lib/${decodedToken.id}/book/${book._id}/update`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    });
    const data = await res.json();
    onBookChange();
    toast.success(data.message);
    onClose()
  }

  const handleRemoveBook = async() => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/lib/${decodedToken.id}/book/${book._id}/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await res.json();
    onBookChange();
    toast.success(data.message);
    onClose()
  }

  const handleClose = async() => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/modal/close`, {
      method: "PUT",
    });
    console.log('Modal closed');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add this book to Library"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 9999,
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '550px',
          height: '50%',
          maxHeight: '650px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <img
              src={book.cover || "/placeholder.png"}
              alt="Book Cover"
              className="w-full object-cover rounded-md"
            />
            <Link
              to={`/Book/${book.google_book_id}`}
              className='inline-flex items-center !px-4 !py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 no-underline'
            >
              To the Book -&gt;
            </Link>
          </div>
          <form className="flex flex-col gap-4 w-full"> 
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={book.titleByYou}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              value={bookmark}
              onChange={(e) => setBookmark(e.target.value)}
              placeholder={book.notes_bookmarks}
              className="w-full p-2 border rounded mb-4"
              rows="5"
            ></textarea>
            <select name="Category" id="" className="rounded-2xl outline-2 !p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a Category</option>
              <option value="currently-reading">Currently Reading</option>
              <option value="next-up">Next Up</option>
              <option value="finished">Finished</option>
            </select>
          </form>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleUpdateDetails}
              className="px-4 py-2 !bg-blue-500 text-white rounded hover:!bg-blue-600"
            >
              Update Details
            </button>
            <button
              onClick={handleRemoveBook}
              className="px-4 py-2 !bg-blue-500 text-white rounded hover:!bg-blue-600"
            >
              Remove from Library
            </button>
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-2 !bg-white rounded hover:!bg-red-600 hover:text-white !cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LibBookModal