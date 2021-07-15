import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { BsFillTrashFill } from 'react-icons/bs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as postActions from '../actions/PostActions';

const mapStateToProps = state => {
    return state;
}

class DeleteCommentWidget extends Component {

    handleShow = (e) => {
        e.preventDefault();
        const { showDeleteCommentDialogAction } = this.props;
        showDeleteCommentDialogAction(this.props.commentID);
    }

    handleClose = () => {
        const { hideDeleteCommentDialogAction } = this.props;
        hideDeleteCommentDialogAction();
    }

    handleDeleteComment = (e) => {
        e.preventDefault();
        console.log("Delete Comment");
        const { deleteComment } = this.props;
        deleteComment(this.props.postID, this.props.commentID, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showDeleteCommentDialog;
        if (showDialog === undefined) {
            showDialog = false;
        } else {
            if (this.props.clickedComment === this.props.commentID) {
                showDialog = this.props.showDeleteCommentDialog;
            } else {
                showDialog = false;
            }
        }

        return (
            <div>
                <Button className="buttonDelete" id="buttonDelete" onClick={this.handleShow}><BsFillTrashFill /></Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white">Kommentar - Löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Wollen Sie den Kommentar wirklich löschen?</Form.Label>
                            </Form.Group>

                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleDeleteComment}>
                                {!this.props.deleteCommentPending && "Ja!"}
                                {this.props.deleteCommentPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
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
    showDeleteCommentDialogAction: postActions.getShowDeleteCommentDialogAction,
    hideDeleteCommentDialogAction: postActions.getHideDeleteCommentDialogAction,
    deleteComment: postActions.deleteComment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCommentWidget)