import Book from "../models/book";
import chapter from "../models/chapter";
import Chapter from "../models/chapter";

export const addChapter = async (req,res) => {
    try {
        const { chapterNumber, title, pages} = req.body;
        const bookId = req.params.id;
        const newChapter = new Chapter({bookId, chapterNumber, title, pages});
        await newChapter.save();
        res.status(201).json({message: "Chapter added successfully", chapter: newChapter});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getChapters = async (req,res) => {
    try {
        const data = await Chapter.find({bookId: req.params.id});
        if(data.length < 0) {
            return res.status(404).json({message: "No books found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
