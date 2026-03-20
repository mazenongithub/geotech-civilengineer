import React, { Component } from 'react';
import Geotech from './geotech'
import { MyStylesheet } from "./styles";
import { redCheckBox, unCheckedBox } from './svg';
class Register {

    getCheckBox() {
        const { register } = this.state;
        return register ? redCheckBox() : unCheckedBox();
    }

    toggleRegister() {
        this.setState(prev => ({
            register: !prev.register,
            clientid: prev.register ? "" : prev.clientid
        }));
    }

    showClientID() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        if (this.state.register) {
            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont }} 
                    value={this.state.clientid}
                    onChange={event=>{this.setState({clientid:event.target.value})}}/>
                </div>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{  ...regularFont }}>ClientID</span> 
                </div>
                 <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                    <span style={{  ...regularFont }}>To register create a ClientID and then login for the first time with apple or google.</span> 
                </div>



            </div>)
        }
    }


    showRegister() {

        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const registerIcon = this.state.width > 768 ? { width: '60px' } : { width: '45px' }
        const register = new Register();

        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>

                <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { register.toggleRegister.call(this) }}>{register.getCheckBox.call(this)}</button>
                <span style={{ ...regularFont }}>Register New Account</span>

            </div>

            {register.showClientID.call(this)}


        </div>)

    }
}

export default Register;