import React from "react";
import { Navbar, Nav} from 'react-bootstrap' 

import './Footer.css'

const Footer = () => (
    <Navbar className="footer" expand="lg">
        <Navbar.Brand>
            <Nav.Link as="div" className="footer-text">Meraki_ &copy; 2020. Un proyecto de Javier Fernández y Jorge Martín para Ironhack.</Nav.Link>
        </Navbar.Brand>
    </Navbar>
);

export default Footer;