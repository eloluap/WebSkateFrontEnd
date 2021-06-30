import React, { Component } from "react";
import { connect } from 'react-redux';
import StartPage from './StartPage';

const mapStateToProps = state => {
    return state;
}

class Content extends Component {
    render() {

        let activeContent = <StartPage />;
        return (
            <div>
                {activeContent}
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Content);