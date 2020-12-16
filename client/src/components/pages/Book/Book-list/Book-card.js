import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Bookmark from './images/bookmark.jpg'
import Children from './images/children.jpg'
import Murder from './images/murder.jpg'

import './Book-card.scss'

const BookCard = ({ imageBook, title, author, userId, _id, chapters }) => {


    return (

        //         // <>
        //             {/* <Col lg={4}>

        //                     <Card className="book-card">
        //                         <Card.Img variant="top" src={imageBook} />

        //                             <Card.Title className="book-title-card">{title}</Card.Title>
        //                             <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                 {
        //                                     userId === author
        //                                     &&
        //                                     <Link className="btn btn-book-card" to={`/libros/editar/${_id}`}>Editar</Link>

        //                                 }
        //                             <Link className="btn btn-book-card" to={`/libros/${_id}`}>Ver detalles</Link>
        //                             </ButtonGroup>


        //                     </Card>

        //             </Col > */}

        <Col md={3} className="flip-card-container" style={{ "--hue": "170" }}>
            <div className="flip-card">

                <div className="card-front">
                    <figure>
                        <div className="img-bg"></div>
                        <img src={Children} alt="Image 2" />
                        <figcaption>{title}</figcaption>
                    </figure>

                    <ul>
                        {/* //<li>{chapters.map(elm=> elm)}</li> */}
                    </ul>
                </div>

                <div className="card-back">
                    <figure>
                        <div className="img-bg"></div>
                        <img src={Bookmark} alt="image-2" />
                    </figure>

                    <button><Link className="btn btn-book-card" to={`/libros/${_id}`}>Ver detalles</Link></button>

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
                    {
                        userId === author
                        &&
                        <button><Link className="btn btn-book-card" to={`/libros/editar/${_id}`}>Editar</Link></button>
                        
                    }
        </Col>
    )

}

export default BookCard


