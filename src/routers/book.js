import express from "express";
import { addBook, getBookById, getBooks} from "../controller/book";
import { addChapter} from "../controller/chapter";

const router = express.Router();

router.get(`/getbooks`, getBooks);
router.get(`/getbooks/:id`, getBookById);
router.post(`/addbooks`, addBook);
router.post(`/:id/addchapter/`, addChapter)

export default router;