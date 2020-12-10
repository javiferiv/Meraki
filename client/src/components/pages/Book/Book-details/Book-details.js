import React, { Component } from 'react'
import BooksService from '../../../../service/book.service'
import AuthService from '../../../../service/auth.service'
import ChapterService from '../../../../service/chapter.service'

import './Book-details.css'
import ChapterCard from '../../Chapter/Chapter-card/Chapter-card'

//si ponemos loader, irá aquí 

import { Container, Row, Col, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class BookDetails extends Component {

    constructor(props) {
        super(props)
        this.state =
        {
            book: {
                title: '',
                genre: '',
                resume: '',
                chapters: []
            },

            favoritesBook: this.props.loggedUser ? this.props.loggedUser.favoriteBooks : [],
        }
        

        this.bookService = new BooksService()
        this.authService = new AuthService()
        this.chapterService = new ChapterService()
    }

    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.bookService
            .getBook(book_id)
            .then(res => { this.setState({ book: res.data }) })
            .catch(err => console.log(err))

        this.refreshChapters()
    }

    deleteThisBook = () => {

        const book_id = this.props.match.params.book_id

        this.bookService
            .deleteBook(book_id)
            .then(res => this.props.history.push('/libros'))
            .catch(err => console.log(err))

    }

    newChapter = () => {

        const book_id = this.props.match.params.book_id

        this.bookService
            .getBook(book_id)
            .then(res => this.props.history.push(`/libros/nuevo-capitulo/${book_id}/`))
            .catch(err => console.log(err))

    }

    saveFav = (bookID) => {

        const favoriteBook = this.props.loggedUser.favoriteBooks

        favoriteBook.push(bookID)

        this.authService
            .editUser(this.props.loggedUser._id, { favoriteBooks: favoriteBook })
            .then((response) => { this.props.setTheUser(response.data) })
            .catch(err => console.log(err))
    }

    refreshChapters = () => {

        const book_id = this.props.match.params.book_id

        this.chapterService
            .getChapters(book_id)
            .then(res => {
                this.setState({ chapters: res.data })
           
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container>
                    <h1>{this.state.book.title}</h1>
                </Container>
                <Container className="book-details">
                    <Row>
                        <Col md={{ span: 6, offset: 1 }} >
                            <img src={this.state.book.image} alt={this.state.book.title} />
                            <h3>Detalles</h3>
                            <p>{this.state.book.resume}</p>
                            <hr />
                            <p>Género: {this.state.book.genre}</p>
                            <Button onClick={() => this.newChapter()} className="btn btn-sm btn-primary">Nuevo capítulo</Button>
                            <Link to="/libros" className="btn btn-sm btn-dark">Volver</Link>
                            {
                                this.props.loggedUser && <Button onClick={() => this.saveFav(this.state.book._id)} >Añadir a favoritos</Button>

                            }
                            <Button onClick={() => this.deleteThisBook()} className="btn btn-sm btn-danger">Borrar</Button>


                        </Col>
                        <Col md={4}>
                            <h3>Lista de capítulos</h3>
                            {this.state.book.chapters.map(elm => <ChapterCard key={elm._id} {...elm}/>)}
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export default BookDetails





