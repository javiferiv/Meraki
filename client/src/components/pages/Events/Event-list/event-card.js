import { Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './event-card.css'

const EventCard = props => {


    let month = props.date.slice(5, 7)
    let day = props.date.slice(8, 10)
    let year = props.date.slice(0, 4)

    let eventDay = day + "-" + month + "-" + year


    return (
            <Card className="event-card">
                <Card.Body>
                   
                    <Card.Title>{props.name}</Card.Title>
                <Card.Title>{eventDay}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Link className="btn btn-dark" to={`/eventos/editar-evento/${props._id}`}>Editar</Link>
                        <Link className="btn btn-dark" to={`/eventos/${props._id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    
                </Card.Body>
            </Card>
    )
}

export default EventCard