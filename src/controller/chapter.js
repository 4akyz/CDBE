import Book from "../models/book";
import Chapter from "../models/chapter";
import User from "../models/user";
//ham them chapter
export const addChapter = async (req,res) => {
    try {
        console.log("Received Request to Add Chapter");
        console.log("Request Body:", req.body); 
        console.log("Book ID:", req.params.id);
        
        const { chapterNumber, title, pages} = req.body;
        const bookId = req.params.id;
        const newChapter = new Chapter({bookId, chapterNumber, title, pages});
        await newChapter.save();
        res.status(201).json({message: "Chapter added successfully", chapter: newChapter});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//ham render chapter
export const renderChapter = async (req, res) => {
    try {
        console.log("Received params:", req.params); // Debugging line

        const user = await User.findById(req.session.userId);
        const { bookId, chapterNumber } = req.params;
        const username = user.username;
        // Find chapter by bookId and chapterNumber
        const chapter = await Chapter.findOne({ bookId, chapterNumber });

        console.log("Found chapter:", chapter); // Debugging line

        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        res.render("reading", { chapter, username });
    } catch (error) {
        console.error("Error fetching chapter:", error); // Debugging line
        res.status(500).json({ message: error.message });
    }
};



