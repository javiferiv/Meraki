const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('./../models/book.model')
const Chapter = require('./../models/chapter.model')
//const { checkId } = require('./../../middlewares/middlewares.js')

router.get('/getAllChapters', (req, res) => {

    Chapter
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/chapterDetails/:chapter_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.chapter_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Chapter
        .findById(req.params.chapter_id)
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
        .findByIdAndUpdate(req.params.chapter_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteChapter/:chapter_id', (req, res) => {

    Chapter
        .findByIdAndDelete(req.params.chapter_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router