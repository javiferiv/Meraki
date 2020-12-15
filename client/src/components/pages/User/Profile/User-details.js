import React, { Component } from 'react'
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

        if (Books !== undefined) {

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


    render() {

        return (
            <Container>
                <h1>¡Bienvenid@ al perfil de {this.state.user.name}!</h1>
                <hr></hr>
                <Row>
                    <Col md={6}>

                        <img src={this.state.user.image} alt="profile"></img>

                    </Col>

                    <Col md={6}>

                        <h2>Datos del perfil: </h2>
                        <p>Nombre de usuario: {this.state.user.username}</p>
                        <p>Su fecha de nacimiento es: {this.state.user.birthday}</p>

                        <Button className="btn btn-sm btn-dark"><Link to={`/libros`}>Volver a libros</Link></Button>
                        <br />
                        <br />
                        {this.props.loggedUser && <Button className="btn btn-sm btn-warning" onClick={() => this.saveFav(this.state.user._id)} >Añadir a favoritos</Button>}

                    </Col>
                </Row>
                {
                    this.state.user.favoriteBooks.length >= 1
                    &&
                    <>
                        <Row>
                            <Col md={6}>
                                <h2>Estos son sus libros favoritos</h2>
                            </Col>
                            <hr></hr>
                        </Row>
                        <Row>

                            {this.state.user.favoriteBooks.map(elm =>


                                <FavoriteBooksCard

                                    key={elm._id}
                                    books={elm}


                                />)}
                        </Row>
                    </>
                }
                {
                    this.state.user.favoriteBooks.length >= 1
                    &&
                    <>
                        <Row>
                            <Col md={6}>
                                <h2>Estos son sus autores favoritos</h2>
                            </Col>
                            <hr></hr>
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

            </Container>
        )
    }
}

export default Profile