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

class RegistrationWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleShow = (e) => {
        e.preventDefault();
        const { showRegistrationDialogAction } = this.props;
        showRegistrationDialogAction();
    }

    handleClose = () => {
        const { hideRegistrationDialogAction } = this.props;
        hideRegistrationDialogAction();
    }

    handleCloseEmailSent = () => {
        const { hideEmailSentDialogAction } = this.props;
        hideEmailSentDialogAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, username, password } = this.state;
        const { registrateUserAction } = this.props;
        registrateUserAction(email, username, password);
        console.log("Submitted");
    }

    render() {

        var showDialog = this.props.showRegistrationDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }
        var emailSent = this.props.showEmailSentDialog;
        if (emailSent === undefined) {
            emailSent = false;
        }

        return (
            <div>
                <Button variant="primary" className="navBarNormalContent loginButtonHeight backgroundSecondary border-0" onClick={this.handleShow}>
                    Registrieren
                </Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Registrierung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body /* show={!emailSent} */ className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">E-Mail:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" placeholder="E-Mail" name="email" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Nutzername:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Nutzername" name="username" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-white">Passwort:</Form.Label>
                                <Form.Control type="password" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Passwort" name="password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                {!this.props.registrationPending && "Submit"}
                                {this.props.registrationPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                            </Button>
                            {this.props.error && <Form.Label style={{ color: "red", marginTop: "0.5rem" }}>{/* Bitte anderen Nutzernamen/Email wählen */}{this.props.error}</Form.Label>}
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={emailSent} onHide={this.handleCloseEmailSent}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Registrierung</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form.Label className="text-white">Ihre Email wurde versendet, bitte klicken Sie auf den Link in der Email, damit ihr Account bestätigt wird. Nur dann können Sie sich einloggen und die Funktionen eines angemeldeten Nutzers nutzen.</Form.Label>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showRegistrationDialogAction: authenticationActions.getShowRegistrationDialogAction,
    hideRegistrationDialogAction: authenticationActions.getHideRegistrationDialogAction,
    hideEmailSentDialogAction: authenticationActions.getHideEmailSentDialogAction,
    registrateUserAction: authenticationActions.registrateUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationWidget)