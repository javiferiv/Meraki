import { Container, Row, Col } from 'react-bootstrap'
import Credentials from "../../../../credential"
import MapContainer from './../../Maps/mapModel'
import MapMarker from './../../Maps/drawAllMaps'
import EventService from "../../../../service/event.service"
import EventCard from './event-card'
// import { Link } from 'react-router-dom'
import { Component } from 'react';

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Credentials.mapsKey}`;


class Events extends Component {

    constructor() {
        super()
        this.state = {
            events: [],
        }
        this.eventService = new EventService()

    }

    componentDidMount = () => {

        this.refreshEvents()
    }

    refreshEvents = () => {

        this.eventService
            .getEvent()
            .then(res => this.setState({ events: res.data }))
            .catch(err => console.log(err))
    }


    render() {
        return (

            <>
                <Container>
                    <h1>Listado de eventos</h1>

                    <Row>
                        <Col md={6}>


                            <MapContainer
                                googleMapURL={mapURL}
                                containerElement={<div style={{ height: "400px" }} />}
                                mapElement={<div style={{ height: "100%" }} />}
                                loadingElement={<p>Cargando</p>}
                            />


                            {this.state.events.map(elm =>
                                <MapMarker
                                    googleMapURL={mapURL}
                                    containerElement={<div style={{ height: "400px" }} />}
                                    mapElement={<div style={{ height: "100%" }} />}
                                    loadingElement={<p>Cargando</p>}
                                    {...elm}
                                />
                            )}

                        </Col>

                        <Col md={6}>
                            <ul>
                                <h3>Próximos eventos</h3>
                                <hr></hr>
                                {this.state.events.map(elm => <EventCard key={elm._id} {...elm} />)}

                            </ul>
                        </Col>
                    </Row>


                </Container>
            </>
        )
    }
}

export default Events