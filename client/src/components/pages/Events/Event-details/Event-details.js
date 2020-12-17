import React, { Component } from 'react'
import EventService from "../../../../service/event.service"
import Maps from '../../Maps/DrawMaps'
import Credentials from "../../../../credential"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${Credentials.mapsKey}`;


class EventDetails extends Component {

    constructor() {
        super()
        this.state = {
            event: [],
            eventDetail: "",
            isAuthorized: false,
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
                const eventInfo = [...this.state.event]
                eventInfo.push(res.data)
                this.setState({ event: eventInfo })
            })
            
            .then(() => {
                    const eventDetails = this.state.event[0]
                this.setState({ eventDetail: eventDetails })
                this.isAuthorized()
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

    isAuthorized = () => {

        const userId = this.props.loggedUser._id

        const eventAuthor = this.state.eventDetail.author._id

        if (userId === eventAuthor) {
            this.setState({isAuthorized : true})
        } 

    }

    render() {

    console.log(this.state.isAuthorized)

     

        return (
            <>
            <div style={{margin: "40px 0 70px"}}>
                <Container>
                    <h1>{this.state.eventDetail.name}</h1>
                </Container>
                <Container className="event-details">
                    <Row>
                        <Col md={{ span: 6,}} >

                            {this.state.event.map(elm =>

                                <Maps
                                    googleMapURL={mapURL}
                                    containerElement={<div style={{ height: "400px" }} />}
                                    mapElement={<div style={{ height: "100%" }} />}
                                    loadingElement={<p>Cargando</p>}
                                    {...elm}
                                />

                            )}

                        </Col>
                        <Col md={4}>
                            <h3>Detalles</h3>

                            <hr />
                            <p>{this.state.eventDetail.name}</p>
                            <p>Descripción: {this.state.eventDetail.description}</p>
                                <Link className="default-button" to="/eventos" className="default-button">Volver</Link>

                                {
                                    this.state.isAuthorized === true && <Button onClick={() => this.deleteEvent()} className="default-button">Borrar</Button>
                                }


                        </Col>
                    </Row>
                    </Container>
                </div>
            </>

        )
    }
}

export default EventDetails