import { Col, Card, ButtonGroup } from 'react-bootstrap'
import BooksService from '../../../../service/book.service'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './favoriteBooks-card.css'


class FavoriteBooksCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: props,
            newbooks: "",
        }


        this.booksService = new BooksService()
    }

    componentDidMount = () => {

        const book_id = this.state.books.books

        this.booksService
            .getBook(book_id)
            .then(res => {

                if (res.data != null) {

                    this.setState({ newbooks: res.data })

                }


            })
            .catch(err => console.log(err))

    }



    render() {

        return (

            < Col md={3} >
                <Card className="favoriteBook-card">
                    <Link to={`/libros/${this.state.newbooks._id}`}><Card.Img variant="top" src={this.state.newbooks.image} /></Link>
                    <Card.Body>
                        <Card.Title>{this.state.newbooks.title}</Card.Title>
                        <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Col >


        )


    }
}

export default FavoriteBooksCard