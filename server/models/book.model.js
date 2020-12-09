const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },

    genre: {
        type: String,
        enum: ["Ciencia Ficción", "Novela negra", "Aventuras", "Misterio", "Infantil", "Romántico", "Terror", "Otro"],
        required: true,
        default: "Otro"
    },

    resume: {
        type: String,
        trim: true,
        required: true,
    },

    chapters: {
        type: [],
    },

    image: {
        type: String,
        default: "https://www.gruposertec.com/wp-content/uploads/2015/03/no_image_available.jpeg",

    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;