import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { triangleBullet, unCheckedBox, checkedBox, submitButton } from './svg';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { SaveContactUs } from './actions/api';

class Contact extends Component {


    constructor(props) {
        super(props)
        this.state = {
            width: 0, height: 0, datein: new Date(), fullname: '', company: '', emailaddress: '', phonenumber: '', projectaddress: '', projectcity: '', message: '', projectinquiry: false, residential: false, commercial: false, mixeduse: false, publicagency: false, investigation: false, planreview: false, compactiontesting: false, foundationdesign: false, pavementdesign: false, specialinspection: false, retainingwall: false, foundationinspection: false, preferredContact: 'email', captchaToken: false
        };

        this.turnstileRendered = false;



        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

        window.onTurnstileSuccess = (token) => {
            this.setState({ captchaToken: token });
        };

        window.onTurnstileExpired = () => {
            this.setState({ captchaToken: null });
        };

        if (window.turnstile && !this.turnstileRendered) {
            this.turnstileRendered = true;
            window.turnstile.render("#turnstile-container", {
                sitekey: process.env.REACT_APP_TURNSTILE_SITE_KEY,
                callback: (token) => {
                    this.setState({ captchaToken: token });
                },
                "expired-callback": () => {
                    this.setState({ captchaToken: null });
                },
                theme: "light"
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {

        this.setState({ width: window.innerWidth, height: window.innerHeight });


    }




    setField(field, value) {
        this.setState({
            [field]: value
        });
    };

    getField(field) {
        return this.state[field];
    };

    showTextFields() {
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const regularFont = geotech.getRegularFont.call(this)

        if (this.state.width < 768) {
            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Full Name</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text"
                        value={this.getField("fullname")}
                        onChange={event => { this.setField("fullname", event.target.value) }}
                        style={{ ...regularFont, ...styles.generalField }} />
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Company</span>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("company")}
                        onChange={event => { this.setField("company", event.target.value) }} />
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Email Address</span>
                </div>



                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("emailaddress")}
                        onChange={event => { this.setField("emailaddress", event.target.value) }} />
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Phone Number</span>
                </div>



                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("phonenumber")}
                        onChange={event => { this.setField("phonenumber", event.target.value) }} />
                </div>

            </div>)

        } else {

            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont }}>Full Name</span>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <input type="text"
                                value={this.getField("fullname")}
                                onChange={event => { this.setField("fullname", event.target.value) }}
                                style={{ ...regularFont, ...styles.generalField }} />
                        </div>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont }}>Company</span>
                        </div>


                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalField }}
                                value={this.getField("company")}
                                onChange={event => { this.setField("company", event.target.value) }} />
                        </div>

                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont }}>Email Address</span>
                        </div>



                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalField }}
                                value={this.getField("emailaddress")}
                                onChange={event => { this.setField("emailaddress", event.target.value) }} />
                        </div>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont }}>Phone Number</span>
                        </div>



                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalField }}
                                value={this.getField("phonenumber")}
                                onChange={event => { this.setField("phonenumber", event.target.value) }} />
                        </div>

                    </div>
                </div>


            </div>)

        }

    }

    showProjectLocation() {

        const geotech = new Geotech();
        const styles = MyStylesheet();
        const regularFont = geotech.getRegularFont.call(this)

        if (this.state.width > 768) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>
                <div style={{ ...styles.flex2, ...styles.addMargin }}>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Project Address</span>
                    </div>
                    <input type='text'
                        style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("projectaddress")}
                        onChange={event => { this.setField("projectaddress", event.target.value) }} />


                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Project City</span>
                    </div>

                    <input type='text' style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("projectcity")}
                        onChange={event => { this.setField("projectcity", event.target.value) }} />


                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Project Address</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type='text' value={this.getField("projectaddress")} onChange={event => { this.setField("projectaddress", event.target.value) }} style={{ ...regularFont, ...styles.generalField }} />

                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Project City</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type='text' style={{ ...regularFont, ...styles.generalField }}
                        value={this.getField("projectcity")}
                        onChange={event => { this.setField("projectcity", event.target.value) }}
                    />

                </div>

            </div>)

        }

    }

    toggleField(field) {
        this.setState((prevState) => ({
            [field]: !prevState[field]
        }));
    }

    getCheckboxIcon(field) {
        return this.state[field] ? checkedBox() : unCheckedBox();
    }

    setPreferredContact(method) {
        this.setState({ preferredContact: method });
    }
    getPreferredContactBox(method) {
        return this.state.preferredContact === method
            ? checkedBox()
            : unCheckedBox();
    }

    showProjectForm() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const buttonWidth = { width: '3em' }
        if (this.state.projectinquiry) {

            return (<div style={{ ...styles.generalContainer }}>

                {this.showProjectLocation()}


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Project Type</span>
                </div>


                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("residential") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("residential")}</button><span style={{ ...regularFont }}>Residential</span></div>
                    <div style={{ ...styles.flex1, ...styles.marginLeft15 }}><button onClick={() => { this.toggleField("commercial") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("commercial")}</button><span style={{ ...regularFont }}>Commercial</span></div>
                    <div style={{ ...styles.flex1, ...styles.marginLeft15 }}><button onClick={() => { this.toggleField("mixeduse") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("mixeduse")}</button><span style={{ ...regularFont }}>Mixed Use</span></div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("publicagency") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("publicagency")}</button><span style={{ ...regularFont }}>Public Agency</span></div>
                    <div style={{ ...styles.flex1, ...styles.marginLeft15 }}>&nbsp;</div>
                    <div style={{ ...styles.flex1, ...styles.marginLeft15 }}>&nbsp;</div>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Service Needed</span>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("investigation") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("investigation")}</button><span style={{ ...regularFont }}>Geotechnical Investigation</span></div>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("planreview") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("planreview")}</button><span style={{ ...regularFont }}>Plan Review / Consulting</span></div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("foundationdesign") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("foundationdesign")}</button><span style={{ ...regularFont }}>Foundation Design</span></div>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("compactiontesting") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("compactiontesting")}</button><span style={{ ...regularFont }}>Field Compaction Testing</span></div>
                </div>


                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("pavementdesign") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("pavementdesign")}</button><span style={{ ...regularFont }}>Pavement Design</span></div>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("foundationinspection") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("foundationinspection")}</button><span style={{ ...regularFont }}>Foundation Inspection</span></div>
                </div>


                <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("retainingwall") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("retainingwall")}</button><span style={{ ...regularFont }}>Retaining Wall</span></div>
                    <div style={{ ...styles.flex1 }}><button onClick={() => { this.toggleField("specialinspection") }} style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("specialinspection")}</button><span style={{ ...regularFont }}>Special Inspection</span></div>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Service Needed By:</span>
                </div>


                <Datetime
                    value={this.getField("datein") ? moment(this.getField("datein"))
                        : null}
                    onChange={(date) => { this.setField("datein", date) }}
                    timeFormat={false}
                    dateFormat="MM/DD/YYYY"
                    inputProps={{
                        style: { ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.mediumWidth, ...styles.bottomMargin15 }
                    }} // disables the time picker
                />
            </div>)



        }

    }

    async saveContactUs() {
        try {



            const {
                datein,
                fullname,
                company,
                emailaddress,
                phonenumber,
                projectaddress,
                projectcity,
                projectinquiry,
                residential,
                commercial,
                mixeduse,
                publicagency,
                investigation,
                planreview,
                compactiontesting,
                foundationdesign,
                pavementdesign,
                specialinspection,
                retainingwall,
                foundationinspection,
                preferredContact,
                message,
                captchaToken
            } = this.state;

            const values = {
                datein,
                fullname,
                company,
                emailaddress,
                phonenumber,
                projectaddress,
                projectcity,
                projectinquiry,
                clienttype: {
                    residential,
                    commercial,
                    mixeduse,
                    publicagency,

                },
                services: {
                    investigation,
                    planreview,
                    compactiontesting,
                    foundationdesign,
                    pavementdesign,
                    specialinspection,
                    retainingwall,
                    foundationinspection

                },

                preferredContact,
                message,
                captchaToken
            };

            console.log(values)

            const response = await SaveContactUs(values);
            console.log(response)
            const created = new Date(response.created).toLocaleTimeString();
            const messagecreated = `${response.message} ${created}`
            this.setState({
                messagecreated: messagecreated || 'Message sent successfully'
            });

        } catch (err) {
            console.error('save contact us error:', err);
            alert('Unable to send message. Please try again.');
        }
    }






    render() {

        const geotech = new Geotech();
        const styles = MyStylesheet();
        const bulletWidth = { width: '2.5em' }
        const regularFont = geotech.getRegularFont.call(this)
        const buttonWidth = { width: '3em' }
        const addLeftMargin = { marginLeft: '3em' }
        const areaHeight = this.state.width > 768 ? { minHeight: '6em' } : { minHeight: '10em' }
        const submitWidth = { width: '100%', maxWidth: '10rem' }
        const getFlex = this.state.width > 768 ? styles.flex5 : styles.flex2

        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Contact Us</span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.padding15 }}>
                <span style={{ ...regularFont }}>Tell us about your project and we’ll take it from there..</span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.marginLeft15 }}>


                {this.showTextFields()}


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Preferred Contact Method:</span>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <button
                        onClick={() => { this.setPreferredContact("email") }}
                        style={{ ...styles.generalButton, ...buttonWidth }}>{this.getPreferredContactBox("email")}</button><span style={{ ...regularFont }}>By Email</span>
                    <button
                        onClick={() => { this.setPreferredContact("phonenumber") }}
                        style={{ ...styles.generalButton, ...buttonWidth, ...addLeftMargin }}>{this.getPreferredContactBox("phonenumber")}</button><span style={{ ...regularFont }}>By Phone</span>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <button onClick={() => { this.toggleField("projectinquiry") }}
                        style={{ ...styles.generalButton, ...buttonWidth }}>{this.getCheckboxIcon("projectinquiry")}</button><span style={{ ...regularFont }}>Create New Project Inquiry</span>
                </div>

                {this.showProjectForm()}



                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Message</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <textarea style={{ ...regularFont, ...styles.generalFont, ...styles.generalField, ...areaHeight }}
                        value={this.getField("message")}
                        onChange={event => { this.setField("message", event.target.value) }} >

                    </textarea>
                </div>


                <div
                    id="turnstile-container"
                    style={{ marginBottom: "15px", textAlign: "center" }}
                ></div>



                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...getFlex }}>
                        &nbsp;
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button
                            style={{
                                ...styles.generalButton, ...submitWidth, opacity: this.state.captchaToken ? 1 : 0.5,
                                cursor: this.state.captchaToken ? "pointer" : "not-allowed"
                            }}
                            disabled={!this.state.captchaToken}
                            onClick={() => { this.saveContactUs() }}>
                            {submitButton()}
                        </button>
                    </div>
                </div>

                 <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>{this.state.messagecreated}  </span>
                </div>



                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Have a question or starting a project? Send us a message and we’ll follow </span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Contact Form (primary) </span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <a href={`mailTo:mazen@civilengineer.io`} style={{ ...regularFont, ...styles.boldFont, ...styles.generalLink }}>Email: mazen@civilengineer.io </a>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>Phone Number: Phone consultations available upon request.  </span>
                </div>








            </div>






        </div>)
    }
}
export default Contact