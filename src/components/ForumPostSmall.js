import React, { Component } from "react";

class ForumPostSmall extends Component {
    render() {
        return (
            <div className="smallPost borderAlmostBlack textWhite">
                <div className="text-left textSize36 overflowOneLine">
                    <div className="textColorInput von">von </div>{this.props.name}
                </div>
                <div className="text-left textSize48 overflowOneLine">
                    {this.props.titel}
                </div>
                <div className="text-left textSize24 overflowTwoLines">
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default ForumPostSmall;