import express from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/product";

const router = express.Router();

router.get(`/products`, getProducts);
router.get(`/products/:id`, getProductById);
router.post(`/products`, addProduct);
router.put(`/products`, deleteProduct);
router.delete(`/products`, updateProduct);

export default router;