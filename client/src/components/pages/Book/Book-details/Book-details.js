
import React, { Component } from 'react'
import BooksService from '../../../../service/book.service'
import UserService from '../../../../service/user.service'
import ChapterService from '../../../../service/chapter.service'

import ChapterCard from '../../Chapter/Chapter-card/Chapter-card'

//si ponemos loader, irá aquí
import './Book-details.css'

import { Form, Container, Row, Col, Button } from 'react-bootstrap'

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
                chapters: [],
                comments: [],
                author: '',
            },


            newComment: "",

            authority: false,

            favoritesBook: this.props.loggedUser ? this.props.loggedUser.favoriteBooks : [],

            
            showToast: false,
            toastText: ''
        }


        this.bookService = new BooksService()
        this.userService = new UserService()
        this.chapterService = new ChapterService()

    }

    componentDidMount() {

        const book_id = this.props.match.params.book_id

        this.bookService
            .getBook(book_id)
            .then(res => {
                this.setState({ book: res.data })
                this.isAuthorised()
            })


            .catch(err => console.log(err))
        this.getUser()
        this.isUser()
    }

    componentDidUpdate = (res) => {
        this.refreshChapters()

    }

    getUser = () => {

        this.userService
            .getAllUser()
            .then(res => {
                this.setState({ user: res.data })
            })
            .catch(err => console.log(err))
    }

    deleteThisBook = () => {

        const book_id = this.props.match.params.book_id


        this.bookService
            .deleteBook(book_id)
            .then(res => {
                this.state.favoritesBook.splice(book_id, 1)
                this.setState({ user: this.state.favoritesBook })
                this.props.history.push('/libros')
            })
            .catch(err => console.log(err))

    }

    isUser = () => {

        let userID = this.state.user

        let newUserID = ""

        if (userID != undefined) {
            newUserID = userID._id
            this.setState({ id: newUserID })
        }

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

        this.userService
            .editUser(this.props.loggedUser._id, { favoriteBooks: favoriteBook })
            .then((response) => { this.props.setTheUser(response.data) })
            .catch(err => console.log(err))
    }


    refreshChapters = () => {

        const book_id = this.props.match.params.book_id

        this.chapterService
            .getAllBookChapters(book_id)
            .then(res => {
                const newState = { ...this.state }
                newState.book.chapters = res.data
                this.setState(newState)
            })
            .catch(err => console.log(err))
    }

    isAuthorised = () => {

        let newUserID = ""
        let newBookAuthorID = this.state.book.author._id

        if (this.props.loggedUser) {
            newUserID = this.props.loggedUser._id
        }

        if (newUserID === newBookAuthorID) { this.setState({ authority: true }) }

    }

    handleInputChange = e => {
    

        const {name, value} = e.target

        this.setState({ book: { ...this.state.book, [name]: value  } })

    }



    handleSubmit = e => {

        e.preventDefault()
        
        const book_id = this.props.match.params.book_id

        const newComment = this.state.book.newComment

        this.bookService
        .getBook(book_id)
        .then(res => {
                const commentPushed = [...res.data.comments]
                commentPushed.push(newComment)
                this.bookService
                    .editBook(book_id, { comments: commentPushed })
                    .then (res => console.log(res.data))
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
                            <img src={this.state.book.imageBook} alt={this.state.book.title} />
                            <h3>Detalles</h3>
                            <p>{this.state.book.resume}</p>
                            <p>Autor/a:<Link to={`/usuario/${this.state.book.author._id}`}>{this.state.book.author.name}</Link></p>
                            <hr />
                            <p>Género: {this.state.book.genre}</p>
                            <>
                                {
                                    this.state.authority === true
                                    &&
                                    <>
                                        <Button onClick={() => this.newChapter()} className="btn btn-sm btn-primary">Nuevo capítulo</Button>
                                        <Button onClick={() => this.deleteThisBook()} className="btn btn-sm btn-danger">Borrar</Button>
                                    </>

                                }
                            </>

                            <Link to="/libros" className="btn btn-sm btn-dark">Volver</Link>
                            {
                                this.props.loggedUser && <Button onClick={() => this.saveFav(this.state.book._id)} >Añadir a favoritos</Button>

                            }


                        </Col>
                        <Col md={4}>
                            <h3>Lista de capítulos</h3>
                            {this.state.book.chapters.map(elm => <ChapterCard key={elm._id} {...elm} />)}
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <br />

                <Container>

                    <Col md={4}>
                        <h3>Comentarios</h3>
                        <hr></hr>
                        {this.state.book.comments.map(elm => 
                        <ul>
                   
                        <li>{elm}</li>
                        <hr></hr>
                        </ul>)}
                    </Col>
                    <Row>
                        <Col md={12}>

                            {this.props.loggedUser &&

                                <Form className="form" onSubmit={this.handleSubmit}>

                    
                                <Form.Group controlId="text">
                                    
                                    <Form.Label>Valoración</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Deja aquí tu comentario" type="text" name="newComment" onChange={this.handleInputChange} />

                                    </Form.Group>

                                    <Button variant="dark" type="submit">Comentar</Button>

                                </Form>


                            }


                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export default BookDetails






