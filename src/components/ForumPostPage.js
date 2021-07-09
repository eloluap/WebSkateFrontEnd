import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';

import * as postActions from '../actions/PostActions';

import Comment from './Comment';

const mapStateToProps = state => {
    return state;
}

class ForumPostPage extends Component {

    componentDidMount() {
        const { getPost, getCommentList } = this.props;
        getPost(this.props.match.params.postID);
        /* getCommentList(); */
    }

    componentWillUnmount() {
        const { clearActivePost } = this.props;
        clearActivePost();
    }

    render() {
        /* var commentList = this.props.comments.map(x => {
            return <Comment postID={x.postID} name={x.userName} titel={x.titel} content={x.content} />;
        }); */

        var activePost = this.props.activePost;
        var post = null;
        if (activePost === null) {
            post = <div></div>;
        } else {
            post = <div className="smallPostWrapper">
                <div className="smallPost borderAlmostBlack textWhite">
                    <div className="text-left textSize36 overflowOneLine">
                        <div className="textColorInput von">von </div>{activePost.userName}
                    </div>
                    <div className="text-left textSize48 overflowOneLine">
                        {activePost.titel}
                    </div>
                    <div className="text-left textSize24 overflowTwoLines">
                        {activePost.content}
                    </div>
                </div>
            </div>
        }

        return (
            <div>
                {post}
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