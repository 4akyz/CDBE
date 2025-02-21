import express from "express";
import { addBook, getBookById, getBooks} from "../controller/book";
import { addChapter} from "../controller/chapter";
import Book from "../models/book";
import User from "../models/user";
import { renderBookDetails } from "../controller/bookDetails";


const router = express.Router();

router.get(`/getbooks`, getBooks);
router.get(`/getbooks/:id`, getBookById);
router.post(`/addbooks`, addBook);
router.post(`/:id/addchapter/`, addChapter)

router.get("/search", async (req, res) => {
    try {
        const query = req.query.query;
        const books = await Book.find({ title: new RegExp(query, "i") }).limit(5);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Render search results page
router.get("/search/results", async (req, res) => {
    try {
        const query = req.query.query;
        const books = await Book.find({ title: new RegExp(query, "i") });
        res.render("results", { books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", renderBookDetails);

export default router;
