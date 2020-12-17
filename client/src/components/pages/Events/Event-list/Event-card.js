import { Card, ButtonGroup, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Event-card.css'

const EventCard = ({ date, name, _id, userId, author }) => {
    

    let dateObject = new Date((date));
    let newEventDate = `${dateObject.getDate()} / ${dateObject.getMonth() + 1} / ${dateObject.getFullYear()}`



    return (
     
  
        <Col md={4}>
            <Card style={{marginBottom: "20px"}}>
                <Card.Body>  
                    <Card.Title>{name}</Card.Title>
                <Card.Title>{newEventDate}</Card.Title>
                <ButtonGroup style={{ width: '100%' }}>
                    {
                        author === userId
                        &&
                    <Link className="default-button" style={{ marginRight: "30px" }}  to={`/eventos/editar-evento/${_id}`}>Editar</Link>
                    }
                    <Link className="default-button"  to={`/eventos/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    
                </Card.Body>
                    </Card>
            </Col>
              
    )
}

export default EventCard