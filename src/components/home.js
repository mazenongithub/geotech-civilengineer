import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { rightArrow, triangleBullet } from './svg';
import { Link } from 'react-router-dom';

class Home extends Component {

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
        const headerFont = geotech.getHeaderFont.call(this)
        const buttonWidth = {width:'8em'}
        return (
        <div style={{ ...styles.generalContainer, ...styles.padding15 }}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>Welcome to https://geotech.civilengineer.io, your all-in-one platform for managing geotechnical projects across California. Designed for contractors, developers, and property owners, our app makes tracking inspections, accessing reports, and collaborating with your geotechnical engineer simple and efficient.</span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...regularFont }}>With this app, you can oversee every stage of your project—from site assessments and soil tests to foundation inspections and final reports—all in one secure dashboard. Whether you’re managing a single site or multiple projects, Geotech gives you full visibility and control without the hassle of emails or paperwork</span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                <button style={{ ...styles.generalButton, ...bulletWidth }}>{triangleBullet()}</button> <span style={{ ...headerFont }}>How It Works</span>
            </div>
            <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                <span style={{...regularFont}}>Manage Your Projects in 3 Simple Steps:</span>
            </div>

            <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15}}>
                <span style={{...regularFont}}>Step 1: Add Your Project</span>
            </div>
             <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15, ...styles.bottomMargin15}}>
                <span style={{...regularFont}}>Sign up and create your project dashboard in minutes. Add your site details and get started right away.</span>
            </div>

            <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15}}>
                <span style={{...regularFont}}>Step 2: Track Inspections & Reports</span>
            </div>
             <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15, ...styles.bottomMargin15}}>
                <span style={{...regularFont}}>All your geotechnical data—from soil tests to foundation inspections—is stored securely and accessible anytime.</span>
            </div>

            <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15}}>
                <span style={{...regularFont}}>Step 3: Collaborate & Approve</span>
            </div>
             <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.marginLeft15, ...styles.bottomMargin15}}>
                <span style={{...regularFont}}>All your geotechnical data—from soil tests to foundation inspections—is stored securely and accessible anytime.</span>
            </div>

            <div style={{...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont}}>
                <div style={{...styles.flex2, ...styles.positionRight}}>
                    <span style={{...headerFont}}>Get Started and Register</span>
                </div>
                 <div style={{...styles.flex1, ...styles.marginLeft15}}>
                    <button style={{...styles.generalButton, ...buttonWidth}}>{rightArrow()}</button>
                </div>
            </div>

             <div style={{...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont}}>
                <div style={{...styles.flex2, ...styles.positionRight}}>
                    <span style={{...headerFont}}>Login</span>
                </div>
                 <div style={{...styles.flex1, ...styles.marginLeft15}}>
                    <Link to="/login"><button style={{...styles.generalButton, ...buttonWidth}}>{rightArrow()}</button> </Link>
                </div>
            </div>

             <div style={{...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont}}>
                <div style={{...styles.flex2, ...styles.positionRight}}>
                    <span style={{...headerFont}}>Contact</span>
                </div>
                 <div style={{...styles.flex1, ...styles.marginLeft15}}>
                    <Link to="/contact"><button style={{...styles.generalButton, ...buttonWidth}}>{rightArrow()}</button></Link>
                </div>
            </div>

        </div>)
    }
}
export default Home