import { Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './event-card.css'

const EventCard = props => {

    return (
            <Card className="event-card">
                <Card.Body>
                    <li>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Title>{props.date}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Link className="btn btn-dark" to={`/eventos/editar-evento/${props._id}`}>Editar</Link>
                        <Link className="btn btn-dark" to={`/eventos/${props._id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    </li>
                </Card.Body>
            </Card>
    )
}

export default EventCard