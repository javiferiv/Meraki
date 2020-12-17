import React, { Component } from 'react'
import ChapterService from '../../../../service/chapter.service'
import BookService from '../../../../service/book.service'
import './Chapter-details.css'
//si ponemos loader, irá aquí 

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'


class ChapterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chapters: {
                title: '',
                resume: '',
                text: '',
                book: '',
                comments: [],
            },
            book: []
        }
        this.chapterService = new ChapterService()
        this.bookService = new BookService()
    }

    componentDidMount = () => {

        this.chapterService
            .getOneChapter(this.props.match.params.capitulo_id)
            .then(res => {
                this.setState({ chapters: res.data })
            })
    }
    

    deleteChapter = () => {

        this.chapterService
            .deleteChapter(this.props.match.params.capitulo_id)
            .then(res => {
                this.setState({ chapters: res.data })
                this.bookService.getBook(res.data.book)
                    .then(res => {
                        this.setState({ book: res.data })
                        const newChapters = [...this.state.book.chapters]
                        const anotherChapter = newChapters.filter(elm => elm._id !== this.props.match.params.capitulo_id)
                        this.setState({ book: { ...this.state.book, chapters: anotherChapter } })
                        this.bookService.editBook(this.state.book._id, this.state.book)
                        this.props.history.push(`/libros/${this.state.book._id}`)
                    })
            })

            .catch(err => console.log(err))
    }


    refreshChapters = () => {

        const chapter_id = this.props.match.params.capitulo_id

        this.chapterService
            .getChapters(chapter_id)
            .then(res => this.setState({ chapters: res.data }))
            .catch(err => console.log(err))
    }

    // goBack = () => {
    //     const book_id = this.state.book.
    //     console.log(book_id)
    //     // this.bookService
    //     //     .getBook(book_id)
    //     //     .then(res => {
    //     //         this.setState({ chapters: res.data })
    //     //     })
    //     //     //.then(res => this.props.history.push(`/libros/${props._id}`))
    //     //     .catch(err => console.log(err))
    // }

    render() {

        return (
            <>
                <Container>
                    <h1 className="title-book-chapter">{this.state.chapters.title}</h1>
                    <hr></hr>
                    <h3>{this.state.chapters.resume}</h3>

                    <Row>
                        <Col className="chapter">
                            <text className="book-chapter-text">{this.state.chapters.text}</text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to='/libros' className="default-button">Volver a todos los libros</Link>
                            <Button onClick={() => this.deleteChapter()} className="default-button">Borrar</Button>
                            {/* <Button onClick={() => this.goBack()} className="btn btn-sm btn-primary">Volver al libro</Button> */}
                        </Col>
                    </Row>
                </Container>
            </>

        )
    
    }
}

export default ChapterDetails





