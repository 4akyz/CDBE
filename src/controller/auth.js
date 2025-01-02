import User from "../models/user";
import { registerSchema } from "../schema/auth";
import bcryptjs from "bcryptjs";

//Dang ky
export const signup = async (req, res) => {
    const { username, password, confirmPassword, email, age } = req.body;
    console.log(req.body)
    console.log("test")
    try {
        // if (!/^[a-zA-Z0-9]+$/.test(password)) {
        //     console.log("Password chỉ được chứa số")
        //     return res.status(400).render("signup", { errors: ["Password chỉ được chứa số"] });
        // }

        if (password !== confirmPassword) {
            console.log("Password và Confirm Password không khớp")
            return res.status(400).render("signup", { errors: ["Password và Confirm Password không khớp"] });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            age,
        });

        res.redirect("/");
    } catch (err) {
        console.error("Lỗi trong quá trình đăng ký:", err);
        res.status(500).render("signup", { errors: ["Đã xảy ra lỗi, vui lòng thử lại sau."] });
    }
};
//dang nhap
export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render("signin", { message: "username không tồn tại" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render("signin", { message: "Mật khẩu không chính xác" });
        }

        req.session.userId = user._id;

        res.render("home1", { username: user.username });
    } catch (err) {
        console.error("Lỗi trong quá trình đăng nhập:", err);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
//dang xuat
export const logout = (req, res) => {
    try {
        req.user = null; 

        // Chuyển hướng về trang sign in
        res.render("signin");
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};