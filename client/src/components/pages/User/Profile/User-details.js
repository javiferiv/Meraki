import React, { Component } from 'react'
import './User-details.scss'
import wavyLine from './images/wavy_line.png'
import imageFavoriteBooks from './images/painting-purple.png'
import emptyHeart from './images/empty_heart.png'
import fullHeart from './images/full_heart.png'
import UserService from '../../../../service/user.service'
import BookService from '../../../../service/book.service'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
                favoriteBooks: [],
                favoriteAuthors: []
            },
            books: [],
            isFavorite: false,
            favoritesAuthors: this.props.loggedUser ? this.props.loggedUser.favoriteAuthors : [],
        }


        this.userService = new UserService()
        this.bookService = new BookService()
    }


    componentDidMount = () => {

        const userID = this.props.match.params.user_id

        this.userService
            .getOneUser(userID)
            .then(res => {
                this.setState({ user: res.data })
                this.isBookAvailable()
            })
            .catch(err => console.log(err))



    }

    isBookAvailable = () => {


        const Books = [...this.state.user.favoriteBooks]

        const userBooks = [...this.state.books]

        if (Books) {

            Books.forEach(elm =>

                this.bookService
                    .getBook(elm)
                    .then(res => res.data != null && userBooks.push(res.data._id))
                    .catch(err => console.log(err))
            )
        }

    }

    saveFav = (authID) => {

        const favoriteAuthor = this.props.loggedUser.favoriteAuthors

        favoriteAuthor.push(authID)

        this.userService
            .editUser(this.props.loggedUser._id, { favoriteAuthors: favoriteAuthor })
            .then((response) => { this.props.setTheUser(response.data) })
            .catch(err => console.log(err))
    }

    isFavorite = () => {
        this.saveFav(this.state.user._id)
        this.setState({ isFavorite: !this.state.isFavorite })
    }


    render() {

        console.log(this.state.isFavorite)

        return (
            <>

                <div className="first-division-container">
                    <Container className="profile-container">
                        <h1>¡Bienvenid@ al perfil de {this.state.user.name}!</h1>
                        <hr></hr>
                        <Row className='first-row-profile justify-content-center' >
                            <Col md={12}>
                                <img className="profile-img" src={this.state.user.imageUrl} alt="profile"></img>
                                <br></br>

                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>

                                {
                                    this.props.loggedUser

                                    &&

                                    <Button variant="ligth" onClick={() => {
                                        this.isFavorite()
                                    }}>
                                        {this.state.isFavorite ? <img src={fullHeart} style={{ width: "10%" }} /> : <img src={emptyHeart} style={{ width: "10%" }} />}
                                    </Button>}
                            </Col>

                            <Col md={6}>
                                <p style={{ fontStyle: "italic", textAlign: "center" }}>{this.state.user.description}</p>
                            </Col>

                        </Row>

                        <br></br>

                        <Row>

                            <Col className="profile-data" md={6}>
                                <h2>Datos del perfil: </h2>
                                <p>Nombre de usuario: {this.state.user.username}</p>
                                <p>Su fecha de nacimiento es: {this.state.user.birthday}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="profile-data-buttons" md={12}>
                                <Button className="btn btn-sm btn-dark"><Link to={`/libros`}>Volver a libros</Link></Button>

                            </Col>

                        </Row>

                    </Container>

                </div>

                <div className="division-book-container">
                    <Container>
                        <br />
                        {
                            this.state.user.favoriteBooks.length >= 1
                            &&
                            <>
                                <Row className="favorite-books-container">
                                    <Col md={6}>
                                        <img className="image-favorite-book" src={imageFavoriteBooks} alt="mancha"></img>
                                        <h2 className="title-favorite-book">Estos son sus libros favoritos</h2>
                                    </Col>
                                    <hr></hr>
                                </Row>

                                <Row>
                                    <>

                                        {this.state.user.favoriteBooks.map(elm =>


                                            <FavoriteBooksCard

                                                key={elm._id}
                                                books={elm}


                                            />)}
                                    </>


                                </Row>
                            </>
                        }
                    </Container>
                </div>


                <div className="division-author-container">
                    <Container>
                        {
                            this.state.user.favoriteBooks.length >= 1
                            &&
                            <>
                                <Row className="favorite-author-container">
                                    <Col md={6}>
                                        <img className="image-favorite-author" src={wavyLine} alt="wavy-line"></img>
                                        <h2 style={{ marginBottom: "40px" }}>Estos son sus autores favoritos</h2>
                                    </Col>
                                </Row>

                                <Row>

                                    {this.state.user.favoriteAuthors.map(elm =>


                                        <FavoriteAuthCard

                                            key={elm._id}
                                            author={elm}


                                        />)}


                                </Row>
                            </>
                        }

                    </Container >
                </div >
            </>
        )
    }
}

export default Profile