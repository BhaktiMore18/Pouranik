import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        review_text: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        reports: [reportSchema],
    }, {
    timestamps: true,  //createdAt updatedAt
}
);

const genBookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        google_book_id: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
    }
);

const GenBook = mongoose.model("GenBook", genBookSchema);

export default GenBook;