import Modal from "react-modal";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const ReviewUpdateModal = ({ isOpen, onClose, book_id, review_id, onRefresh }) => {
    const [updatedText, setUpdatedText] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const token = localStorage.getItem("token");
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedReviewData = {
            updated_rating: updatedRating,
            updated_review_text: updatedText,
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${book_id}/review/${review_id}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedReviewData),
        })
        const data = await res.json();
        if(data.success){
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
        onClose();
        onRefresh();
        setUpdatedRating(0);
        setUpdatedText("");
    }

  return (
    <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Post Your Doubt"
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
              zIndex: 10000,
              maxWidth: '500px',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            },
          }}
        >
          <h2 className="text-lg font-bold !mb-4">Post your Review</h2>
          <form onSubmit={handleSubmit}> 
            {/* Ratings Section */}
            <div className="flex items-center !mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className="cursor-pointer transition-colors"
                  color={
                    (hoverRating || updatedRating) >= star ? "#facc15" : "#e5e7eb"
                  } // yellow-400 : gray-200
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUpdatedRating(star)}
                />
              ))}
            </div>
            {/* Textarea for review description */}
            <textarea
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              placeholder="Type your doubt description here..."
              className="w-full !p-2 border rounded !mb-4"
              rows="5"
            ></textarea>
    
            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="!px-4 !py-2 !bg-white rounded hover:!bg-blue-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="!px-4 !py-2 !bg-white rounded hover:!bg-blue-500 hover:text-white"
              >
                Post
              </button>
            </div>
          </form>
        </Modal>
  )
}

export default ReviewUpdateModal
