import express from 'express';
import { renderBookDetails } from '../controller/bookDetails.js';

const router = express.Router();

router.get('/:id', renderBookDetails);

export default router;