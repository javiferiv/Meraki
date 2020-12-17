import { Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Event-card.css'

const EventCard = ({date, name, _id}) => {


    let dateObject = new Date((date));
    let newEventDate = `${dateObject.getDate()} / ${dateObject.getMonth() + 1} / ${dateObject.getFullYear()}`



    return (

            <Card className="event-card">
                <Card.Body>  
                    <Card.Title>{name}</Card.Title>
                <Card.Title>{newEventDate}</Card.Title>
                    <ButtonGroup  style={{ width: '100%' }}>
                        <Link className="default-button" to={`/eventos/editar-evento/${_id}`}>Editar</Link>
                    <Link className="default-button"  to={`/eventos/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    
                </Card.Body>
            </Card>
    )
}

export default EventCard