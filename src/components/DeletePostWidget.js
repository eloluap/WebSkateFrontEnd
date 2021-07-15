import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { BsFillTrashFill } from 'react-icons/bs';
import { Redirect } from "react-router";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as postActions from '../actions/PostActions';

const mapStateToProps = state => {
    return state;
}

class DeletePostWidget extends Component {

    handleShow = (e) => {
        e.preventDefault();
        const { showDeletePostDialogAction } = this.props;
        showDeletePostDialogAction();
    }

    handleClose = () => {
        const { hideDeletePostDialogAction } = this.props;
        hideDeletePostDialogAction();
    }

    handleDeletePost = (e) => {
        e.preventDefault();
        console.log("Delete Post");
        const { deletePost } = this.props;
        deletePost(this.props.activePost.postID, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showDeletePostDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        if (this.props.redirectDelete) {
            return <Redirect to='/Forum' />;
        }

        return (
            <div>
                <Button className="buttonDelete" id="buttonDelete" onClick={this.handleShow}><BsFillTrashFill /></Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white">Beitrag - Löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Wollen Sie den Beitrag wirklich löschen?</Form.Label>
                            </Form.Group>

                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleDeletePost}>
                                {!this.props.deletePostPending && "Ja!"}
                                {this.props.deletePostPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
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
    showDeletePostDialogAction: postActions.getShowDeletePostDialogAction,
    hideDeletePostDialogAction: postActions.getHideDeletePostDialogAction,
    deletePost: postActions.deletePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeletePostWidget)