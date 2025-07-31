import { useEffect, useState } from 'react';
import { FaStar, FaRegHeart, FaHeart, FaEdit, FaTrash, FaFlag } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import ReviewUpdateModal from './ReviewUpdateModal';
import ReportReviewModal from './ReportReviewModal';
import { toast } from 'react-toastify';

const ReviewCard = ({ user_id, book_id, rating, review_text, createdAt, updatedAt, review_id, isLiked, likeCount, onRefresh }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasLiked, setHasLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewUpdateModalOpen, setIsReviewUpdateModalOpen] = useState(false);
  const openReviewUpdateModal = () => setIsReviewUpdateModalOpen(true);
  const closeReviewUpdateModal = () => setIsReviewUpdateModalOpen(false);
  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const isAuthor = user_id === decodedToken.id;
  // console.log(likeCount, isLiked);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${user_id}/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        const data = await res.json();
        if (data.success) {
          setUserEmail(data.user.email);
          setUserName(data.user.name);
          // console.log("User details fetched successfully: ", data.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, [user_id]);

  const handleDeleteReview = async (review_id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${book_id}/review/${review_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await res.json();
    if(data.success){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
    onRefresh();
  }

  const handleToggleLike = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${book_id}/review/${review_id}/like`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    const data = await res.json();
    if (data.success) {
      setHasLiked(data.isLiked);
      setLikes(data.likeCount);
      // console.log(hasLiked, likes);
      onRefresh();
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
      <div className="bg-white shadow-md rounded-xl !p-5 !mb-4 hover:shadow-lg transition-shadow duration-300 min-w-[600px] max-w-xl !mx-auto">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{userName || "Anonymous"}</h3>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }, (_, i) => (
              <FaStar key={i} color="#FACC15" />
            ))}
            {Array.from({ length: 5 - rating }, (_, i) => (
              <FaStar key={i + rating} color="#E5E7EB" />
            ))}
          </div>
        </div>

        <div className='bg-gray-50 !p-4 rounded-md shadow-inner !mt-2'>
          <p className="text-gray-700 text-sm leading-relaxed">{review_text}</p>
        </div>
        <div className="text-sm text-gray-500">
          <p>Posted on: {formatDate(createdAt)}</p>
          {updatedAt !== createdAt && (
            <p>Updated on: {formatDate(updatedAt)}</p>
          )}
        </div>


        <div className="flex justify-end items-center gap-4 text-gray-500 text-sm">
          <button onClick={handleToggleLike} className="hover:text-red-500 flex items-center gap-1">
            {likes} {hasLiked ? <FaHeart /> : <FaRegHeart />} Like
          </button>
          {!isAuthor && (
            <button onClick={openReportModal} className="hover:text-yellow-500 flex items-center gap-1">
            <FaFlag /> Report
          </button>
          )}

          {isAuthor && (
            <>
              <button onClick={openReviewUpdateModal} className="hover:text-blue-500 flex items-center gap-1">
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDeleteReview?.(review_id)} className="hover:text-red-600 flex items-center gap-1">
                <FaTrash /> Delete
              </button>
            </>
          )}
        </div>
        <ReviewUpdateModal isOpen={isReviewUpdateModalOpen} onClose={closeReviewUpdateModal} book_id={book_id} review_id={review_id} onRefresh={onRefresh} />
        <ReportReviewModal isOpen={isReportModalOpen} onClose={closeReportModal} book_id={book_id} review_id={review_id} onRefresh={onRefresh} />
      </div>
    </>
  );
};

export default ReviewCard;