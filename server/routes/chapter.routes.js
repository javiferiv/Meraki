const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('./../models/book.model')
const Chapter = require('./../models/chapter.model')

router.get('/getAllChapters', (req, res) => {

    Chapter
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/chapterDetails/:chapter_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.book_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Chapter
        .findById(req.params.book_id)
        .populate('book')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newChapter', (req, res) => {

    Chapter
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editChapter/:chapter_id', (req, res) => {

    Chapter
        .findByIdAndUpdate(req.params.book_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteChapter/:book_id', (req, res) => {

    Chapter
        .findByIdAndDelete(req.params.book_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router