import React, { Component } from 'react'
import ChaptersService from './../../../../service/chapter.service'
import BookService from './../../../../service/book.service'
import { Container, Form, Button } from 'react-bootstrap'

class ChapterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chapter: {
                title: '',
                resume: '',
                text: '',
                book: this.props.match.params.book_id
            },
            book: []
        }
        this.chaptersService = new ChaptersService()
        this.bookService = new BookService()
    }

    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.bookService
            .getBook(book_id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ chapter: {... this.state.chapter, [e.target.name]: e.target.value }})

    handleSubmit = e => {

        e.preventDefault()
        const capitulos = this.state.book.chapters
        const book_id = this.props.match.params.book_id

        this.chaptersService
            .editChapter(capitulos, this.state.chapter)
            .then(res => capitulos.push(res.data))
            .then(() => {
                this.bookService.editBook(book_id, {chapters: capitulos})
                this.props.history.push('/libros')
            })
            .catch(err => console.log(err))
  


    }

    render() {

        return (
            <>
                <Container>
                    <h1> Edita tu capítulo</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.chapter.title} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" name="resume" value={this.state.resume} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="text">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={15} placeholder="Comienza aquí a escribir..." type="text" name="text" value={this.state.text} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Guardar capítulo</Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default ChapterForm