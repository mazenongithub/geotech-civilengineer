import React, { Component } from 'react';
import Geotech from './geotech'
import { MyStylesheet } from "./styles";
import { redCheckBox, unCheckedBox, newClient } from './svg';


class Register {

    getCheckBox() {
       if(this.state.status === 'register') {
        return(redCheckBox())
       } else {
        return(unCheckedBox())
       }
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
        if (this.state.status === 'register') {
            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                        value={this.state.clientid}
                        onChange={event => { this.setState({ clientid: event.target.value }) }} />
                </div>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>ClientID / {this.state.clientid}</span>
                </div>
                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>{this.state.register}</span>
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
        const buttonWidth = {width:'50%', maxWidth:'175px'}

        if (this.state.status === 'register') {

            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>

                    <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { register.toggleRegister.call(this) }}>{register.getCheckBox.call(this)}</button>
                    <span style={{ ...regularFont }}>Register New Account by Creating a ClientID and selecting NewClient</span>

                </div>

                {register.showClientID.call(this)}

                <div style={{...styles.generalContainer, ...styles.positionRight}}>
                    <button onClick={()=>{this.createClient()}} style={{...buttonWidth}} className={`generalButton`}>{newClient()}</button>
                </div>


            </div>

            )

        }
    }
}

export default Register;