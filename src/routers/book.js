import express from "express";
import { addBook, getBookById, getBooks} from "../controller/book";

const router = express.Router();

router.get(`/getbooks`, getBooks);
router.get(`/getbooks/:id`, getBookById);
router.post(`/addbooks`, addBook);

export default router;