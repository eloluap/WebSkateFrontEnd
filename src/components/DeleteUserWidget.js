import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { BsFillTrashFill } from 'react-icons/bs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/UserActions';

const mapStateToProps = state => {
    return state;
}

class DeleteUserWidget extends Component {

    handleShow = (e) => {
        e.preventDefault();
        const { showDeleteProfileDialogAction } = this.props;
        showDeleteProfileDialogAction(this.props.userID);
    }

    handleClose = () => {
        const { hideDeleteProfileDialogAction } = this.props;
        hideDeleteProfileDialogAction();
    }

    handleDeleteProfile = (e) => {
        e.preventDefault();
        console.log("Delete User");
        const { deleteUser } = this.props;
        deleteUser(this.props.userID, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showDeleteProfileDialog;
        if (showDialog === undefined) {
            showDialog = false;
        } else {
            if (this.props.clickedUser === this.props.userID) {
                showDialog = this.props.showDeleteProfileDialog;
            } else {
                showDialog = false;
            }
        }

        return (
            <div>
                <Button className="buttonDelete" id="buttonDelete" onClick={this.handleShow}><BsFillTrashFill /></Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white">Account - Löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Wollen Sie diesen Account wirklich löschen?</Form.Label>
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
    deleteUser: userActions.deleteUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserWidget)