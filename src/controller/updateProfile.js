import User from "../models/user.js";
import bcryptjs from "bcryptjs";

// Hàm render trang cập nhật thông tin
export const renderUpdateUserPage = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!req.session.userId) {
            return res.redirect("/signin");
        }

        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send("Không tìm thấy thông tin người dùng.");
        }

        // Render trang cập nhật với thông tin người dùng
        res.render("updateProfile", { 
            user, // Truyền thông tin người dùng vào view
            errors: [] 
        });
    } catch (error) {
        console.error("Lỗi khi hiển thị trang cập nhật thông tin:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
//Xu ly
export const updateUserInfo = async (req, res) => {
    const { username, age } = req.body;

    try {
        // Kiểm tra nếu không có thông tin người dùng trong session
        if (!req.session || !req.session.userId) {
            return res.status(401).send("Bạn chưa đăng nhập.");
        }

        // Cập nhật thông tin người dùng trong MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            req.session.userId, 
            { username, age }, 
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).send("Không tìm thấy người dùng.");
        }

        // Cập nhật lại session với thông tin mới
        req.session.username = updatedUser.username;
        req.session.age = updatedUser.age;

        // await req.user.save();
        res.redirect("/home1?message=Cập nhật thông tin thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        res.status(500).render("updateProfile", {
            user: req.session, 
            errors: ["Đã xảy ra lỗi, vui lòng thử lại sau."],
        });
    }
};

export const updateUserPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    try {
        if (!req.session.user) {
            return res.status(401).send("Bạn chưa đăng nhập.");
        }

        if (password !== confirmPassword) {
            return res.render("update-info", {
                user: req.session.user,
                errors: ["Mật khẩu và xác nhận mật khẩu không khớp."],
            });
        }

        // Hash mật khẩu mới
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Cập nhật mật khẩu người dùng trong MongoDB
        await User.findByIdAndUpdate(req.session.user._id, {
            password: hashedPassword,
        });

        res.render("home1", { message: "Mật khẩu đã được cập nhật thành công!" });
    } catch (error) {
        console.error("Lỗi khi cập nhật mật khẩu:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};