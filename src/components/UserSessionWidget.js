import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authenticationActions from '../actions/AuthenticationActions';

const mapStateToProps = state => {
    return state;
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleShow = (e) => {
        e.preventDefault();
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose = () => {
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const { authenticateUserAction } = this.props;
        authenticateUserAction(username, password);
        console.log("Submitted");
    }

    render() {

        var showDialog = this.props.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Button variant="primary" className="navBarNormalContent loginButtonHeight backgroundSecondary border-0" onClick={this.handleShow}>
                    Anmelden
                </Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Anmeldung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Nutzername:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Nutzername" name="username" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-white">Passwort:</Form.Label>
                                <Form.Control type="password" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Passwort" name="password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                {!this.props.loginPending && "Submit"}
                                {this.props.loginPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                            </Button>
                            {this.props.error && <Form.Label style={{ color: "red", marginTop: "0.5rem" }}>{/* Falscher Nutzername oder Passwort */}{this.props.error}</Form.Label>}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="backgroundPrimary border-0">
                        <Form.Label style={{ color: "#3B38DC" }}>Passwort vergessen?</Form.Label>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)