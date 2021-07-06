import React, { Component } from "react";
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import StartPage from './StartPage';
import ForumPage from './ForumPage';

const mapStateToProps = state => {
    return state;
}

class Content extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={StartPage} exact />
                    <Route path="/Forum" component={ForumPage} exact />
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Content);