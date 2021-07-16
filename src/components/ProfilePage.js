import React, { Component } from "react";
import { connect } from 'react-redux';
import EditProfileWidget from './EditProfileWidget';

const mapStateToProps = state => {
    return state;
}

class ProfilePage extends Component {
    render() {
        var editUser = <div className="textSize48">Bitte melden sie sich an!</div>;
        if (this.props.user !== undefined && this.props.user !== null) {
            editUser = <div className="yourData borderAlmostBlack">
                <div className="textSize48">
                    Ihre Daten:
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    E-Mail-Adresse: {this.props.user.email}
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    Ursprünglicher Nutzername: {this.props.user.userID}
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    Aktueller Nutzername: {this.props.user.userName}
                </div>
                <EditProfileWidget />
            </div>
        }
        return (
            <div>
                <div className="bannerProfilePage">
                    <div className="bannerHeadline">
                        Profil
                    </div>
                </div>
                <div>
                    <div className="textWhite mt-3">
                        {editUser}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(ProfilePage);