import React, { Component } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authenticationActions from '../actions/AuthenticationActions';

const mapStateToProps = state => {
    return state;
}

class LogoutButton extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        const { logoutUser } = this.props;
        logoutUser();
    }

    render() {
        return (
            <div>
                <NavDropdown.Item href="#" onClick={this.handleLogout}>Abmelden</NavDropdown.Item>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logoutUser: authenticationActions.getLogoutAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);