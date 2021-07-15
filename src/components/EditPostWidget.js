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

class EditPostWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titel: '',
            content: ''
        }
    }

    componentDidMount() {
        this.setState({
            titel: this.props.activePost.titel,
            content: this.props.activePost.content
        });
    }

    handleShow = (e) => {
        e.preventDefault();
        const { showEditPostDialogAction } = this.props;
        showEditPostDialogAction();
    }

    handleClose = () => {
        const { hideEditPostDialogAction } = this.props;
        hideEditPostDialogAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleEditPost = (e) => {
        e.preventDefault();
        console.log("Edit Post");
        const { titel, content } = this.state;
        const { editPostSelf } = this.props;
        editPostSelf(this.props.activePost.postID, titel, content, this.props.accessToken);
    }

    render() {

        var showDialog = this.props.showEditPostDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>
                <Button className="buttonEdit" id="buttonEdit" onClick={this.handleShow}><BsPencil /></Button>

                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header className="backgroundModal border-0" closeButton>
                        <Modal.Title className="text-white ">Beitrag - Bearbeiten</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backgroundPrimary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Titel:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" value={this.state.titel} placeholder="Titel" name="titel" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-white">Text:</Form.Label>
                                <Form.Control type="text" className="backgroundInput borderAlmostBlack rounded-0" value={this.state.content} placeholder="Text" name="content" onChange={this.handleChange} />
                            </Form.Group>

                            <Button className="w-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleEditPost}>
                                {!this.props.editPostPending && "Bearbeiten"}
                                {this.props.editPostPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
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
    showEditPostDialogAction: postActions.getShowEditPostDialogAction,
    hideEditPostDialogAction: postActions.getHideEditPostDialogAction,
    editPostSelf: postActions.editPostSelf
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditPostWidget)