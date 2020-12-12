import React, { Component } from 'react'
import './Profile.css'
import AuthService from '../../../../service/auth.service'
import BookService from '../../../../service/book.service'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FavoriteBooksCard from './favorite-books'
import { Link } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                name: "",
                favoriteBooks: []
            },
            books: [],
        }

        this.authService = new AuthService()
        this.bookService = new BookService()
    }



    deleteThisUser = () => {

        const userID = this.props.loggedUser._id

        this.authService
            .deleteUser(userID)
            .then(res => { this.props.history.push('/') })
            .catch(err => console.log(err))

    }

    componentDidMount = () => {

        const userID = this.props.loggedUser._id

        this.authService
            .getOneUser(userID)
            .then(res =>
            {
                this.setState({ user: res.data })
                this.isBookAvailable()
            })
            .catch(err => console.log(err))
        
     
        
    }

    isBookAvailable = () => {


        const Books = this.state.user.favoriteBooks

        const userBooks = this.state.books

        console.log(userBooks)
  
        
        if (Books != undefined) {
 
            Books.forEach(elm => 

                this.bookService
                    .getBook(elm)       
                    .then(res => res.data != null && userBooks.push(res.data._id) )
                    .catch(err => console.log(err))
                
            )
        }

    }


    render() {

        console.log(this.state.books)
        
        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.user.username}!</h1>
                <hr></hr>
                <Row>
                    <Col md={6}>

                        <img src={this.state.user.image} alt="profile"></img>

                    </Col>

                    <Col md={6}>

                        <h2>Datos del perfil: </h2>
                        <p>Nombre: {this.state.user.name}</p>
                        <p>Tu fecha de nacimiento es: {this.state.user.birthday}!</p>

                        <Link to={`/editar-perfil/${this.state.user._id}`}>Editar perfil</Link>
                        <br></br>
                        <Button onClick={() => this.deleteThisUser()} className="btn btn-sm btn-danger">Borrar perfil</Button>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>Estos son tus libros favoritos</h2>
                        </Col>
                    <hr></hr>
                </Row>
                <Row>
                    
                    {this.state.user.favoriteBooks.map(elm =>
                        
                    
                        <FavoriteBooksCard
                            
                            key = { elm._id }
                            books={ elm }
                           
                            
                        />)}
                
                 
           </Row>
    
            
            </Container>
        )
    }
}

export default Profile
