import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { BsPencil } from 'react-icons/bs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as postActions from '../actions/PostActions';

const mapStateToProps = state => {
    return state;
}

class EditCommentWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        this.setState({
            content: this.props.content
        });
    }

    handleShow = (e) => {
        e.preventDefault();
        const { showEditCommentDialogAction } = this.props;
        showEditCommentDialogAction(this.props.commentID);
    }

    handleClose = () => {
        const { hideEditCommentDialogAction } = this.props;
        hideEditCommentDialogAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleEditComment = (e) => {
        e.preventDefault();
        console.log("Edit Comment");
        const { content } = this.state;
        const { editCommentSelf } = this.props;
        editCommentSelf(this.props.postID, this.props.commentID, content, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showEditCommentDialog;
        if (showDialog === undefined) {
            showDialog = false;
        } else {
            if (this.props.clickedComment === this.props.commentID) {
                showDialog = this.props.showEditCommentDialog;
            } else {
                showDialog = false;
            }
        }

        return (
            <div>
                <Button className="buttonEdit mr-2" id="buttonEdit" onClick={this.handleShow}><BsPencil /></Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Kommentar - Bearbeiten</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Text:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" value={this.state.content} placeholder="Text" name="content" onChange={this.handleChange} />
                            </Form.Group>

                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleEditComment}>
                                {!this.props.editCommentPending && "Bearbeiten"}
                                {this.props.editCommentPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
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
    showEditCommentDialogAction: postActions.getShowEditCommentDialogAction,
    hideEditCommentDialogAction: postActions.getHideEditCommentDialogAction,
    editCommentSelf: postActions.editCommentSelf
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentWidget)