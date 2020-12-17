import React, { Component } from 'react'
import AuthService from '../../../../service/auth.service'
import FilesService from './../../../../service/upload.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


class Signup extends Component {

    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                password: '',
                name: '',
                role: '',
                birthday: '',
                imageUrl: '',
                description: '',
            },
        }
        this.authService = new AuthService()
        this.filesService = new FilesService()

    }

    handleInputChange = e => this.setState({ user: { ...this.state.user ,[e.target.name]: e.target.value }})
    handleDateChange = e => this.setState({ user: { ...this.state.user ,[e.target.name]: new Date(e.target.value) }})
 


    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.user)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/perfil')
            })
            .catch(err => console.log('Error', err))
    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])
 
        this.filesService
            .uploadImage(uploadData)
            .then(response => {

                this.setState({user: { ...this.state.user, imageUrl: response.data.secure_url }})
            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <Container className="form">

                <Row>
                    <Col md={{ span: 6, offset: 5 }}>
                        <h1 style={{textAlign : "center"}}>Registro de usuario</h1>
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
                                <Form.Control type="date" name="birthday" onChange={this.handleDateChange} />
                            </Form.Group>
                            <Form.Group controlId="gender">
                                <Form.Label>Género</Form.Label>
                                <Form.Control as="select" defaultValue="Elige una opción" name="gender" value={this.state.user.gender} onChange={this.handleInputChange} >
                                    <option>Selecciona una opción: </option>
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                    <option>Otro</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="role">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select" defaultValue="Elige una opción" name="role" value={this.state.user.role} onChange={this.handleInputChange} >
                                    <option>Selecciona una opción: </option>
                                    <option>Escritor</option>
                                    <option>Lector</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>¿Qué nos puedes contar de ti?</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="¡Descríbete!" type="text" name="description" value={this.state.user.description} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group> 
                                <Form.Label>Imagen de perfil</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Button className="default-button" style={{width : "100%"}} variant='ligth' type="submit">Registrarme</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup