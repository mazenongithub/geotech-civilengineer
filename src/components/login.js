import React, { Component } from "react";
import "./login.css";
import * as actions from './actions';
import { connect } from 'react-redux'
import { LoginUser, CreateClient } from "./actions/api";
import { getAuth } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth"
import Profile from "./profile";
import Geotech from './geotech'
import { MyStylesheet } from "./styles";
import Register from "./register";
import EmailLogin from './emaillogin'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { firstname: "", lastname: "", emailaddress: "", profileurl: "", phonenumber: "", clientid: '', authToken: '', status: '', register: `` }
    }

    resetState() {
        this.setState({
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            apple: '',
            clientid: '',
            google: '',
            status: '',
            register: ''
        });
    }
    async handleAppleLogin() {

        this.resetState()
        const auth = getAuth();



        try {

            const result = await signInWithPopup(auth, appleProvider);


            if (result.hasOwnProperty("user")) {

                const getuser = result.user;
                const authToken = await getuser.getIdToken();
                const displayName = getuser.displayName || '';
                const nameParts = displayName.trim()
                    ? displayName.trim().split(/\s+/)
                    : [];
                const firstname = nameParts[0] || '';
                const lastname = nameParts.slice(1).join(' ') || '';
                const emailaddress = getuser.providerData[0].email
                const profileurl = getuser.providerData[0].photoURL
                const phonenumber = getuser.phoneNumber;


                this.setState(
                    { firstname, lastname, emailaddress, profileurl, phonenumber, authToken },
                    () => {
                        this.clientLogin(); // runs AFTER state updates
                    }
                );



            }

        } catch (err) {
            alert(err)
        }

    }


    async handleGoogleLogin() {

        this.resetState()



        try {



            const result = await signInWithPopup(auth, googleProvider);

            if (result.hasOwnProperty("user")) {
                const getuser = result.user;
                const authToken = await getuser.getIdToken();
                const displayName = getuser.displayName || '';
                const nameParts = displayName.trim()
                    ? displayName.trim().split(/\s+/)
                    : [];
                const firstname = nameParts[0] || '';
                const lastname = nameParts.slice(1).join(' ') || '';
                const emailaddress = getuser.providerData[0].email
                const profileurl = getuser.providerData[0].photoURL
                const phonenumber = getuser.phoneNumber;



                this.setState(
                    { firstname, lastname, emailaddress, profileurl, phonenumber, authToken },
                    () => {
                        this.clientLogin(); // runs AFTER state updates
                    }
                );

            }


        } catch (error) {
            alert(error)
        }


    }

    async clientLogin() {
        const { firstname, lastname, emailaddress, profileurl, phonenumber, authToken } = this.state;

        const values = { firstname, lastname, emailaddress, profileurl, phonenumber, authToken };


        try {
            const response = await LoginUser(values);

            if (response.status === 'served') {

                // 1️⃣ Update Redux with user and projects
                if (response.client) {

                    this.props.reduxUser(response.client); // was 'response.engineer'? Changed to 'client'

                    if (response.projects) {
                        this.props.reduxProjects(response.projects);
                    }

                    this.resetState()

                }


            } else if (response.status === 'register') {


                this.setState({ status: 'register', register: response.register })
            }

            // 2️⃣ No need for setState hack; Redux should trigger re-render

        } catch (err) {
            console.error("Login error:", err);
            alert(`Login Error: ${err.message || err}`);
        }
    }

    async createClient() {


        try {
            let { firstname, lastname, emailaddress, profileurl, phonenumber, authToken, clientid } = this.state;
            let values = { firstname, lastname, emailaddress, profileurl, phonenumber, authToken, clientid }
            let createClient = await CreateClient(values)

            if (createClient.newClient) {

                const status = createClient.status;
                this.props.reduxUser(createClient.newClient)
                this.resetState()

            }



        } catch (err) {
            alert(`Error: Could not create client ${err}`)
        }
    }


    showLogin() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const register = new Register();

        return (

            <div className="login-container">


                <div className="login-box">

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                        <h2 style={{ ...regularFont }}>Login with:</h2>
                    </div>





                    {/* Apple Login */}
                    <button className="login-btn apple" onClick={() => { this.handleAppleLogin() }}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 14 17"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M13.545 13.034c-.21.486-.46.93-.748 1.33-.39.55-.71.93-.96 1.14-.38.35-.79.53-1.23.54-.31 0-.69-.09-1.13-.27-.44-.18-.85-.27-1.23-.27-.4 0-.82.09-1.27.27-.46.18-.83.27-1.12.28-.43.02-.86-.17-1.28-.57-.27-.23-.61-.63-1.02-1.2-.44-.62-.8-1.34-1.07-2.17-.3-.93-.45-1.83-.45-2.72 0-1.01.22-1.89.66-2.66.34-.6.8-1.07 1.38-1.4.58-.33 1.21-.51 1.89-.53.37 0 .86.1 1.48.32.62.21 1.02.32 1.2.32.13 0 .56-.14 1.29-.43.69-.26 1.27-.37 1.74-.34 1.28.1 2.24.61 2.88 1.54-1.14.69-1.71 1.66-1.71 2.92 0 .97.36 1.78 1.09 2.43-.43.62-.86 1.09-1.3 1.41zM9.67 0c0 .76-.28 1.46-.84 2.09-.68.78-1.51 1.22-2.41 1.15a2.29 2.29 0 0 1-.02-.29c0-.73.32-1.51.9-2.14.29-.33.66-.61 1.11-.84.45-.23.88-.35 1.29-.37.01.13.02.27.02.4z" />
                        </svg>

                        Sign in with Apple
                    </button>


                    {/* Google Login */}
                    <button className="login-btn google" onClick={() => { this.handleGoogleLogin() }}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" />
                        Sign in with Google
                    </button>

                    {register.showRegister.call(this)}

                    <EmailLogin />


                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <span style={{ ...regularFont }}>{this.state.message}</span>
                    </div>



                    {/* Email / password form */}


                </div>
            </div>
        );


    }


    render() {

        const geotech = new Geotech();
        const user = geotech.getUser.call(this)
        if (user) {

            return (<Profile />)

        } else {

            return (this.showLogin())

        }

    }
}
function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(Login);