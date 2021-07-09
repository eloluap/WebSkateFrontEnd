import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';

import * as postActions from '../actions/PostActions';

import ForumPostSmall from './ForumPostSmall';
import CreatePost from './CreatePost';

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
            return <ForumPostSmall postID={x.postID} name={x.userName} titel={x.titel} content={x.content} />;
        });


        return (
            <div>
                <div className="bannerForumPage">
                    <div className="bannerHeadline">
                        Forum
                    </div>
                </div>
                {this.props.user && <CreatePost />}
                {this.props.loadPostsPending && <div className="textWhite"><Spinner animation="border" className="spinner-border-sm mr-2" variant="primary" />Loading Posts...</div>}
                {postList}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostList: postActions.getPostList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)