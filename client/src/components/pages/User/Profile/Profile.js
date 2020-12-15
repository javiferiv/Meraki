import React, { Component } from 'react'
import './Profile.scss'
import UserService from '../../../../service/user.service'
import BookService from '../../../../service/book.service'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import FavoriteBooksCard from './favorite-books'
import FavoriteAuthCard from './favorite-authors'
import { Link } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                name: "",
                birthday: Date,
                favoriteBooks: [],
                favoriteAuthors: []
            },
            books: [],
            newBirthday : "",
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
                this.isBookAvailable()
                this.newBirthdayDate()
            })
            .catch(err => console.log(err))



    }

    isBookAvailable = () => {


        const Books = this.state.user.favoriteBooks
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

    newBirthdayDate = () => {

        // let month = this.state.user.birthday.slice(5,7)
        // let day = this.state.user.birthday.slice(8, 10)
        // let year = this.state.user.birthday.slice(0, 4)

        // let birthdayDate = day + "-" + month + "-" + year

        // let newmonth = this.state.user.birthday 

        // let mesdeprueba = newmonth.getMonth()

        let time = this.state.user.birthday

        //var currentTime = new Date(parseInt(dateString)); 


        console.log(time)
 
    }


    render() {

        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.user.username}!</h1>
                <hr></hr>
                <Row>
                    <Col md={6}>

                        <img className="profile-img" src={this.state.user.imageUrl} alt="profile"></img>

                    </Col>

                    <Col className="profile-data" md={6}>

                        <h2>Datos del perfil: </h2>
                        <p>Nombre: {this.state.user.name}</p>
                        <p>Tu fecha de nacimiento es: {this.state.user.newBirthday}!</p>

                        <Container style={{ display: 'flex', justifyContent:'space-between'}}>
                        <Link className="default-button" to={`/editar-perfil/${this.state.user._id}`}>Editar perfil</Link>
                        <br />
                        <br />
                        <Link className="default-button" onClick={() => this.deleteThisUser()}>Borrar perfil</Link>
                        </Container>

                    </Col>
                </Row>
                <br />
                {
                    this.state.user.favoriteBooks.length >= 1
                    &&
                    <>
                        <Row>
                            <Col md={6}>
                                <h2>Estos son tus libros favoritos</h2>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>

                            <>
                                {
                                    this.state.user.favoriteBooks.map(elm =>


                                        <FavoriteBooksCard

                                            key={elm._id}
                                            books={elm}


                                        />)
                                }
                            </>


                        </Row>

                    </>
                }
                <br />
                {
                    this.state.user.favoriteAuthors.length >= 1
                    &&
                    <>
                        <Row>
                            <Col md={6}>
                                <h2>Estos son tus autores favoritos</h2>
                            </Col>
                        </Row>
                        <hr></hr>

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
            
        )
    }
}

export default Profile
