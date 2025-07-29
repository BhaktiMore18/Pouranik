import User from "../Models/user.model.js";
import mongoose from "mongoose";

export const addBook = async (req, res) => {
    const { title, book_desc, book_info, category, google_book_id } = req.body;
    if (!category || !book_info || !google_book_id) {
        return res.status(400).json({ success: false, message: "category field is necessary!" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Checking if the book is already present in user's library
        const alreadyExists = user.books.some(
            (book) => book.google_book_id === google_book_id
        );

        if (alreadyExists) {
            return res.status(409).json({success: false, message: "Book is already in the library"});
        }

        user.books.push({
            titleByYou: title,
            notes_bookmarks: book_desc,
            category: category,
            cover: book_info.imageLinks?.large || book_info.imageLinks?.extraLarge || book_info.imageLinks?.medium || book_info.imageLinks?.thumbnail,
            google_book_id: google_book_id,
            actual_title: book_info.title,
            authors: book_info.authors[0],
        });
        await user.save();
        res.status(200).json({ success: true, message: "book saved" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const libraryBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ books: user.books });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

export const updateLibBookDetails = async (req, res) => {
    const { uid, bid } = req.params;
    const { titleByYou, notes_bookmarks, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(bid)) {
        return res.status(400).json({ success: false, message: "Invalid user or book id" });
    }

    try {
        const user = await User.findById(uid);
        const book = user.books.id(bid);
        book.titleByYou = titleByYou || book.titleByYou;
        book.notes_bookmarks = notes_bookmarks || book.notes_bookmarks;
        book.category = category || book.category;
        await user.save();

        res.status(200).json({ success: true, message: "Details updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const deleteLibBook = async (req, res) => {
    const { uid, bid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(bid)) {
        return res.status(400).json({ success: false, message: "Invalid user or book id" });
    }

    try {
        const user = await User.findById(uid);
        const book = user.books.id(bid);
        const originalLength = user.books.length;

        user.books = user.books.filter(book => book._id.toString() !== bid);

        if (user.books.length === originalLength) {
            return res.status(404).json({ success: false, message: "something went wrong" });
        }
        await user.save();

        res.status(200).json({ success: true, message: "book removed from library" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
        console.log(error.message);
    }
}

export const bookSearch = async(req, res) => {
    const { searchTerm } = req.body;
    if (!searchTerm) {
        return res.status(400).json({ success: false, message: "Search term is required" });
    }

    try{ 
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        const searchResults = user.books.filter(book => 
            book.actual_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.authors.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return res.status(200).json({ success: true, data: searchResults });
    }catch(error){
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const modalClose = async(req, res) => {
    // This is a dummy endpoint to handle modal close requests
    // It doesn't perform any action but is used to trigger the onClose function in the frontend
    try {
        res.status(200).json({ success: true, message: "Modal closed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}