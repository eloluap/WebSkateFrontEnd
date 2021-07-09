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

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titel: '',
            contentField: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { titel, contentField } = this.state;
        const { createPost } = this.props;
        createPost(titel, contentField, this.props.accessToken);
        var createForm = document.getElementsByName('createPostForm')[0];
        createForm.reset();
        console.log("Submitted Post");
    }

    render() {
        return (
            <div className="smallPostWrapper">
                <div className="smallPost borderAlmostBlack textWhite">
                    <Form name="createPostForm">
                        <div className="createPost">
                            <div className="createPostCreate textSize48">
                                Beitrag erstellen
                            </div>
                            <div className="createPostTitel w-100 h-100">
                                <Form.Group controlId="formBasicEmail" className="w-100 h-100 m-0">
                                    <Form.Control type="text" className="backgroundInput textColorInput textSize36 borderAlmostBlack rounded-0 w-100 h-100" placeholder="Titel" name="titel" onChange={this.handleChange} />
                                </Form.Group>
                            </div>
                            <div className="createPostContent w-100 h-100">
                                <Form.Group controlId="formBasicEmail" className="w-100 h-100 m-0">
                                    <Form.Control as="textarea" className="backgroundInput textColorInput borderAlmostBlack rounded-0 w-100 h-100" placeholder="Text" name="contentField" onChange={this.handleChange} />
                                </Form.Group>
                            </div>
                            <div className="createPostButton w-100 h-100">
                                <Button className="w-100 h-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                    {!this.props.loginPending && <div className="textSize48">Erstellen</div>}
                                    {this.props.loginPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    createPost: postActions.createPostAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);