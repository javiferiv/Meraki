const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        default: "Desconocido"
    },
    birthday: {
        type: Date,
        required: true,
        default: Date.now()
    },
    gender: {
        type: String,
        enum: ["Masculino", "Femenino", "Otro"],
        default: "Otro"
    },
    imageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLufxaN3brIsx_3u42mCxRJKFvoyEhbbw73A&usqp=CAU"
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    favoriteBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Books'
    }],
    favoriteAuthors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    role: {
        type: String,
        enum: ['Escritor', 'Lector'],
        default: "Escritor",
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User