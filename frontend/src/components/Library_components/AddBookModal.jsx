import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const AddBookModal = ({ isOpen, onClose, bookInfo, book }) => {
  const [bookmark, setBookmark] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const htmlClass = document.documentElement.classList.contains('dark');
    setIsDarkMode(theme === 'dark' || htmlClass);
  }, [isOpen]);

   const handleSubmit = async(e) => {
    e.preventDefault();
    if(!token){
      onClose();
      toast.error("Kindly Login first !");
      return ;
    }

    const bookData = {
      title: title,
      book_desc: bookmark,
      book_info: bookInfo,
      category: category,
      google_book_id: book.id,
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/book/add`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(bookData)
    })
    const data = await res.json();
    if(data.success===false){
      toast.error(data.message);
    }else{
      toast.success(data.message);
    }
    console.log(data);
    setBookmark('');
    setCategory('');
    setTitle('');
    onClose();
  }

  const inputStyles = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
    padding: '0.5rem',
    borderRadius: '0.375rem',
    width: '100%',
  };

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
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '550px',
          maxHeight: '90vh',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Add this book to Library
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="If you wish to call this something else..."
          style={inputStyles}
        />

        <textarea
          value={bookmark}
          onChange={(e) => setBookmark(e.target.value)}
          placeholder="Bookmark or note..."
          rows="5"
          style={inputStyles}
        ></textarea>

        <select
          name="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyles}
        >
          <option value="">Select a Category</option>
          <option value="currently-reading">Currently Reading</option>
          <option value="next-up">Next Up</option>
          <option value="finished">Finished</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
            }}
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookModal;
