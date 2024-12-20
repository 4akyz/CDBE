import product from "../models/product";

export const getProducts = async (req,res) => {
    try {
        const data = await product.find();
        if(data.length < 0) {
            return res.status(404).json({message: "No products found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getProductById = async (req,res) => {
    try {
        const data = await product.findOne({_id: req.params.id});
        if(data.length < 0) {
            return res.status(404).json({message: "No products found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const addProduct = async (req,res) => {
    try {
        const data = await product(req.body).save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteProduct = async (req,res) => {
    try {
        const data = await product.findOneAndDelete({_id: req.params.id});
        if(data.length < 0) {
            return res.status(404).json({message: "No products found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateProduct = async (req,res) => {
    try {
        const data = await product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true });
        if(data.length < 0) {
            return res.status(404).json({message: "No products found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};