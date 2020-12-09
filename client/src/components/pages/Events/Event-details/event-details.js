import React, { Component } from 'react'
import EventService from "../../../../service/event.service"
import Maps from '../../Maps/drawMaps'
import Credentials from "../../../../credential"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Credentials.mapsKey}`;


class EventDetails extends Component {

    constructor() {
        super()
        this.state = {
            event: []
        }

        this.eventService = new EventService()


    }


    componentDidMount = () => {

        this.refreshEvents()

    }

    refreshEvents = () => {

        const event_id = this.props.match.params.event_id
        this.eventService
            .getOneEvent(event_id)
            .then(res => {

                const eventInfo = this.state.event
                eventInfo.push(res.data)
                this.setState({ event: eventInfo })


            })
            .catch(err => console.log(err))
    }


    deleteEvent = () => {

        const event_id = this.props.match.params.event_id

        this.eventService
            .deleteEvent(event_id)
            .then(res => this.props.history.push('/eventos'))
            .catch(err => console.log(err))

    }


    render() {

        return (
            <>
                <Container>
                    <h1>{this.state.event.name}</h1>
                </Container>
                <Container className="event-details">
                    <Row>
                        <Col md={{ span: 6, offset: 1 }} >

                            {this.state.event.map(elm =>

                                <Maps
                                    googleMapURL={mapURL}
                                    containerElement={<div style={{ height: "400px" }} />}
                                    mapElement={<div style={{ height: "100%" }} />}
                                    loadingElement={<p>Cargando</p>}
                                    {...elm}
                                />

                            )}

                            <h3>Detalles</h3>

                            <p>{this.state.event.name}</p>
                            <hr />
                            <p>Descripción: {this.state.event.description}</p>
                            <Link to="/eventos" className="btn btn-sm btn-dark">Volver</Link>
                            <Button onClick={() => this.deleteEvent()} className="btn btn-sm btn-danger">Borrar</Button>
                        </Col>
                        <Col md={4}>
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export default EventDetails


// {
//     this.state.event.map(elm =>

//         <Maps
//             googleMapURL={mapURL}
//             containerElement={<div style={{ height: "400px" }} />}
//             mapElement={<div style={{ height: "100%" }} />}
//             loadingElement={<p>Cargando</p>}
//             {...elm}
//         />

//     )
// }