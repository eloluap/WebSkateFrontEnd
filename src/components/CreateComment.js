import React, { Component } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as postActions from '../actions/PostActions';

const mapStateToProps = state => {
    return state;
}

class CreateComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentField: '',
            localError: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { contentField } = this.state;
        const { createComment } = this.props;
        if (contentField !== '') {
            createComment(this.props.activePost.postID, contentField, this.props.accessToken);
            var createForm = document.getElementsByName('createCommentForm')[0];
            createForm.reset();
            this.setState({ contentField: '', localError: '' });
            console.log("Submitted Comment");
        } else {
            this.setState({ localError: 'Bitte das Feld ausfüllen.' });
        }
    }

    render() {
        var errorOutput;
        if (this.state.localError !== '') {
            errorOutput = <Form.Label className="createCommentError" style={{ color: "red", margin: "0.5rem 0 0 0", display: "block" }}>{this.state.localError}</Form.Label>;
        } else {
            errorOutput = <Form.Label className="createCommentError" style={{ color: "red", margin: "0.5rem 0 0 0", display: "none" }}>{this.state.localError}</Form.Label>;
        }
        return (
            <div className="createCommentWrapper borderAlmostBlack textWhite">
                <Form name="createCommentForm">
                    <div className="createComment">
                        <div className="createCommentContent w-100 h-100">
                            <Form.Group controlId="formBasicEmail" className="w-100 h-100 m-0">
                                <Form.Control as="textarea" className="backgroundInput textColorInput borderAlmostBlack rounded-0 w-100 h-100" placeholder="Hier kommentieren.." name="contentField" onChange={this.handleChange} />
                            </Form.Group>
                        </div>
                        <div className="createCommentButton w-100 h-100">
                            <Button className="w-100 h-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                {!this.props.createCommentPending && <div className="textSize48">Erstellen</div>}
                                {this.props.createCommentPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                            </Button>
                        </div>
                        {errorOutput}
                    </div>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createComment: postActions.createCommentAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);