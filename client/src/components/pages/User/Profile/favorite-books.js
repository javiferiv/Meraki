import { Row, Col, Card, ButtonGroup } from 'react-bootstrap'
import BooksService from '../../../../service/book.service'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './favoriteBooks-card.css'


class FavoriteBooksCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: props,
        }

        this.booksService = new BooksService()
    }

    componentDidMount = () => {

        const book_id = this.state.books.books

        this.booksService
            .getBook(book_id)
            .then(res => { this.setState({ books: res.data }) })
            .catch(err => console.log(err))

    }


    render() {
 
    return (

            <Col md={3}>
            <Card className="favoriteBook-card">
                <Card.Img variant="top" src={this.state.books.image} />
                <Card.Body>
                    <Card.Title>{this.state.books.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        {/* <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link> */}
                    </ButtonGroup>
                </Card.Body>
                </Card>
            </Col>

        )
    
    }
}

export default FavoriteBooksCard