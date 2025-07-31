import mongoose from "mongoose";
import GenBook from "../Models/bookrev.model.js";

//GenBook represents the general book collection, including all books that have been interesting enough for user to click them and view their details

export const addReview = async(req, res) => {
    const { id } = req.params; //google_book_id recieved via route params
    const { user_id, rating, review_text } = req.body;
    if(!id || !user_id || !rating || !review_text){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try{
        const book = await GenBook.findOne({ google_book_id: id });
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const newReview = {
            user_id: user_id,
            book_id: book._id,
            review_text: review_text,
            rating: rating,
        }
        book.reviews.push(newReview);
        await book.save();
        return res.status(201).json({ success: true, message: "Review added successfully" });
    }catch(error){
        console.error("Error adding review:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const updateReview = async(req, res) => {
    const { bid, rid } = req.params; //bid is book_id, rid is review_id
    const { updated_review_text, updated_rating } = req.body;
    if(!updated_review_text || !updated_rating){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if(!mongoose.Types.ObjectId.isValid(bid) || !mongoose.Types.ObjectId.isValid(rid)){
        return res.status(400).json({ success: false, message: "Invalid book or review ID" });
    }

    try{
        const book = await GenBook.findById(bid);
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const review = book.reviews.id(rid);
        if(!review){
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        review.review_text = updated_review_text;
        review.rating = updated_rating;
        review.updatedAt = new Date(); // Update the timestamp
        await book.save();
        return res.status(200).json({ success: true, message: "Review updated successfully" });
    }catch(error){
        console.error("Error updating review:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const deleteReview = async(req, res) => {
    const { bid, rid } = req.params;
    if(!mongoose.Types.ObjectId.isValid(bid) || !mongoose.Types.ObjectId.isValid(rid)){
        return res.status(400).json({ success: false, message: "Invalid book or review ID" });
    }
    try{
        const book = await GenBook.findById(bid);
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const review = book.reviews.id(rid);
        if(!review){
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        book.reviews.pull(rid);
        await book.save();
        return res.status(200).json({ success: true, message: "Review deleted successfully" });
    }catch(error){
        console.error("Error deleting review:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const toggleLikeReview = async (req, res) => {
  const { bid, rid } = req.params;
  const userId = req.user.id; // from auth middleware

  try {
    const book = await GenBook.findById(bid);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    const review = book.reviews.id(rid);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    const alreadyLiked = review.likes.some(id => id.toString() === userId);

    if (alreadyLiked) {
      review.likes = review.likes.filter(id => id.toString() !== userId);
    } else {
      review.likes.push(userId);
    }

    await book.save();
    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Unliked review" : "Liked review",
      isLiked: !alreadyLiked,
      likeCount: review.likes.length
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const reportReview = async(req, res) => {
    const { bid, rid } = req.params; //bid is book_id, rid is review_id
    const { reason, desc } = req.body;
    const userId = req.user.id; // from auth middleware
    if(!mongoose.Types.ObjectId.isValid(bid) || !mongoose.Types.ObjectId.isValid(rid)){
        return res.status(400).json({ success: false, message: "Invalid book or review ID" });
    }
    if(!reason || !desc){
        return res.status(400).json({ success: false, message: "Reason for reporting is required" });
    }

    try{
        const book = await GenBook.findById(bid);
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const review = book.reviews.id(rid);
        if(!review){
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        review.reports.push({ user_id: userId, reason: reason, desc: desc });
        await book.save();
        return res.status(200).json({ success: true, message: "Review reported successfully" });
    }catch(error){
        console.error("Error reporting review:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}