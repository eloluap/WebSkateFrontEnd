import React, { Component } from "react";
import lernen from "../layout/images/Lernen.png";
import skateparks from "../layout/images/Skateparks.png";
import forum from "../layout/images/Forum.png";
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button';

class StartPage extends Component {
    render() {
        return (
            <div>
                <div className="startPage">
                    <div className="bannerHeadline">
                        Skate-Berlin
                    </div>
                    <div className="bannerText">
                        Du lebst in Berlin? <br />
                        Du skatest gerne?
                    </div>
                    <div className="bannerText">
                        Dann bist du genau hier richtig!
                    </div>
                </div>
                <div className="row backgroundPrimary m-0 p-3">
                    <div className="col-md-4 p-3">
                        <img src={lernen} className="img-fluid" alt="Klappe Lernen" />
                        <Button className="buttonKlappe buttonText backgroundSecondary">Lernen</Button>
                    </div>
                    <div className="col-md-4 p-3">
                        <img src={skateparks} className="img-fluid" alt="Klappe Skateparks" />
                        <Button className="buttonKlappe buttonText backgroundSecondary">Skateparks</Button>
                    </div>
                    <div className="col-md-4 p-3">
                        <img src={forum} className="img-fluid" alt="Klappe Forum" />
                        <LinkContainer to="/Forum">
                            <Button className="buttonKlappe buttonText backgroundSecondary">Forum</Button>
                        </LinkContainer>
                    </div>
                </div>
            </div>
        )
    }
}

export default StartPage;