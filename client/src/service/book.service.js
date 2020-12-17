import axios from 'axios'

export default class BookService {

    constructor() {
        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api/books',
            baseURL: `${process.env.REACT_APP_API_URL}/books`,
        })
    }

    getBooks = () => this.apiHandler.get('/getAllBooks')
    getBook = bookId => this.apiHandler.get(`/bookDetails/${bookId}`)
    saveBook = bookInfo => this.apiHandler.post('/newBook/', bookInfo)
    editBook = (bookId, book) => this.apiHandler.put(`/editBook/${bookId}`, book)
    deleteBook = bookId => this.apiHandler.delete(`/deleteBook/${bookId}`)

}