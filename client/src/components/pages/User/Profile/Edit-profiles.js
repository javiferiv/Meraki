import React, { Component } from 'react'
import UserService from '../../../../service/user.service'
import FilesService from './../../../../service/upload.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class ProfileEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: this.props.loggedUser.username,
            password: this.props.loggedUser.password,
            name: this.props.loggedUser.name,
            birthday: this.props.loggedUser.birthday,
            imageUrl: this.props.loggedUser.imageUrl
        }

        this.userService = new UserService()
        this.filesService = new FilesService()

     

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.userService
            .editUser(this.props.match.params.user_id, this.state)
            .then(res => {this.props.history.push('/perfil')})
            .catch(err => console.log('Error', err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                this.setState({imageUrl : response.data.secure_url })
            })
            .catch(err => console.log(err))
    }


    

    render() {

        return (

            <Container>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Editar perfil</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group controlId="username">
                                <Form.Label>Nombre de Usuario</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="birthday">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control type="date" name="birthday" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="role">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select" defaultValue="Elige una opción" name="role" value={this.state.role} onChange={this.handleInputChange} >
                                    <option>Selecciona una opción: </option>
                                    <option>Escritor</option>
                                    <option>Lector</option>
                                </Form.Control>
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
                            <Form.Group>
                                <Form.Label>Imagen de perfil</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Editar perfil</Button>    

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProfileEdit