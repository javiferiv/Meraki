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
            }
        }
        this.chaptersService = new ChaptersService()
        console.log(this.state.chapter)
    }

    handleInputChange = e => this.setState({ chapter: {... this.state.chapter, [e.target.name]: e.target.value }})

    handleSubmit = e => {

        e.preventDefault()

        this.chaptersService
            .saveChapter(this.state.chapter)
            .then(res => {
                this.props.history.push('/libros')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container>
                    <h1> Nuevo capítulo</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" name="resume" value={this.state.resume} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="text">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={15} placeholder="Comienza aquí a escribir..." type="text" name="text" value={this.state.text} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Crear nuevo capítulo</Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default ChapterForm