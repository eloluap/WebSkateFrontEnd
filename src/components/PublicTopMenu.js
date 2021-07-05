import React, { Component } from "react";

import UserSessionWidget from './UserSessionWidget';
import RegistrationWidget from './RegistrationWidget';

import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../layout/images/Logo.png";

class PublicTopMenu extends Component {
    render() {
        return (
            <div>
                <Navbar className="backgroundPrimary navbar-dark navbarMy" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <LinkContainer to="/">
                                <Nav.Link className="navBarLogo"><img src={logo} className="navBarLogo" alt="Logo" /></Nav.Link>
                            </LinkContainer>
                            <Nav.Link href="#home" className="navBarNormalContent">Lernen</Nav.Link>
                            <Nav.Link href="#link" className="navBarNormalContent">Skateparks</Nav.Link>
                            <Nav.Link href="#link" className="navBarNormalContent">Forum</Nav.Link>
                            <UserSessionWidget />
                            <RegistrationWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default PublicTopMenu