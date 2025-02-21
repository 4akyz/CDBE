import Book from "../models/book";
import User from "../models/user";
import Chapter from "../models/chapter";

export const renderBookDetails = async (req, res) => {
    try {
        console.log(req.bookId);
        const user = await User.findById(req.session.userId);
        const book = await Book.findById(req.params.id);
        const chapters = await Chapter.find({bookId: req.params.id}).sort({chapterNumber: 1});
        const username = user.username;
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.render("bookDetails", { book, username, chapters });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}