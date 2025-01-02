import express from "express";
import { signin,logout, signup } from "../controller/auth";
import { updateUserInfo,renderUpdateUserPage } from "../controller/updateProfile";

const router = express.Router();

router.post(`/signup`, signup);
router.post(`/signin`, signin);
router.get(`/logout`, logout);
router.get("/update-info", renderUpdateUserPage); // Trang đổi thông tin
router.post("/update-info", updateUserInfo); // Xử lý đổi thông tin

export default router;