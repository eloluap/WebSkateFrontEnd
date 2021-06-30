import React, { Component } from "react";
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../layout/images/Logo.png";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

const mapStateToProps = state => {
    return state;
}

class PrivateTopMenu extends Component {
    render() {
        let userName = this.props.user.userName;

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
                            <Button className="navBarNormalContent backgroundSecondary border-0" variant="primary">
                                Nachrichten
                            </Button>
                            <NavDropdown className="navBarNormalContent" title={userName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Forum Beiträge</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Kommentare</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Rezensionen</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Abmelden</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(PrivateTopMenu);