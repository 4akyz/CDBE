import Product from "../models/product.js";

export const renderHome = async (req, res) => {
    try {
        const username = req.query.username || req.user?.username || "Người dùng";

        const products = await Product.find();

        res.render("home1", {
            username,
            products,
            message: req.query.message || "", // Thêm thông báo nếu có
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).send("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
};
// export const renderUpdateInfo = (req, res) => {
//     const user = {
//         username: "",
//         email: "",
//         age: 25
//     }; // Thay thế bằng dữ liệu thực tế từ DB
//     res.render("update-info", { user, errors: [] });
// };