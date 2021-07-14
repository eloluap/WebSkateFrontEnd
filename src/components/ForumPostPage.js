import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';

import * as postActions from '../actions/PostActions';

import Comment from './Comment';
import CreateComment from './CreateComment';

const mapStateToProps = state => {
    return state;
}

class ForumPostPage extends Component {

    componentDidMount() {
        const { getPost, getCommentList } = this.props;
        getPost(this.props.match.params.postID);
        getCommentList(this.props.match.params.postID);
    }

    componentWillUnmount() {
        const { clearActivePost } = this.props;
        clearActivePost();
    }

    render() {
        var commentList = this.props.comments.map(x => {
            return <Comment name={x.userName} titel={x.titel} content={x.content} />;
        });

        var activePost = this.props.activePost;
        var post = null;
        if (activePost === null) {
            post = <div></div>;
        } else {
            if (commentList.length === 0 && this.props.user == null) {
                post = <div className="normalPost">
                    <div className="text-left textSize36">
                        <div className="textColorInput von">von </div>{activePost.userName}
                    </div>
                    <div className="text-left textSize48">
                        {activePost.titel}
                    </div>
                    <div className="text-left textSize24">
                        {activePost.content}
                    </div>
                </div>;
            } else {
                post = <div className="normalPost mb-3">
                    <div className="text-left textSize36">
                        <div className="textColorInput von">von </div>{activePost.userName}
                    </div>
                    <div className="text-left textSize48">
                        {activePost.titel}
                    </div>
                    <div className="text-left textSize24">
                        {activePost.content}
                    </div>
                </div>;
            }
        }

        var trennerComments;
        if (commentList.length !== 0) {
            trennerComments = <hr className="trenner borderAlmostBlack" />;
        }

        return (
            <div>
                <div className="bannerForumPage">
                    <div className="bannerHeadline">
                        Forum
                    </div>
                </div>
                <div className="smallPostWrapper">
                    <div className="smallPost borderAlmostBlack textWhite">
                        {post}
                        {this.props.user && <hr className="trenner borderAlmostBlack" />}
                        {this.props.user && <CreateComment />}
                        {trennerComments}
                        {commentList}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPost: postActions.getPost,
    getCommentList: postActions.getCommentList,
    clearActivePost: postActions.clearActivePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumPostPage)