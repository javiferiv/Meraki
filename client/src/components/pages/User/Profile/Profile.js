import React, { Component } from 'react'
import './Profile.scss'
import UserService from '../../../../service/user.service'
import BookService from '../../../../service/book.service'
import imageFavoriteBooks from './images/painting-purple.png'
import wavyLine from './images/wavy_line.png'
import blueSpot from './images/blue_spot.png'
import { Container, Row, Col } from 'react-bootstrap'
import FavoriteBooksCard from './Favorite-books'
import FavoriteAuthCard from './Favorite-authors'
import { Link } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                name: "",
                birthday: '',
                favoriteBooks: [],
                favoriteAuthors: [],
                myWrittenBooks: []
            },
            books: [],
            newBirthday: "",
        }

        this.userService = new UserService()
        this.bookService = new BookService()
    }



    deleteThisUser = () => {
        const userID = this.props.loggedUser._id

        this.userService
            .deleteUser(userID)
            .then(res => { this.props.history.push('/') })
            .catch(err => console.log(err))

    }

    componentDidMount = () => {
        const userID = this.props.loggedUser._id

        this.userService
            .getOneUser(userID)
            .then(res => {
                this.setState({ user: res.data })
                this.myBooks()
                this.isBookAvailable()
                this.newBirthdayDate()
            })
            .catch(err => console.log(err))
    }

    isBookAvailable = () => {
        const Books = this.state.user.favoriteBooks
        const userBooks = [...this.state.books]

        if (Books !== undefined) {
            Books.forEach(elm => this.bookService.getBook(elm)
                .then(res => {
                    if (res.data != null) { userBooks.push(res.data._id) }
                    this.setState({ books: userBooks })
                })
                .catch(err => console.log(err))
            )
        }
    }

    newBirthdayDate = () => {
        let birthdayDate = this.state.user.birthday
        let birthdayDateObject = new Date((birthdayDate));
        let newBirthdayDate = `${birthdayDateObject.getDate()} / ${birthdayDateObject.getMonth() + 1} / ${birthdayDateObject.getFullYear()}`
        this.setState({ user: { ...this.state.user, birthday: newBirthdayDate } })
    }
    
    myBooks = () => {
        const Books = this.state.user.myWrittenBooks
        const myBooks = [...this.state.books]

        if (Books !== undefined) {
            Books.forEach(elm => this.bookService.getBook(elm)
                .then(res => {
                    if (res.data != null) { myBooks.push(res.data._id) }
                    this.setState({ user: { ...this.state.user, myWrittenBooks: myBooks } })
                })
                .catch(err => console.log(err))
            )
        }
    }

    render() {

             return (
            <>
                            <img className="image-favorite-book" src={blueSpot} style={{ position: "absolute", top: "100px", zIndex: "0", width: "90%" }} alt="mancha"></img>
                            <div className="first-division-container">

                                <Container className="profile-container">
                                    <h1>¡Bienvenid@, {this.state.user.username}!</h1>
                                    <hr></hr>
                                    <Row className='first-row-profile justify-content-center' >
                                        <Col md={12} >

                                            <img className="profile-img" src={this.state.user.imageUrl} alt="profile"></img>
                                            <br></br>
                                        </Col>
                                        <Col md={6}>
                                            <p style={{ fontStyle: "italic", textAlign: "center" }}>{this.state.user.description}</p>


                                        </Col>
                                    </Row>
                    
                        <br></br>
                        <Row>
                            <Col className="profile-data" md={6}>

                                <h2>Datos del perfil: </h2>
                                <p>Nombre: {this.state.user.name}</p>
                                <p>Tu fecha de nacimiento es: {this.state.user.birthday}!</p>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="profile-data-buttons" md={6}>

                                <Link className="default-button" style={{ marginRight: "20px" }} to={`/editar-perfil/${this.state.user._id}`}>Editar perfil</Link>
                                <br />
                                <br />
                                <Link className="default-button" onClick={() => this.deleteThisUser()}>Borrar perfil</Link>

                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="division-book-container">
                    <Container>
                        <br />
                        {this.state.user.myWrittenBooks.length >= 1 &&
                            <>
                                <Row className="favorite-books-container">
                                    <Col md={6}>
                                        <h2 className="title-favorite-book">Estos son tus libros publicados</h2>

                                    </Col>
                                </Row>
                                <Row>
                                    <>
                                        {this.state.user.myWrittenBooks.map(elm => <FavoriteBooksCard key={elm._id} books={elm} />)}
                                    </>
                                </Row>
                            </>
                        }
                    </Container>
                </div>
                <div className="division-book-container">
                    <Container>
                        <br />
                        {this.state.books.length >= 1 &&
                            <>
                                <Row className="favorite-books-container">
                                    <Col md={6}>
                                        <img className="image-favorite-book" src={imageFavoriteBooks} alt="mancha"></img>
                                        <h2 className="title-favorite-book">Estos son tus libros favoritos</h2>

                                    </Col>
                                </Row>
                                <Row>
                                    <>
                                        {this.state.books.map(elm => <FavoriteBooksCard key={elm._id} books={elm} />)}
                                    </>
                                </Row>
                            </>
                        }
                    </Container>
                </div>
                <div className="division-author-container">
                    <Container>
                        {this.state.user.favoriteAuthors.length >= 1 &&
                            <>
                                <Row className="favorite-author-container">
                                    <Col md={6}>
                                        <img className="image-favorite-author" src={wavyLine} alt="wavy-line"></img>
                                        <h2 style={{ marginBottom: "40px" }}>Estos son tus autores favoritos</h2>
                                    </Col>
                                </Row>

                                <Row>
                                    {this.state.user.favoriteAuthors.map(elm => <FavoriteAuthCard key={elm._id} author={elm} />)}
                                </Row>
                            </>
                        }
                    </Container >
                </div>
            </>
        )
    }
}

export default Profile
