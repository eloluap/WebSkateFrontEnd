import React, { Component } from "react";
import DeleteUserWidget from './DeleteUserWidget';

class UserSmall extends Component {
    render() {
        return (
            <div className="smallPostWrapper">
                <div className="smallPost borderAlmostBlack textWhite iconWrapper">
                    <div className="makePlaceForIconsUser">
                        <div className="text-left textSizeManagement36">
                            Ursprünglicher Nutzername: <div className="dataUser">{this.props.user.userID}</div>
                        </div>
                        <div className="text-left textSizeManagement36">
                            Aktueller Nutzername: <div className="dataUser">{this.props.user.userName}</div>
                        </div>
                        <div className="text-left textSizeManagement36">
                            E-Mail-Adresse: <div className="dataUser">{this.props.user.email}</div>
                        </div>
                        <div className="text-left textSizeManagement36">
                            Rolle: <div className="dataUser">{this.props.user.role}</div>
                        </div>
                    </div>
                    <div className="iconDivUser">
                        <DeleteUserWidget userID={this.props.user.userID} />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSmall;