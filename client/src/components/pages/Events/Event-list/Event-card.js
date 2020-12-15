import { Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Event-card.css'

const EventCard = ({date, name, _id}) => {


    let dateObject = new Date((date));
    let newEventDate = `${dateObject.getDay()} / ${dateObject.getMonth() + 1} / ${dateObject.getFullYear()}`

    console.log(date)
    console.log(newEventDate)



    return (
            <Card className="event-card">
                <Card.Body>
                   
                    <Card.Title>{name}</Card.Title>
                <Card.Title>{newEventDate}</Card.Title>
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Link className="btn btn-dark" to={`/eventos/editar-evento/${_id}`}>Editar</Link>
                        <Link className="btn btn-dark" to={`/eventos/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    
                </Card.Body>
            </Card>
    )
}

export default EventCard