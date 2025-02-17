import express from "express";
import { signin,logout, signup, updateUserInfo,
        renderUpdateUserPage,updateUserPassword, renderUpdateUserPassword } from "../controller/auth";
// import { updateUserInfo,renderUpdateUserPage,updateUserPassword, renderUpdateUserPassword } from "../controller/updateProfile";

const router = express.Router();

router.post(`/signup`, signup);
router.post(`/signin`, signin);
router.get(`/logout`, logout);
router.get("/update-info", renderUpdateUserPage); // Trang đổi thông tin
router.post("/update-info", updateUserInfo); // Xử lý đổi thông tin
router.get("/update-password", renderUpdateUserPassword);//Trang đổi mật khẩu
router.post("/update-password", updateUserPassword);//thay đổi mật khẩu

export default router;