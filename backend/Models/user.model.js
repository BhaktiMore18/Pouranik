import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        titleByYou: {
            type: String,
        },
        notes_bookmarks: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        }, 
        cover: {
            type: String,
            required: true,
        },
        google_book_id: {
            type: String,
            required: true,
        },
        actual_title: {
            type: String,
            required: true,
        },
        authors: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true,  //createdAt updatedAt
    }
)

const userSchema = new mongoose.Schema(
    {
        email_id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        books: [bookSchema],

        // ✅ Forgot Password Fields Added
        resetPasswordToken: {          // token store karne ke liye
            type: String,
        },
        resetPasswordExpires: {        // expiry store karne ke liye
            type: Date,
        },
        
    }, {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema);

export default User;
