import { Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Bookmark from './images/bookmark.jpg'

import './Book-card.scss'

const BookCard = ({ imageBook, title, author, userId, _id, chapters }) => {


    return (

        <Col md={3} className="flip-card-container" style={{ "--hue": "170" }}>
            <div className="flip-card">

                <div className="card-front">
                    <figure>
                        <div className="img-bg"></div>
                        <img className="img-bg-pic" src={imageBook} alt="Image 2" />
                        <figcaption>{title}</figcaption>
                    </figure>

                    <ul>
                        {chapters.map(elm => <li>{elm.title}</li>)}
                    </ul>
                </div>

                <div className="card-back">
                    <figure>
                        <div className="img-bg"></div>
                        <img className="img-bg-pic" src={Bookmark} alt="image-2" />
                    </figure>

                    <button><Link className="btn btn-book-card" variant="light" to={`/libros/${_id}`}>Ver detalles</Link></button>

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
                <button><Link className="btn btn-book-card" variant="light" to={`/libros/editar/${_id}`}>Editar</Link></button>
                        
                    }
        </Col>
    )

}

export default BookCard


