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

class DeleteProfileWidget extends Component {

    handleShow = (e) => {
        e.preventDefault();
        const { showDeleteProfileDialogAction } = this.props;
        showDeleteProfileDialogAction();
    }

    handleClose = () => {
        const { hideDeleteProfileDialogAction } = this.props;
        hideDeleteProfileDialogAction();
    }

    handleDeleteProfile = (e) => {
        e.preventDefault();
        console.log("Delete Profile");
        const { deleteProfile } = this.props;
        deleteProfile(this.props.user.userID, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showDeleteProfileDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Button variant="primary" id="buttonDeleteModal" className="buttonDeleteModal navBarNormalContent loginButtonHeight backgroundSecondary border-0" onClick={this.handleShow}>
                    Account löschen
                </Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white">Account - Löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Wollen Sie ihren Account wirklich löschen?</Form.Label>
                            </Form.Group>

                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleDeleteProfile}>
                                {!this.props.deleteProfilePending && "Ja!"}
                                {this.props.deleteProfilePending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
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
    showDeleteProfileDialogAction: userActions.getShowDeleteProfileDialogAction,
    hideDeleteProfileDialogAction: userActions.getHideDeleteProfileDialogAction,
    deleteProfile: userActions.deleteProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfileWidget)