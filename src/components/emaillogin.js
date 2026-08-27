import React, { Component } from "react";
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from "./styles";
import Geotech from "./geotech";
import { advanceIcon, emaillogin, logMeIn } from './svg';
import { LoginConfirmation, ClientEmailLogin, RegisterNewClient } from './actions/api'
import { formatDateTime } from "./functions";


class EmailLogin extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, emailaddress: null, clientid: null, client_id: null, register: false, message: '', showclientid: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async loginClient() {

        const { client_id, emailaddress, clientid, loginCode } = this.state;

        const values = { client_id, emailaddress, clientid, loginCode }

        try {

            let getClient = await ClientEmailLogin(values)
            if (getClient.client) {
                this.props.reduxUser(getClient.client);
            } else {
                console.warn("⚠️ No client returned.");
            }

            // 2️⃣ Update Redux with projects if available
            if (Array.isArray(getClient?.projects) && getClient.projects.length > 0) {
                this.props.reduxProjects(getClient.projects);
            } else {
                console.warn("⚠️ No projects found for this client.");
            }

        } catch (err) {

            alert(`Error could not login Client ${err}`)
        }
    }

    async getLoginConfirmation() {
        const loginParams = {
            emailaddress: this.state.emailaddress
        };

        try {
            const authentication = await LoginConfirmation(loginParams);

            const {
                emailaddress,
                status,
                clientid,
                client_id,
                dateexp,
                message
            } = authentication;

            let register = false;

            if (status === 'served') {

                this.setState({
                    emailaddress,
                    clientid,
                    client_id,
                    dateexp,
                    status,
                    register: false,
                    message
                });

            } else if (status === 'register') {

                this.setState({
                    emailaddress,
                    status,
                    message,
                    showclientid:true
                });

            } else {

                alert('Error: Could not get an authentication from civilengineer.io');
                return;
            }

        } catch (err) {

            alert(`Error: Could not retrieve login code ${err}`);
        }
    }

    passCodeLoginBox() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const advanceIconWidth = { width: '33%', maxWidth: '170px' }

        if (this.state.status === 'served') {

            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.rightMargin15 }}>
                    <span style={{ ...regularFont }}> Enter the one-time code you received by email </span>
                </div>
                <div style={{ ...styles.flex2, ...styles.generalFont }}>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalField }}
                            onChange={event => { this.setState({ loginCode: event.target.value }) }}
                            value={this.state.loginCode} />
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.positionRight }}>
                        <button onClick={() => { this.loginClient() }}

                            className="generalButton" style={{ ...advanceIconWidth, ...styles.rightMargin15 }}>{logMeIn()}</button>
                    </div>
                </div>
            </div>)

        }
    }

    expirationCodeBox() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)

        const expirationDate = formatDateTime(this.state.dateexp)

        if (this.state.status === 'served') {

            const needanewcode = () => {
                return (<div style={{ ...styles.flex1, ...styles.generalFont, ...styles.rightMargin15 }}>
                    <span style={{ ...regularFont }}> >> need a new code</span>
                </div>)
            }



            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.rightMargin15 }}>
                    <span style={{ ...regularFont }}> Code will expire in: {expirationDate}</span>
                </div>

            </div>)
        }

    }


    showClientID() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const advanceIconWidth = { width: '33%', maxWidth: '170px' }


        if (this.state.showclientid) {




            return (

                <div style={{ ...styles.generalContainer }}>


                    <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                        <div style={{ ...styles.flex1, ...styles.rightMargin15 }}>


                            <span style={{ ...regularFont }}> Register Your ClientID / {this.state.clientid} </span>


                        </div>
                        <div style={{ ...styles.flex2 }}>
                            <input type="text" value={this.state.clientid} onChange={e => { this.setState({ clientid: e.target.value }) }} />
                            <div style={{ ...styles.generalContainer, ...styles.positionRight }}>
                                <button className="generalButton" style={{ ...advanceIconWidth, ...styles.rightMargin15 }}
                                    onClick={() => { this.registerClient() }}>{advanceIcon()}</button>
                            </div>
                        </div>



                    </div>






                </div>)
        }
    }

async registerClient() { 
    try { 
        
    const { clientid, emailaddress } = this.state; 
    const values = { clientid, emailaddress }; 
    const registerUser = await RegisterNewClient(values); 
    if (!registerUser) { throw new Error("No response received from server."); } 
    const { status, client_id, client, emailaddress: registeredEmail, dateexp, message } = registerUser; 
    if (status !== 'served') { throw new Error("New client could not be served."); }
     this.setState({ status, client_id, client, emailaddress: registeredEmail, dateexp, message }); 
    
    } catch (err) { console.error("registerClient error:", err); 
        alert(`Error: Could not register Client. ${err.message}`); } }




render() {

    const styles = MyStylesheet();
    const geotech = new Geotech();
    const regularFont = geotech.getRegularFont.call(this)
    const buttonWidth = { width: '80%', maxWidth: '280px' }
    const advanceIconWidth = { width: '33%', maxWidth: '170px' }

    return (
        <div style={{ ...styles.generalContainer }}>
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                <span style={{ ...regularFont }}>One-Time Passcode Login</span>
            </div>

            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button className="generalButton" style={{ ...buttonWidth }}>{emaillogin()}</button>
                </div>
            </div>




            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.rightMargin15 }}>
                    <span style={{ ...regularFont }}> Enter the email address for your account </span>
                </div>
                <div style={{ ...styles.flex2, ...styles.generalFont }}>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalField }} value={this.state.emailaddress} onChange={event => { this.setState({ emailaddress: event.target.value }) }} />
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.positionRight }}>
                        <button className="generalButton" style={{ ...advanceIconWidth, ...styles.rightMargin15 }}
                            onClick={() => { this.getLoginConfirmation() }}>{advanceIcon()}</button>
                    </div>
                </div>
            </div>



            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                <span style={{ ...regularFont }}>{this.state.message}</span>
            </div>

            {this.showClientID()}


            {this.passCodeLoginBox()}

            {this.expirationCodeBox()}
















        </div>)
}
}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(EmailLogin);