import React, { Component } from "react";
import EditCommentWidget from "./EditCommentWidget";
import DeleteCommentWidget from "./DeleteCommentWidget";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return state;
}

class Comment extends Component {

    render() {
        var comment;
        if (this.props.user !== undefined) {
            if (this.props.user == null) {
                comment = <div className="smallComment borderAlmostBlack textWhite iconWrapper">
                    <div>
                        <div className="text-left textSize36">
                            <div className="textColorInput von">von </div>{this.props.name}
                        </div>
                        <div className="text-left textSize24">
                            {this.props.content}
                        </div>
                    </div>
                </div>;
            } else if (this.props.user.userID === this.props.userID) {
                comment = <div className="smallComment borderAlmostBlack textWhite iconWrapper">
                    <div className="makePlaceForIconsComment">
                        <div className="text-left textSize36">
                            <div className="textColorInput von">von </div>{this.props.name}
                        </div>
                        <div className="text-left textSize24">
                            {this.props.content}
                        </div>
                    </div>
                    <div className="iconDivComment">
                        <DeleteCommentWidget postID={this.props.postID} commentID={this.props.commentID} />
                        <EditCommentWidget postID={this.props.postID} commentID={this.props.commentID} content={this.props.content} />
                    </div>
                </div>;
            } else if (this.props.user.role === 'admin') {
                comment = <div className="smallComment borderAlmostBlack textWhite iconWrapper">
                    <div className="makePlaceForIconsComment">
                        <div className="text-left textSize36">
                            <div className="textColorInput von">von </div>{this.props.name}
                        </div>
                        <div className="text-left textSize24">
                            {this.props.content}
                        </div>
                    </div>
                    <div className="iconDivComment">
                        <DeleteCommentWidget postID={this.props.postID} commentID={this.props.commentID} />
                    </div>
                </div>;
            } else {
                comment = <div className="smallComment borderAlmostBlack textWhite iconWrapper">
                    <div>
                        <div className="text-left textSize36">
                            <div className="textColorInput von">von </div>{this.props.name}
                        </div>
                        <div className="text-left textSize24">
                            {this.props.content}
                        </div>
                    </div>
                </div>;
            }
        } else {
            comment = <div className="smallComment borderAlmostBlack textWhite iconWrapper">
                <div>
                    <div className="text-left textSize36">
                        <div className="textColorInput von">von </div>{this.props.name}
                    </div>
                    <div className="text-left textSize24">
                        {this.props.content}
                    </div>
                </div>
            </div>;
        }

        return (
            <div>
                {comment}
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Comment)