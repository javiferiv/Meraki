module.exports = app => {

    // Base URLS
    app.use('/api/books', require('./book.routes.js'))
    app.use('/api/events', require('./events.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/chapter', require('./chapter.routes.js'))
}