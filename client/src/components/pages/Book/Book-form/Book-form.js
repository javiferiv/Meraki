import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import BooksService from './../../../../service/book.service'

class BookForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            genre: '',
            resume: '',
            author: this.props.loggedUser._id
        }
        this.booksService = new BooksService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.booksService
            .saveBook(this.state)
            .then(res => this.props.history.push('/libros'))
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container>
                    <h1> Nuevo libro</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" name="resume" value={this.state.resume} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="length">
                            <Form.Label>Género</Form.Label>
                            <Form.Control as="select" defaultValue="Elige una opción" name="genre" value={this.state.genre} onChange={this.handleInputChange} >
                                <option>Elige una opción</option>
                                <option>Aventuras</option>
                                <option>Ciencia Ficción</option>
                                <option>Infantil</option>
                                <option>Misterio</option>
                                <option>Novela negra</option>
                                <option>Romántico</option>
                                <option>Terror</option>
                                <option>Otro</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Crear nuevo libro</Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default BookForm