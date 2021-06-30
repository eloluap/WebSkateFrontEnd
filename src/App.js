import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import PublicTopMenu from './components/PublicTopMenu';
import PrivateTopMenu from './components/PrivateTopMenu';
import Content from './components/Content';
import BottomMenu from './components/BottomMenu';

const mapStateToProps = state => {
    return state;
}

class App extends Component {

    render() {

        const user = this.props.user;

        let topMenu;

        if (user) {
            topMenu = <PrivateTopMenu />
        } else {
            topMenu = <PublicTopMenu />
        }

        return (
            <div className="App">
                {topMenu}
                <Content />
                <BottomMenu />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(App);