import { useParams } from 'react-router-dom';
import ReviewCard from '../components/Reviews/ReviewCard';
import ReviewStats from '../components/Reviews/ReviewStats';
import { useEffect, useState } from 'react';
import ReviewModal from '../components/Reviews/ReviewModal';
import { toast } from 'react-toastify';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loggedIn, setLoggedIn] = useState(true);
    const { id } = useParams();  //google_book_id
    const openReviewModal = () => setIsReviewModalOpen(true);
    const closeReviewModal = () => setIsReviewModalOpen(false);

    //Passed google_book_id from BookDetails.jsx in route so as to use the id to fetch the reviews on that particular book to display them.
    useEffect(() => {
        const fetchReviews = async() => {
            setLoading(true);
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/genbook/${id}/reviews`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                const data = await res.json();
                if(data.success){
                    setReviews(data.reviews);
                    // console.log("Reviews fetched successfully: ", data.reviews);
                }else{
                    console.error("Failed to fetch reviews: ", data.message);
                    setReviews([]);
                }
            }catch(error){
                console.error("Error fetching reviews: ", error);
            }
        };

        const token = localStorage.getItem("token");
        if (!token) {
            setLoggedIn(false);
            toast.error("You need to be logged in to view reviews.");
            return;
        }

        fetchReviews();
        setLoading(false);
    }, [id, refreshKey]);

    if (!loggedIn) {
        return (
            <div className="bg-gray-50 min-h-screen !py-12 !px-4 md:!px-16">
                <h1 className="text-3xl font-bold mb-8">Please log in to view and add reviews.</h1>
            </div>
        );
    }

    return (
        <>
          <div className="bg-gray-50 min-h-screen !py-12 !px-4 md:!px-16">
            <h1 className="text-3xl font-bold !mb-8">Reviews</h1>
            <button className='bg-white !mb-2' onClick={openReviewModal}>Add your review !</button>
            <ReviewStats />
            <h2 className="text-2xl font-bold !mb-4">Total Reviews : {reviews.length}</h2>
            {loading ? (
                <p>Loading Reviews ...</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2'>
                {reviews.map((review, i) => (
                    <ReviewCard key={i} user_id={review.user_id} book_id={review.book_id} rating={review.rating} review_text={review.review_text} createdAt={review.createdAt} updatedAt={review.updatedAt} isLiked={review.isLiked} likeCount={review.likeCount} review_id={review._id} onRefresh={() => setRefreshKey(prev => !prev)} />
                ))}
            </div>
            )}
            <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} google_book_id={id} onRefresh={() => setRefreshKey(prev => !prev)} loggedIn={loggedIn} />
        </div>
        </>
    )
}

export default Reviews
