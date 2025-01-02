import express from "express";
import { renderHome, renderUpdateInfo } from "../controller/home.js"; 

const router = express.Router();

//  home
router.get("/home1", renderHome);

//thay đổi thông tin
// router.get("/update-info", renderUpdateInfo);


export default router;