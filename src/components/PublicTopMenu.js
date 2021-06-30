import React, { Component } from "react";

import UserSessionWidget from './UserSessionWidget';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../layout/images/Logo.png";
import Button from 'react-bootstrap/Button';

class PublicTopMenu extends Component {
    render() {
        return (
            <div>
                <Navbar className="backgroundPrimary navbar-dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Nav.Link href="#home" className="navBarLogo"><img src={logo} className="navBarLogo" alt="Logo" /></Nav.Link>
                            <Nav.Link href="#home" className="navBarNormalContent">Lernen</Nav.Link>
                            <Nav.Link href="#link" className="navBarNormalContent">Skateparks</Nav.Link>
                            <Nav.Link href="#link" className="navBarNormalContent">Forum</Nav.Link>
                            <UserSessionWidget />
                            <Button className="navBarNormalContent backgroundSecondary border-0" variant="primary">
                                Registrieren
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default PublicTopMenu