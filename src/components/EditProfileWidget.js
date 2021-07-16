import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/UserActions';

const mapStateToProps = state => {
    return state;
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.user.userName,
            email: this.props.user.email
        });
    }

    handleShow = (e) => {
        e.preventDefault();
        const { showEditProfileDialogAction } = this.props;
        showEditProfileDialogAction();
    }

    handleClose = () => {
        const { hideEditProfileDialogAction } = this.props;
        hideEditProfileDialogAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        const { updateUser, user, accessToken } = this.props;
        var emailInput = email;
        if (email === user.email || email === '') {
            emailInput = null;
        }
        var usernameInput = username;
        if (username === user.userName || username === '') {
            usernameInput = null;
        }
        var passwordInput = password;
        if (password === '') {
            passwordInput = null;
        }
        updateUser(user.userID, emailInput, usernameInput, passwordInput, accessToken);
        console.log("Submitted Update");
    }

    render() {

        var showDialog = this.props.showEditProfileDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Button variant="primary" className="navBarNormalContent loginButtonHeight backgroundSecondary border-0" onClick={this.handleShow}>
                    Daten bearbeiten
                </Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Account - Daten bearbeiten</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">E-Mail:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" placeholder="E-Mail" value={this.state.email} name="email" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Nutzername:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Nutzername" value={this.state.username} name="username" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-white">Passwort:</Form.Label>
                                <Form.Control type="password" className="backgroundInput borderAlmostBlack rounded-0" placeholder="Passwort" name="password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                {!this.props.editProfilePending && "Ändern"}
                                {this.props.editProfilePending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                            </Button>
                            {this.props.error && <Form.Label style={{ color: "red", marginTop: "0.5rem" }}>{this.props.error}</Form.Label>}
                        </Form>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showEditProfileDialogAction: userActions.getShowEditProfileDialogAction,
    hideEditProfileDialogAction: userActions.getHideEditProfileDialogAction,
    updateUser: userActions.updateUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)