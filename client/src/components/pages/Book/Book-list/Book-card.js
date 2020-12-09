import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Book-card.css'

const BookCard = props => {

    return (
        <Col lg={4}>
            <Card className="book-card">
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>
                        <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard