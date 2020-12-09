import React, { Component } from 'react'
import BooksService from './../../../../service/book.service'
import { Container, Form, Button } from 'react-bootstrap'

class BookForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book : {
                title: '',
                genre: '',
                resume: '',
                author: ''
            }
        }
        this.bookService = new BooksService()
    }

    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.bookService
            .getBook(book_id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ book: {...this.state.book, [e.target.name]: e.target.value} })

    handleSubmit = e => {

        const book_id = this.props.match.params.book_id
        e.preventDefault()
        console.log(this.state.book)

        this.bookService

            .editBook(book_id, this.state.book)
            .then(res => {
                console.log(this.state.book)
                this.props.history.push('/libros')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container>
                    <h1> Edita esta novela</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.book.title} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" name="resume" value={this.state.book.resume} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="length">
                            <Form.Label>Género</Form.Label>
                            <Form.Control as="select" defaultValue="Elige una opción" name="genre" value={this.state.book.genre} onChange={this.handleInputChange} >
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
                            <Form.Control type="text" name="image" value={this.state.book.image} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Edita tu libro</Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default BookForm