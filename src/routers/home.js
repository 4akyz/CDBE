import express from "express";
import { renderHome, renderAbout, renderFollow, renderGenres } from "../controller/home.js"; 

const router = express.Router();

//  home
router.get("/home1", renderHome);

//follow
router.get("/follow", renderFollow);

//genres
router.get("/genres", renderGenres);

//about
router.get("/about", renderAbout);

export default router;