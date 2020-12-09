import React, { Component } from 'react'
import AuthService from '../../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            name: '',
            birthday: '',
        }
        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/perfil')
            })
            .catch(err => console.log('Error', err))
    }


    render() {

        return (

            <Container>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Registro de usuario</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Nombre de Usuario</Form.Label>
                                <Form.Control type="text" name="username" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="birthday">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" name="birthday" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="gender">
                                <Form.Label>Género</Form.Label>
                                <Form.Control as="select" defaultValue="Elige una opción" name="gender" value={this.state.gender} onChange={this.handleInputChange} >
                                    <option>Selecciona una opción: </option>
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                    <option>Otro</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Imagen de perfil</Form.Label>
                                <Form.Control type="text" name="image" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Registrarme</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup