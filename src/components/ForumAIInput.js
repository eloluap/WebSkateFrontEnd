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

class ForumAIInput extends Component {

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
        const { sendAIInput } = this.props;
        var postID = -1;
        if (this.props.activePost) {
            postID = this.props.activePost.postID;
        }
        if (contentField !== '') {
            sendAIInput(postID, contentField, this.props.accessToken);
            var aiInputForm = document.getElementsByName('aiInputForm')[0];
            aiInputForm.reset();
            this.setState({ contentField: '', localError: '' });
            console.log("Sent Content to AI");
        } else {
            this.setState({ localError: 'Bitte das Feld ausfüllen.' });
        }
        // TODO: Send to AI in sendAIInputAction
    }

    render() {
        var errorOutput;
        if (this.state.localError !== '') {
            errorOutput = <Form.Label className="aiInputError" style={{ color: "red", margin: "0.5rem 0 0 0", display: "block" }}>{this.state.localError}</Form.Label>;
        } else {
            errorOutput = <Form.Label className="aiInputError" style={{ color: "red", margin: "0.5rem 0 0 0", display: "none" }}>{this.state.localError}</Form.Label>;
        }
        return (
            <div className="fixed-bottom aiInputWrapper">
                <div className="borderAlmostBlack textWhite h-100">
                    <Form name="aiInputForm">
                        <div className="aiInput h-100">
                            <div className="aiInputContent w-100 h-100">
                                <Form.Group controlId="formBasicEmail" className="w-100 h-100 m-0">
                                    <Form.Control as="textarea" className="backgroundInput textColorInput borderAlmostBlack rounded-0 w-100 h-100" placeholder="Befehl hier eingeben.." name="contentField" onChange={this.handleChange} />
                                </Form.Group>
                            </div>
                            <div className="aiInputButton w-100 h-100">
                                <Button className="w-100 h-100 backgroundSecondary border-0 rounded-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                                    {!this.props.aiInputPending && <div className="textSize48">Ausführen</div>}
                                    {this.props.aiInputPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                                </Button>
                            </div>
                            {errorOutput}
                        </div>
                    </Form>
                </div>
            </div>
        // TODO: Make Input Field Bigger
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    sendAIInput: postActions.sendAIInputAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumAIInput);