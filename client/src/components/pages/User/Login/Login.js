import React, { Component } from 'react'
import AuthService from '../../../../service/auth.service'
import imageColumn1 from './images/image-column-1.jpeg'
import Alert from './../../../shared/Alert/Alert'
import coffeeSpot from './images/mancha-cafe.png'
import './Login.scss'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            showToast: false,
            toastText: ''
        }
            
        this.authService = new AuthService()
        }
            
            
    

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/perfil')       
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))

    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })



    render() {

        return (

<>
            <Container className="form" style={{ marginTop: "80px" }}>

                <Row>
       

                    <Col md={{ span: 3, offset: 3 }}>
                        <img className="image-login" src={imageColumn1} alt="pencil"></img>

                    </Col>
                   
                    <Col md={{span: 4, offset: 1}}>

                        <h1 style={{textAlign: "center", marginTop: "18px"}}>Inicio de sesión</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button className="default-button login" style={{ width: "100%", marginBottom: "150px" }} variant="ligth" type="submit">Iniciar sesión</Button>
                        </Form>
                        <img className="image-coffee" src={coffeeSpot} alt="coffee-sport"></img>
                    </Col>
                </Row>
            </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} /> 
                            
                           
</>
       
        )
    }
}

export default Login