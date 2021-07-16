import React, { Component } from "react";
import { connect } from 'react-redux';
import EditProfileWidget from './EditProfileWidget';
import DeleteProfileWidget from './DeleteProfileWidget';
import { Redirect } from "react-router";

const mapStateToProps = state => {
    return state;
}

class ProfilePage extends Component {
    render() {
        var editUser = <div className="textSize48">Bitte melden sie sich an!</div>;
        if (!this.props.user) {
            console.log("redirect");
            return <Redirect to='/' />;
        }
        if (this.props.user !== undefined && this.props.user !== null) {
            editUser = <div className="yourData borderAlmostBlack">
                <div className="textSize48">
                    Ihre Daten:
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    E-Mail-Adresse: <div className="dataUser">{this.props.user.email}</div>
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    Ursprünglicher Nutzername: <div className="dataUser">{this.props.user.userID}</div>
                </div>
                <div className="textProfileSize36 textAlignLeft">
                    Aktueller Nutzername: <div className="dataUser">{this.props.user.userName}</div>
                </div>
                <EditProfileWidget />
                <DeleteProfileWidget />
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