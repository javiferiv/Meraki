import React, { Component } from 'react'
import './Navbar.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import AuthService from './../../../service/auth.service'
import { Link } from 'react-router-dom'

class navbar extends Component {

    constructor() {
        super()
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }


    render() {

        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link to='/'>
                        <Nav.Link as="div" id="basic-nav-dropdown">Meraki_</Nav.Link>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form inline>
                    <FormControl type="text" placeholder="Encuentra tu novela" className="mr-sm-2" />
                    <Button variant="outline-success">Buscar novela</Button>
                </Form>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="Zona Lector" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to="/libros">
                                    <Nav.Link as="div" id="basic-nav-dropdown">Todas las novelas</Nav.Link>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/eventos">Eventos</NavDropdown.Item>

                        </NavDropdown>

                        {
                            this.props.loggedUser
                                ?
                                <Nav.Link as="div" onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                :
                                <>
                                    <Link to="/registro">
                                        <Nav.Link as="div">Registro</Nav.Link>
                                    </Link>
                                    <Link to="/acceso-usuario">
                                        <Nav.Link as="div">Acceso Usuario</Nav.Link>
                                    </Link>


                                    <Link to="/perfil">
                                        <Nav.Link as="div">Perfil</Nav.Link>
                                    </Link>
                                </>
                        }


                        <Link to="/perfil">
                            <Nav.Link as="div">Hola, {this.props.loggedUser ? this.props.loggedUser.username : 'invitado'}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default navbar