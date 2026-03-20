import React, { Component } from 'react';
import Geotech from './geotech'
import { MyStylesheet } from "./styles";
import * as actions from './actions';
import { connect } from 'react-redux'
import { defaultProfilePhoto, uploadIcon, radioCheck, radioUncheck, saveProfileIcon } from './svg';
import { SaveProfile, UploadProfilePhoto } from './actions/api';
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '' }
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

    getValue(prop) {
        console.log(prop)
        const geotech = new Geotech();
        const user = geotech.getUser.call(this);

        return user?.[prop];
    }

    setValue(prop, value) {
        const geotech = new Geotech();
        const user = geotech.getUser.call(this);

        if (!user) return;

        user[prop] = value;

        this.props.reduxUser(user);
        this.setState({ render: true });
    }

    getPrefix(prefix) {
        const geotech = new Geotech();
        const user = geotech.getUser.call(this);

        // Return unchecked if user is not loaded yet
        if (!user) return radioUncheck();

        return user.prefix === prefix ? radioCheck() : radioUncheck();
    }
    profile_1() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const radioWidth = { width: '2em' }

        if (this.state.width > 768) {

            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>

                    <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <button style={{ ...styles.generalButton, ...radioWidth }}
                                onClick={() => { this.setValue("prefix", 'Mr.') }}>
                                {this.getPrefix("Mr.")}
                            </button>
                            <span style={{ ...regularFont }}>Mr.</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <button style={{ ...styles.generalButton, ...radioWidth }}
                                onClick={() => { this.setValue("prefix", 'Ms.') }}>
                                {this.getPrefix("Ms.")}
                            </button>
                            <span style={{ ...regularFont }}>Ms.</span>
                        </div>
                    </div>

                </div>

                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                        value={this.getValue('firstname')}
                        onChange={event => { this.setValue("firstname", event.target.value) }} />
                    <span style={{ ...regularFont }}>First Name</span>

                </div>

                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                        value={this.getValue('lastname')}
                        onChange={event => { this.setValue("lastname", event.target.value) }} />
                    <span style={{ ...regularFont }}>Last Name</span>

                </div>


            </div>)


        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <button style={{ ...styles.generalButton, ...radioWidth }}
                            onClick={() => { this.setValue("prefix", 'Mr.') }}>
                            {this.getPrefix("Mr.")}
                        </button>
                        <span style={{ ...regularFont }}>Mr.</span>



                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <button style={{ ...styles.generalButton, ...radioWidth }}
                            onClick={() => { this.setValue("prefix", 'Ms.') }}>
                            {this.getPrefix("Ms.")}
                        </button>
                        <span style={{ ...regularFont }}>Ms.</span>

                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getValue('firstname')}
                            onChange={event => { this.setValue("firstname", event.target.value) }} />
                        <span style={{ ...regularFont }}>First Name</span>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getValue('lastname')}
                            onChange={event => { this.setValue("lastname", event.target.value) }} />
                        <span style={{ ...regularFont }}>Last Name</span>

                    </div>
                </div>
            </div>)

        }
    }

    profile_2() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        if (this.state.width > 768) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('city')}
                        onChange={event => { this.setValue("city", event.target.value) }} />
                    <span style={{ ...regularFont }}>City </span>

                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('contactstate')}
                        onChange={event => { this.setValue("contactstate", event.target.value) }} />
                    <span style={{ ...regularFont }}>State</span>

                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('zipcode')}
                        onChange={event => { this.setValue("zipcode", event.target.value) }} />
                    <span style={{ ...regularFont }}>Zip Code</span>

                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('city')}
                        onChange={event => { this.setValue("city", event.target.value) }} />
                    <span style={{ ...regularFont }}>City</span>

                </div>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('contactstate')}
                        onChange={event => { this.setValue("contactstate", event.target.value) }} />
                    <span style={{ ...regularFont }}>State</span>

                </div>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('zipcode')}
                        onChange={event => { this.setValue("zipcode", event.target.value) }} />
                    <span style={{ ...regularFont }}>Zip Code</span>

                </div>
            </div>)

        }
    }

    profile_3() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        if (this.state.width > 768) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('emailaddress')}
                        onChange={event => { this.setValue("emailaddress", event.target.value) }} />
                    <span style={{ ...regularFont }}>Email Address </span>

                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('phonenumber')}
                        onChange={event => { this.setValue("phonenumber", event.target.value) }} />
                    <span style={{ ...regularFont }}>Phone Number</span>

                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('emailaddress')}
                        onChange={event => { this.setValue("emailaddress", event.target.value) }} />
                    <span style={{ ...regularFont }}>Email Address</span>

                </div>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getValue('phonenumber')}
                        onChange={event => { this.setValue("phonenumber", event.target.value) }} />
                    <span style={{ ...regularFont }}>Phone Number</span>
                </div>
            </div>)

        }
    }

    async saveProfile() {
        try {
            const geotech = new Geotech();
            const user = geotech.getUser.call(this)

            let response = await SaveProfile(user)
            if (response.myuser) {
                this.props.reduxUser(response.myuser)
            }

            if (response.message) {
                this.setState({ message: response.message })
            }

        } catch (err) {

            alert(`Could not save Profile ${err}`)
        }

    }

    async uploadProfilePicture() {
        try {
            const geotech = new Geotech();

            // Get selected file
            const file = document.getElementById("profilephoto")?.files?.[0];
            if (!file) return;

            // Get user
            const myuser = geotech.getUser.call(this);

            // Build form data
            const formdata = new FormData();
            formdata.append("profilephoto", file);
            formdata.append("myuser", JSON.stringify(myuser));

            // Upload
            const response = await UploadProfilePhoto(formdata);

            // Update redux and UI
            if (response?.myuser) {
                this.props.reduxUser(response.myuser);
                this.setState({ render: "render" }); // trigger re-render if needed
            }

            // Display server message if provided
            if (response?.message) {
                this.setState({ message: response.message });
            }

        } catch (err) {
            console.error("Upload failed:", err);
            alert("Profile upload failed");
        }
    }

    getProfilePhoto() {
        const geotech = new Geotech();
        const myuser = geotech.getUser.call(this);
        const profilePhoto = this.state.width > 768 ? { width: '40%' } : { width: '50%' }

        return myuser?.profileurl
            ? <img src={`${process.env.REACT_APP_SERVER_API}${myuser.profileurl}`} style={{ ...profilePhoto }} alt="Profile" />
            : defaultProfilePhoto();
    }


    render() {
        const styles = MyStylesheet();
        const profilePhoto = this.state.width > 768 ? { width: '40%' } : { width: '50%' }
        const uploadIconMargin = this.state.width > 768 ? { marginRight: '50px' } : { marginRight: '25px' }
        const uploadContainer = this.state.width > 768 ? { width: '85px' } : { width: '65px' }
        const saveprofile = this.state.width > 768 ? { width: '200px' } : { width: '150px' }
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.alignCenter }}>
                <input type="text" style={{ ...regularFont, ...styles.width50 }}
                    value={this.getValue('clientid')}
                    onChange={event => { this.setValue("clientid", event.target.value) }} />
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>ClientID</span>
                </div>


            </div>

            <div style={{ ...styles.generalContainer, ...profilePhoto, ...styles.marginAuto, ...styles.bottomMargin15 }}>
                {this.getProfilePhoto()}
            </div>



            <div style={{ ...styles.generalContainer, ...styles.positionRight, ...uploadIconMargin }}>

                <button onClick={() => document.getElementById("profilephoto").click()}
                    style={{ ...styles.generalButton, ...uploadContainer }}>{uploadIcon()}</button>


                <span style={{ ...regularFont }}>Upload Profile Image</span>
                <input type="file"
                    onChange={() => { this.uploadProfilePicture() }}
                    id="profilephoto" style={{ ...styles.noDisplay }} />

            </div>



            <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <span style={{ ...regularFont }}><u>Profile Information</u></span>
            </div>

            {this.profile_1()}

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <input type="text" style={{ ...regularFont, ...styles.generalField }}
                    value={this.getValue('company')}
                    onChange={event => { this.setValue("company", event.target.value) }} />
                <span style={{ ...regularFont }}>Company</span>

            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <input type="text" style={{ ...regularFont, ...styles.generalField }}
                    value={this.getValue('address')}
                    onChange={event => { this.setValue("address", event.target.value) }} />
                <span style={{ ...regularFont }}>Address</span>

            </div>

            {this.profile_2()}

            {this.profile_3()}

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.generalFont }}>
                <span style={{ ...regularFont }}>{this.state.message} </span>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <button style={{ ...styles.generalButton, ...saveprofile }} onClick={() => { this.saveProfile() }}>{saveProfileIcon()}</button>
            </div>



        </div>)
    }
}
function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(Profile);