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
                console.log(res)
                this.bookService.getBook(res.data.book._id)
                    .then((res) => {
                        console.log(res.data._id, res.data.chapters) //saca la info del libro
                        this.bookService.editBook(res.data._id, { chapters: res.data.chapters })
                    })
                    .catch(err => console.log(err))
            })
    }

    componentDidUpdate = (res) => {
        if (this.props.match.params.capitulo_id != this.props.match.params.capitulo_id) {
            this.bookService.getBook(res.data.book._id)
                .then((res) => {
                    console.log(res.data._id, res.data.chapters) //saca la info del libro
                    this.bookService.editBook(res.data._id, { chapters: res.data.chapters })
                })
        }
    }


    deleteChapter = () => {

        this.chapterService
            .deleteChapter(this.props.match.params.capitulo_id)
            .then(res => {
                this.setState({ chapters: res.data })
                console.log(res) // saca info del capitulo que borra 
                this.bookService.getBook(res.data.book)
                    .then((res) => {
                        console.log(res.data._id, res.data.chapters) // saca la info del libro
                        this.bookService.editBook(res.data._id, { chapters: res.data.chapters })
                    })
            })

            //this.state.book.splice(chapter.id,1)
            //.deleteChapter(this.props.match.params.capitulo_id)
            // .then(() => {
            //     this.bookService.editBook(book_id, { chapters: capitulos })
            //     this.props.history.push('/libros')
            // })
            .then(res => this.props.history.push('/libros'))
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
                    <h1>{this.state.chapters.title}</h1>
                    <small>{this.state.chapters.resume}</small>

                    <Row>
                        <Col className="chapter">
                            <text>{this.state.chapters.text}</text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to='/libros' className="btn btn-sm btn-dark">Volver a todos los libros</Link>
                            <Button onClick={() => this.deleteChapter()} className="btn btn-sm btn-danger">Borrar</Button>
                            {/* <Button onClick={() => this.goBack()} className="btn btn-sm btn-primary">Volver al libro</Button> */}
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export default ChapterDetails





