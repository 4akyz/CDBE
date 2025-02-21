import Genre from "../models/genres";

//ham tim tat ca cac the loai
export const getGenres = async (req,res) => {
    try {
        const data = await Genre.find();
        if(data.length < 0) {
            return res.status(404).json({message: "No genres found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getGenreById = async (req,res) => {
    try {
        const data = await Genre.findOne({_id: req.params.id});
        if(data.length < 0) {
            return res.status(404).json({message: "No genres found"});
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const addGenre = async (req,res) => {
    try {
        console.log("Received Data:", req.body);
        const data = await Genre(req.body).save();
        console.log("Saved Data:", data);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}