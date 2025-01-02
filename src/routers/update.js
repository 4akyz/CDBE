import express from 'express';
import { updateUserInfo,renderUpdateUserPage } from '../controller/updateProfile';

const router = express.Router();
// Trang cập nhật thông tin
router.get('/update-info', renderUpdateUserPage);
router.post('/update-info', updateUserInfo);

//Trang cap nhat mat khau

export default router;