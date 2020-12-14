import React, { Component } from 'react'
import EventService from "../../../../service/event.service"
import { Container, Form, Button } from 'react-bootstrap'

class EventEditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: {
                name: "",
                description: "",
                place: "",
                latitude: "",
                longitude: "",
                capacity: "",
                date: "",
                author: "",
            }
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {

        const event_id = this.props.match.params.event_id

        this.eventService
            .getOneEvent(event_id)
            .then(res => this.setState({ event: res.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ event: { ...this.state.event, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        const event_id = this.props.match.params.event_id

        e.preventDefault()
  

        this.eventService
            .editEvent(event_id, this.state.event,)
            .then(res => {
                this.props.history.push('/eventos')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                

                <Container>
                    <h1> Editar evento</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.event.name} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción del evento</Form.Label>
                            <Form.Control as="textarea" rows={3} type="text" name="description" value={this.state.event.description} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="place">
                            <Form.Label>Lugar de celebración</Form.Label>
                            <Form.Control type="text" name="place" value={this.state.event.place} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="latitude">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="text" name="latitude" value={this.state.event.latitude} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="longitude">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control type="text" name="longitude" value={this.state.event.longitude} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="capacity">
                            <Form.Label>Aforo</Form.Label>
                            <Form.Control type="number" name="capacity" value={this.state.event.capacity} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Fecha (URL)</Form.Label>
                            <Form.Control type="date" name="date" value={this.state.event.date} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Editar evento</Button>
                    </Form>
                </Container>

            </>
        )
    }
}

export default EventEditForm