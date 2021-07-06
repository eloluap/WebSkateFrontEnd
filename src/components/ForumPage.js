import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';

import * as postActions from '../actions/PostActions';

import ForumPostSmall from './ForumPostSmall';

const mapStateToProps = state => {
    return state;
}

class ForumPage extends Component {

    componentDidMount() {
        const { getPostList } = this.props;
        getPostList();
    }

    render() {
        var postList = this.props.posts.map(x => {
            return <ForumPostSmall name={x.userID} titel={x.titel} content={x.content} />;
        });


        return (
            <div>
                {/* Insert Banner here */}
                {/* <CreatePost /> */}
                {this.props.loadPostsPending && <Spinner animation="border" className="spinner-border-sm" variant="primary" />}
                {postList}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostList: postActions.getPostList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)