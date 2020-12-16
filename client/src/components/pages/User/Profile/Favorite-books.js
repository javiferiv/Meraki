import { Col, Card, ButtonGroup } from 'react-bootstrap'
import BooksService from '../../../../service/book.service'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookmark from './../../Book/Book-list/images/bookmark.jpg'
import './FavoriteBooks-card.scss'



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

            < Col md={3} className="flip-card-container" style={{ "--hue": "170" }}>
                <div className="flip-card">

                    <div className="card-front">
                        <figure>
                            <div className="img-bg"></div>
                            <img className="img-bg-pic" src={this.state.newbooks.image} alt="Image 2" />
                            <figcaption>{this.state.newbooks.title}</figcaption>
                        </figure>
                    </div>

                    <div className="card-back">
                        <figure>
                            <div className="img-bg"></div>
                            <img className="img-bg-pic" src={Bookmark} alt="image-2" />
                        </figure>

                        <button><Link className="btn btn-book-card" to={`/libros/${this.state.newbooks._id}`}>Ver detalles</Link></button>

                        <div className="design-container">
                            <span className="design design--1"></span>
                            <span className="design design--2"></span>
                            <span className="design design--3"></span>
                            <span className="design design--4"></span>
                            <span className="design design--5"></span>
                            <span className="design design--6"></span>
                            <span className="design design--7"></span>
                            <span className="design design--8"></span>
                        </div>
                    </div>

                </div>

            </Col >


        )


    }
}

export default FavoriteBooksCard


