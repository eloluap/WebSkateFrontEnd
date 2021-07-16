import React, { Component } from "react";
import { connect } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from "../layout/images/Logo.png";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoutButton from './LogoutButton';

const mapStateToProps = state => {
    return state;
}

class PrivateTopMenu extends Component {
    render() {
        let userName = this.props.user.userName;
        let manage;
        if (this.props.user.role === 'admin') {
            manage = <LinkContainer to="/Management">
                <NavDropdown.Item href="#">User Management</NavDropdown.Item>
            </LinkContainer>;
        }

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
                            <LinkContainer to="/Forum">
                                <Nav.Link className="navBarNormalContent">Forum</Nav.Link>
                            </LinkContainer>
                            <Button className="navBarNormalContent backgroundSecondary border-0" variant="primary">
                                Nachrichten
                            </Button>
                            <NavDropdown className="navBarNormalContent" title={userName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Forum Beiträge</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Kommentare</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Rezensionen</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {manage}
                                <LinkContainer to="/Profil">
                                    <NavDropdown.Item href="#">Profil</NavDropdown.Item>
                                </LinkContainer>
                                <LogoutButton />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}

export default connect(mapStateToProps, null)(PrivateTopMenu);