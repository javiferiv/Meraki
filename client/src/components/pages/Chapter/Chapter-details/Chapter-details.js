import React, { Component } from 'react'
import ChapterService from '../../../../service/chapter.service'
import BookService from '../../../../service/book.service'
import './Chapter-details.css'
//si ponemos loader, irá aquí 

import { Link } from 'react-router-dom'
import { Container, Row, Button } from 'react-bootstrap'


class ChapterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chapters: {
                title: '',
                resume: '',
                text: '',
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
            .then(res => this.setState({ chapters: res.data }))
            .catch(err => console.log(err))

        //this.resfreshChapters()
    }


    deleteChapter = () => {

        const chapter_id = this.props.match.params.capitulo_id
        console.log(chapter_id)
        console.log(this.props.history)
        this.chapterService
            .deleteChapter(chapter_id)
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
                </Container>
                <Container className="chapter">
                    <p>{this.state.chapters.text}</p>
                </Container>
                <Container>
                    <Row>
                        <Link to='/libros' className="btn btn-sm btn-dark">Volver a todos los libros</Link>
                        <Button onClick={() => this.deleteChapter()} className="btn btn-sm btn-danger">Borrar</Button>
                        {/* <Button onClick={() => this.goBack()} className="btn btn-sm btn-primary">Volver al libro</Button> */}
                    </Row>
                </Container>
            </>

        )
    }
}

export default ChapterDetails





