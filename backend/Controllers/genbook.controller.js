import mongoose from "mongoose";
import GenBook from "../Models/bookrev.model.js";

export const getBookReviews = async (req, res) => {
    const { id } = req.params;
    //here id is google_book_id , not a mongodb id, hence mongoose.Types.ObjectId.isValid(id) will not approve
    const userId = req.user.id; // You must have auth middleware
    if (!id) {
        return res.status(400).json({ success: false, message: "Book ID is required" });
    }

    try {
        const book = await GenBook.findOne({ google_book_id: id }).lean();
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        // Adding isLiked and likeCount to each review
        book.reviews = book.reviews.map((review) => ({
  ...review,
  isLiked: review.likes?.some((id) => id.toString() === userId) || false,
  likeCount: review.likes?.length || 0
}));
        // console.log(book.reviews);

        return res.status(200).json({ success: true, message: "Reviews fetched successfully", reviews: book.reviews, book });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const createGenBook = async (req, res) => {
    const { title, authors, description, google_book_id, cover } = req.body;
    if (!title || !authors || !description || !google_book_id || !cover) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const book = await GenBook.findOne({ google_book_id: google_book_id });
    if (book) {
        return res.status(409).json({ success: false, message: "Book already exists in general collection" });
    }

    try {
        const newGenBook = new GenBook({
            title,
            authors,
            description,
            google_book_id,
            cover,
            reviews: [],
        });
        await newGenBook.save();
        res.status(201).json({ success: true, message: "Book created successfully" });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ success: false, message: "Failed to create book" });
    }
};

