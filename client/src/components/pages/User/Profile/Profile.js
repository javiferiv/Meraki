import React, { Component } from 'react'
import './Profile.css'
import AuthService from '../../../../service/auth.service'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                name: ""
            }
        }

        this.authService = new AuthService()
    }



    deleteThisUser = () => {

        const userID = this.props.loggedUser._id

        this.authService
            .deleteUser(userID)
            .then(res => { this.props.history.push('/') })
            .catch(err => console.log(err))

    }

    componentDidMount = () => {

        const userID = this.props.loggedUser._id

        this.authService
            .getOneUser(userID)
            .then(res => {
                this.setState({ user: res.data })
                console.log(this.state.user)
              })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.user.username}!</h1>
                <hr></hr>
                <Row>
                    <Col md={6}>

                        <img src={this.state.user.image} alt="profile"></img>

                    </Col>

                    <Col md={6}>

                        <h2>Datos del perfil: </h2>
                        <p>Nombre: {this.state.user.name}</p>
                        <p>Tu fecha de nacimiento es: {this.state.user.birthday}!</p>

                        <Link to={`/editar-perfil/${this.state.user._id}`}>Editar perfil</Link>
                        <br></br>
                        <Button onClick={() => this.deleteThisUser()} className="btn btn-sm btn-danger">Borrar perfil</Button>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile
