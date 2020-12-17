import { Container, Row, Col } from 'react-bootstrap'
import Credentials from "../../../../credential"
import MapContainer from '../../Maps/MapModel'
import EventService from "../../../../service/event.service"
import EventCard from './Event-card'
import { Component } from 'react';

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Credentials.mapsKey}`;


class Events extends Component {

    constructor(props) {
        super(props)
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
            .then(res => this.setState({ events : res.data }))
            .catch(err => console.log(err))
    }


    render() {

        

        return (
            <>
                <div className="event-list" style={{ backgroundColor: "#FDFAF6" }}>
                <Container>
                    <h1>Listado de eventos</h1>
                            <MapContainer
                                googleMapURL={mapURL}
                                containerElement={<div style={{ height: "400px" }} />}
                                mapElement={<div style={{ height: "100%" }} />}
                                 loadingElement={<p>Cargando</p>}
                                 {...this.state.events}
                                 
                            />

                    <Row>

                              
                                <h3 style={{marginTop : "30px"}}>Próximos eventos</h3>
                                <hr></hr>
                    </Row>
                    <Row>
                                {this.state.events.map(elm => <EventCard
                                    userId={this.props.loggedUser?._id}
                                    key={elm._id}
                                    {...elm} />)}
</Row>
                        


                </Container>
                    </div>
            </>
        )
    }
}

export default Events