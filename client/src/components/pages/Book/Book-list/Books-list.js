import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import BooksService from '../../../../service/book.service'
import BookCard from './Book-card'

import './Books-list.css'

class BookList extends Component {

    constructor() {
        super()
        this.state = {
            books: [],
        }
        this.booksService = new BooksService()
    }

    componentDidMount = () => {
        this.refreshBooks()
    }

    refreshBooks = () => {
        
        this.booksService
            .getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Container>

                    <h1>Listado de libros</h1>
                    <Row>
                        {this.state.books.map(elm => <BookCard key={elm._id} {...elm}  />)}
                    </Row>
                   
                </Container>
            </>
        )
    }
}

export default BookList