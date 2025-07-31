import { useEffect, useState } from "react";
import Modal from "react-modal"
import { FaStar } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const ReviewModal = ({ isOpen, onClose, google_book_id, onRefresh}) => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            setUserId(userId);
            // Use userId as needed
            // console.log("User ID:", userId);
        } catch (err) {
            console.error("Invalid token:", err);
            // Optionally remove the bad token
            localStorage.removeItem("token");
        }
    }, [review]);  // as when user gets to fill review field in reviewmodal, that means they must have already logged in 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            user_id: userId,
            rating: rating,
            review_text: review,
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${google_book_id}/review/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(reviewData),
        })
        const data = await res.json();
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        onClose();
        onRefresh();
        setRating(0);
        setReview("");
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
                                (hoverRating || rating) >= star ? "#facc15" : "#e5e7eb"
                            } // yellow-400 : gray-200
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                {/* Textarea for review description */}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
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

export default ReviewModal
