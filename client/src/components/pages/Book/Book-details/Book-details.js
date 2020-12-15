
import React, { Component } from 'react'
import BooksService from '../../../../service/book.service'
import UserService from '../../../../service/user.service'
import ChapterService from '../../../../service/chapter.service'

import './Book-details.css'
import ChapterCard from '../../Chapter/Chapter-card/Chapter-card'
import Popup from './../../../shared/Popup/Popup'
//si ponemos loader, irá aquí 

import { Form, Container, Row, Col, Button, Modal } from 'react-bootstrap'

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

            user: {

            },

            authority: false,

            favoritesBook: this.props.loggedUser ? this.props.loggedUser.favoriteBooks : [],

            showModal: false,
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
            // .then( () => {
            //     this.refreshChapters()
            // } )

            .catch(err => console.log(err))
        this.getUser()
        this.isUser()

        console.log(this.state)
    }

    componentDidUpdate = (res) => {
        this.refreshChapters()
        // if (this.props.match.params.capitulo_id != this.props.match.params.capitulo_id) {
        //     this.bookService
        //         .getBook(res.data.book._id)
        //         .then((res) => {
        //             console.log(res.data._id, res.data.chapters) //saca la info del libro
        //             this.bookService
        //                 .editBook(res.data._id, { chapters: res.data.chapters })
        //         })
        // }
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

    // handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    // handleSubmit = e => {
        
    //     e.preventDefault()
        
    //     const book_id = this.props.match.params.book_id

    //     this.bookService
    //         .editBook(book_id, this.state)
    //         .then(res =>
    //         {
    //             this.props.history.push(`/libros`)
    //         console.log(this.state)})
    //         .catch(err => console.log('Error', err))
        
    // }

    handleModal = visible => this.setState({ showModal: visible })
    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

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
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            {this.props.loggedUser && <Button onClick={() => this.handleModal(true)} variant="success" size="lg">Tú decides cómo continuar la historia</Button>}
                        </Col>
                    </Row>
                </Container>
                
                <Popup show={this.state.showModal} handleModal={this.handleModal} loggedUser={this.props.loggedUser} />
                
                <Container>
                    
                    <Col md={4}>
                        <h3>Comentarios</h3>
                        {this.state.book.comments}
                    </Col>
                    <Row>
                        <Col md={12}>
                            
                            {this.props.loggedUser &&
                                
                                <Form className="form" onSubmit={this.handleSubmit}>
                    
                                <Form.Group controlId="text">
                                    
                                        <Form.Label>Deja aquí tu comentario</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Deja aquí tu comentario" type="text" name="comments" value={this.state.comments} onChange={this.handleInputChange} />

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






