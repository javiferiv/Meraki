import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import EventService from "../../../../service/event.service"

class EventForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            place: '',
            capacity: '',
            date: '',
            latitude: '',
            longitude:'',
            author: this.props.loggedUser._id
        }
        this.eventService = new EventService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.eventService
            .newEvent(this.state)
            .then(res => {
                console.log(this.props)
                this.props.history.push('/eventos')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <Container>
                    <h1> Nuevo evento</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción del evento</Form.Label>
                            <Form.Control as="textarea" rows={3} type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="place">
                            <Form.Label>Lugar de celebración</Form.Label>
                            <Form.Control type="text" name="place" value={this.state.place} onChange={this.handleInputChange} />
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="text" name="latitude" value={this.state.latitude} onChange={this.handleInputChange} />
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control type="text" name="longitude" value={this.state.longitude} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="capacity">
                            <Form.Label>Aforo</Form.Label>
                            <Form.Control type="number" name="capacity" value={this.state.capacity} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Fecha (URL)</Form.Label>
                            <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="dark" type="submit">Crear nuevo evento</Button>
                    </Form>
                </Container>
            </>
        )
    }
}

export default EventForm




