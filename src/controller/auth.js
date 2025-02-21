import User from "../models/user";
import { registerSchema } from "../schema/auth";
import bcryptjs from "bcryptjs";
import Book from "../models/book";

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

        res.redirect("/?message=Đăng ký thành công!");
    } catch (err) {
        console.error("Lỗi trong quá trình đăng ký:", err);
        res.status(500).render("signup", { errors: ["Đã xảy ra lỗi, vui lòng thử lại sau."] });
    }
};
//dang nhap
export const signin = async (req, res) => {
    const { username, password } = req.body;
    const books = await Book.find();
    console.log(req.body)
    console.log(req.session);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render("signin", {
                message: "Username không tồn tại.",
                username,
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render("signin", {
                message: "Mật khẩu không chính xác.",
                username,
            });
        }

        // Lưu thông tin vào session
        req.session.userId = user._id;
        req.session.username = user.username;

        res.render("home1", {books, username: user.username });
    } catch (err) {
        console.error("Lỗi trong quá trình đăng nhập:", err);
        res.status(500).render("signin", {
            message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
            username, // Đảm bảo email được giữ lại
        });
    }
};
//dang xuat
export const logout = async (req, res) =>{
    req.session.destroy(function(err) {
        return  res.redirect('/?message=Đăng xuất thành công!');
    })
}
//Cập nhật thông tin người dùng
export const renderUpdateUserPage = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!req.session.userId) {
            return res.redirect("/signin");
        }

        console.log("UserId from session:", req.session.userId);

        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const user = await User.findById(req.session.userId);
        
        if (!user) {
            console.log("User not found in database for ID:", req.session.userId);
            return res.status(404).send("Không tìm thấy thông tin người dùng.");
        }

        const username = user.username;

        console.log("User found:", user);
        console.log("Username:", username);
        // Render trang cập nhật với thông tin người dùng
        res.render("updateProfile", { 
            user, // Truyền thông tin người dùng vào view
            username,
            errors: [] 
        });
    } catch (error) {
        console.error("Lỗi khi hiển thị trang cập nhật thông tin:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
//Xu ly cap nhat thong tin nguoi dung
export const updateUserInfo = async (req, res) => {
    const { username, age } = req.body;
    const products = await Product.find();

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
        res.render("home1", { message: "Bạn đã sửa thông tin thành công!" , products, username: updatedUser.username });
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        res.status(500).render("updateProfile", {
            user: req.session, 
            errors: ["Đã xảy ra lỗi, vui lòng thử lại sau."],
        });
    }
};
//Cập nhật mật khẩu
export const renderUpdateUserPassword = async (req, res) => {
    console.log(req.session);
    try {
        const user = await User.findById(req.session.userId); 
        const username = user.username;
        if (!user) {
            return res.status(404).send("Không tìm thấy thông tin người dùng.");
        }

        res.render("updatePassword", { user, username, errors: [] });
    } catch (error) {
        console.error("Lỗi khi hiển thị trang cập nhật thông tin:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
//Xu ly cap nhat mat khau
export const updateUserPassword = async (req, res) => {
    try {
      const { oldPassword, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Mật khẩu mới và xác nhận mật khẩu không khớp." });
      }

      const username = req.session.username;
      const newPassword = password; // Tìm người dùng theo username
      // Tìm người dùng theo username
      console.log(req.body)
      console.log(req.session);
    //   console.log(req.body);
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
  
      // Kiểm tra mật khẩu cũ
      const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Mật khẩu cũ không chính xác." });
      }
      

      if (!newPassword) {
        return res.status(400).json({ message: "Mật khẩu mới không được để trống." });
        }

      // Cập nhật mật khẩu mới
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      user.password = hashedPassword;
  
      // Lưu lại thay đổi
      await user.save();
  
      res.redirect("/?message=Cập nhật mật khẩu thành công!");
    } catch (error) {
      console.error("Error updating password:", error.message);
      res.status(500).json({ message: "Đã xảy ra lỗi.", error: error.message });
    }
  };