import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    chapterNumber: {
        type: Number,
    },
    title: {
        type: String,
    },
    pages: [String],
}, {timestamps: true, versionKey: false});

export default mongoose.model('Chapter', chapterSchema);