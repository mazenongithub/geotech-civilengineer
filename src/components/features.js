import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { triangleBullet } from './svg';

class Features extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 0, height: 0
        };



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



    render() {
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const bulletWidth = { width: '2.5em' }
        const regularFont = geotech.getRegularFont.call(this)
        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Features</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.padding15 }}>
                <span style={{ ...regularFont }}>A secure, centralized portal for managing geotechnical and civil engineering projects—create projects, approve proposals and schedules, access reports and soil data, receive approval letters, and manage invoicing, all in one place.</span>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Project Management</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>Create and manage projects from start to finish in one place</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>Create new projects with site details</li>
                    <li style={{ ...regularFont }}>Track project status in real time</li>
                    <li style={{ ...regularFont }}>Centralized communication and documentation</li>
                </ul>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Proposals & Approvals</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>No more email chains or lost PDFs.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>Review and approve proposals online</li>
                    <li style={{ ...regularFont }}>Digital acceptance with timestamped records</li>
                    <li style={{ ...regularFont }}>Version history for transparency</li>
                </ul>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Schedule Review & Approval</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>Stay aligned on timelines.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>View proposed schedules</li>
                    <li style={{ ...regularFont }}>Approve or request changes</li>
                    <li style={{ ...regularFont }}>Automatic updates when schedules change</li>
                </ul>
            </div>


             <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Engineering Reports & Deliverables</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>All final documents, organized and accessible.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>Geotechnical reports</li>
                    <li style={{ ...regularFont }}>Design calculations</li>
                    <li style={{ ...regularFont }}>Approval letters</li>
                    <li style={{ ...regularFont }}>Plan review responses</li>
                    <li style={{ ...regularFont }}>Download anytime in PDF format</li>
                </ul>
            </div>


              <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Soil Laboratory Results & Logs</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>Direct access to subsurface data.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>Boring logs</li>
                    <li style={{ ...regularFont }}>Lab test results</li>
                    <li style={{ ...regularFont }}>Soil classifications</li>
                    <li style={{ ...regularFont }}>Clearly organized by project and location</li>
                </ul>
            </div>


             <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Invoicing & Payments</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>Fast, simple, and transparent billing.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>View invoices by project</li>
                    <li style={{ ...regularFont }}>Secure online payments</li>
                    <li style={{ ...regularFont }}>Payment history and receipts</li>
                    <li style={{ ...regularFont }}>No paper invoices or checks required</li>
                </ul>
            </div>


             <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Notifications & Updates</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingTop15, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <span style={{ ...regularFont }}>Never miss an important action.</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <ul>
                    <li style={{ ...regularFont }}>Email notifications for approvals and uploads</li>
                    <li style={{ ...regularFont }}>Alerts when documents are ready</li>
                    <li style={{ ...regularFont }}>Status change notifications</li>
                </ul>
            </div>


             <div style={{ ...styles.generalContainer, ...styles.generalFont, }}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Why Clients Love It</span>
            </div>
           
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.paddingLeft15, ...styles.paddingRight15 }}>
                <ul>
                    <li style={{ ...regularFont }}>One portal for everything</li>
                    <li style={{ ...regularFont }}>Faster approvals and turnaround</li>
                    <li style={{ ...regularFont }}>Clear documentation and records</li>
                    <li style={{ ...regularFont }}>Secure, professional, and reliable</li>
                </ul>
            </div>


        </div>)
    }
}
export default Features