import React, { Component } from "react";

import { Link } from 'react-router-dom';

class ForumPostSmall extends Component {
    render() {
        return (
            <div className="smallPostWrapper">
                <Link to={"/Forum/" + this.props.postID}>
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
                </Link>
            </div>
        )
    }
}

export default ForumPostSmall;