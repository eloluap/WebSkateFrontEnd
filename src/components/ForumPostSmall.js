import React, { Component } from "react";

class ForumPostSmall extends Component {
    render() {
        return (
            <div className="smallPost">
                From: {this.props.name}
                Titel: {this.props.titel}
                Text: {this.props.content}
            </div>
        )
    }
}

export default ForumPostSmall;