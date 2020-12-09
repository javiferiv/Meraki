import React from "react";
import { Navbar, Nav} from 'react-bootstrap' 

import './Footer.css'

const Footer = () => (
    <Navbar className="footer" bg="light" expand="lg">
        <Navbar.Brand>

            <Nav.Link as="div" className="footer-text">Meraki_</Nav.Link>
       
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Footer;