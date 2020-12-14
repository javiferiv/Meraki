import { Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Event-card.css'

const EventCard = ({date, name, _id}) => {


    let month = date.slice(5, 7)
    let day = date.slice(8, 10)
    let year = date.slice(0, 4)

    let eventDay = day + "-" + month + "-" + year


    return (
            <Card className="event-card">
                <Card.Body>
                   
                    <Card.Title>{name}</Card.Title>
                <Card.Title>{eventDay}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Link className="btn btn-dark" to={`/eventos/editar-evento/${_id}`}>Editar</Link>
                        <Link className="btn btn-dark" to={`/eventos/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    
                </Card.Body>
            </Card>
    )
}

export default EventCard