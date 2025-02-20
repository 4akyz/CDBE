import Book from "../models/book";

//ham tim tat ca cac sach
export const getBooks = async (req,res) => {
    try {
        const data = await Book.find();
        if(data.length < 0) {
            return res.status(404).json({message: "No books found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getBookById = async (req,res) => {
    try {
        const data = await Book.findOne({_id: req.params.id});
        if(data.length < 0) {
            return res.status(404).json({message: "No books found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const addBook = async (req,res) => {
    try {
        console.log("Received Data:", req.body);
        const data = await Book(req.body).save();
        console.log("Saved Data:", data);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
