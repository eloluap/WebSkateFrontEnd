import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';

import * as userActions from '../actions/UserActions';

import UserSmall from './UserSmall';

const mapStateToProps = state => {
    return state;
}

class UserManagementPage extends Component {

    componentDidMount() {
        const { getUserList } = this.props;
        getUserList(this.props.accessToken);
    }

    render() {
        var userList = this.props.users.map(x => {
            return <UserSmall user={x} />;
        });


        return (
            <div>
                <div className="bannerProfilePage">
                    <div className="bannerHeadline">
                        Management
                    </div>
                </div>
                {this.props.loadUsersPending && <div className="textWhite"><Spinner animation="border" className="spinner-border-sm mr-2" variant="primary" />Loading Users...</div>}
                {userList}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserList: userActions.getUserList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)