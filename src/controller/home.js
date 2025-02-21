import User from "../models/user.js";
import Book from "../models/book.js";

// Hiển thị trang chủ
export const renderHome = async (req, res) => {
    try {
        console.log(req.session.userId);
        const user = await User.findById(req.session.userId);
        console.log(user);
        const username = user.username;

        const books = await Book.find().lean();
        console.log(books);

        res.render("home1", {
            username,
            books,
            message: req.query.message || "", // Thêm thông báo nếu có
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};

// Hiển thị trang cac the loai sach
export const renderGenres = async (req, res) => {
    try {
        console.log(req.user);
        
        const username = req.query.username || req.user?.username || "Người dùng";
        const books = await Book.find();

        res.render("genres", {
            username,
            books,
            message: req.query.message || "", // Thêm thông báo nếu có
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};

// Hiển thị trang cac sach dang theo doi
export const renderFollow = async (req, res) => {
    try {
        console.log(req.user);
        const username = req.query.username || req.user?.username || "Người dùng";
        const books = await Book.find();

        res.render("follow", {
            username,
            books,
            message: req.query.message || "", // Thêm thông báo nếu có
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};

// Hiển thị trang giới thiệu
export const renderAbout = async (req, res) => {
    try {
        console.log(req.user);
        const username = req.query.username || req.user?.username || "Người dùng";
        const books = await Book.find();

        res.render("about", {
            username,
            books,
            message: req.query.message || "", // Thêm thông báo nếu có
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
