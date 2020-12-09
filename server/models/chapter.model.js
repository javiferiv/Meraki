const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },

    resume: {
        type: String,
        trim: true,
        required: true,
    },

    text: {
        type: String,
        required: true
    },

    comments: {
        type: [],
    },

    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },

}, {
    timestamps: true
})

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;