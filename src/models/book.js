import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: [String],
    },
    rating: {
        type: Number,
    },
    summary: {
        type: String,
    },
    follow: {
        type: Number,
    },
    status: {
        type: String,
    },
    cover: {
        type: String,
    },
    author: {
        type: String,
    },
    chapters: {
        type: Number,
    },
}, {timestamps: true, versionKey: false});

export default mongoose.model('Book', bookSchema);