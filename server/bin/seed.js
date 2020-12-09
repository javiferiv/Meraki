const mongoose = require('mongoose')
const User = require('../models/user.model')
const Book = require('../models/book.model')
const Event = require('../models/event.model')
const Chapter = require('../models/chapter.model')

const dbtitle = 'Proyecto-final'
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useUnifiedTopology: true, useNewUrlParser: true })

User.collection.drop()
Event.collection.drop()
Book.collection.drop()
Chapter.collection.drop()

// const books = [
//     {
//         title: "Aventuras divertidas",
//         genre: "Novela negra",
//         resume: "Un libro muy divertido",
//         chapters: [],
//         author: {
//             name: 'Jorge Martín',
//             gender: "Masculino",
//             username: "jorgem",
//             password: "jorge1234"

//         }
//     },

// ]

// const events = [
//     {
//         name: "Presentación del libro",
//         place: "FNAC Callao",
//         author: {
//             name: 'Jorge Martín',
//             gender: "Masculino",
//             username: "jorgem",
//             password: "jorge1234"

//         },
//         capacity: 10,

//     },

// ]
// const chapters = [
//     {
//         title: "Capítulo 1",
//         resume: "FNAC Callao",
//         text: 'djflasjñdflajsdflkasjdfñlkajsdfñlkajñflkasjdñlfksdjñafjkñas',
//         comments: [], 
//         book: {title: "Aventuras divertidas",
//         genre: "Novela negra",
//         resume: "Un libro muy divertido",
//         chapters: [],
//         author: {
//             name: 'Jorge Martín',
//             gender: "Masculino",
//             username: "jorgem",
//             password: "jorge1234"

//             }
//         }
//     },

// ]

const chapters = [
    {
        title: "Capítulo 1",
        resume: "FNAC Callao",
        text: 'djflasjñdflajsdflkasjdfñlkajsdfñlkajñflkasjdñlfksdjñafjkñas',
        comments: [],
        book: {
            title: "Aventuras divertidas",
            genre: "Novela negra",
            resume: "Un libro muy divertido",
        }
    },

]
Promise.all(chapters.map(chapter => Book.create(chapter.book).then(book => book.title)))
    .then(() => chapters.map(chapter => Book.findOne({ title: chapter.book.title }).then(book => Object.assign({}, chapter, { book: book._id }))))
    .then(findBooks => Promise.all(findBooks).then(chapters => chapters.map(chapter => Chapter.create(chapter))))
    .then(savedChapters => Promise.all(savedChapters).then(chapters => chapters.forEach(chapter => console.log(`Capítulo ${chapter.title} creado`))).then(() => mongoose.connection.close()))
    .catch(error => console.log('Error: ', error))