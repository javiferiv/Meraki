import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import BooksService from '../../../../service/book.service'
import BookCard from './Book-card'

import './Books-list.css'

class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            user: "",
        }
        this.booksService = new BooksService()
    }

    componentDidMount = () => {
        this.refreshBooks()
        this.isLoggedUser()
    }

    refreshBooks = () => {
        
        this.booksService
            .getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err))
        
    }

    isLoggedUser = () => {
        {
            this.props.loggedUser
                &&
         this.setState({ user: this.props.loggedUser._id })
   
        }
    }

    render() {

        return (
            <>
                <Container>

                    <h1>Listado de libros</h1>
                    <Row>
                        {this.state.books.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                   
                </Container>
            </>
        )
    }
}

export default BookList