import express from 'express';
import { renderBookDetails } from '../controller/bookDetails.js';
import { renderChapter } from '../controller/chapter.js';

const router = express.Router();

router.get('/:id', renderBookDetails);
router.get('/chapter/:bookId/:chapterNumber', renderChapter);



export default router;