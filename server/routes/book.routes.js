const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('./../models/book.model')
const User = require('./../models/user.model')
const { checkId } = require('./middlewares')

router.get('/getAllBooks', (req, res) => {

    Book
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/bookDetails/:book_id', checkId, (req, res) => {
    
    Book
        .findById(req.params.book_id)
        .populate('author')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newBook', (req, res) => {

    // const { title, genre, name, resume, imageUrl, author } = req.body

    Book
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editBook/:book_id', (req, res) => {

    Book
        .findByIdAndUpdate(req.params.book_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteBook/:book_id', (req, res) => {

    Book
        .findByIdAndDelete(req.params.book_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router