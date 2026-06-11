import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { formatDate } from './functions'
import {GetPaymentStatus} from './actions/api'

class Payments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render: '', width: 0, height: 0, message: '', status:null, success:null, amount:null
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }


  async componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();

    const params = new URLSearchParams(
      window.location.search
    );
    const paymentIntentId = params.get("payment_intent")
    this.getPaymentStatus(paymentIntentId)


  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async getPaymentStatus(paymentIntentId) {
    try {

      const payment =
        await GetPaymentStatus(
          paymentIntentId
        );

      this.setState({status:payment.status, success:payment.success, amount:payment.amount})

    } catch (error) {

      console.error(error);

      this.setState({
        message: error.message
      });
    }
  }

   showMessage() {
     const styles = MyStylesheet();
     const geotech = new Geotech();
     const regularFont = geotech.getRegularFont.call(this)
     const amount = () => {
      return((Number(this.state.amount)/100).toFixed(2))
     }
     

     if(this.state.status === 'succeeded') {

      return(
      
      <div style={{...styles.generalContainer, ...styles.bottomMargin10, ...styles.generalFont, ...styles.alignCenter}}>

        <span style={{...regularFont}}>Your payment for the amount of ${amount()} has been approved and applied to the balance of the invoice. </span>
      </div>)
     }
    
      
    }


  render() {
    const styles = MyStylesheet();
    const geotech = new Geotech();
    const { projectid, invoiceid } = this.props.match.params;

    const user = geotech.getUser.call(this);
    const project = geotech.getProjectByID.call(this, projectid);
    const invoice = geotech.getInvoiceByID.call(this, projectid, invoiceid);

    const headerFont = geotech.getHeaderFont.call(this);
    const regularFont = geotech.getRegularFont.call(this)

    // 🔥 Prevent crashes on refresh/loading
    if (!user || !project) {
      return (
        <div style={styles.generalContainer}>
          Loading...
        </div>
      );
    }

    // 🔥 Invoice guard
    if (!invoice) {
      return (
        <div style={styles.generalContainer}>
          <span style={styles.generalFont}>
            Invoice Not Found
          </span>
        </div>
      );
    }

    const linkStyle = {
      ...styles.generalFont,
      ...headerFont,
      ...styles.generalLink,
      ...styles.boldFont
    };

    const rowStyle = {
      ...styles.generalContainer,
      ...styles.alignCenter,
      ...styles.bottomMargin15
    };


   

    return (
      <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>



        <div style={rowStyle}>
          <Link
            style={linkStyle}
            to={`/projects/${user.clientid}`}
          >
            /Projects
          </Link>
        </div>

        <div style={rowStyle}>
          <Link
            style={linkStyle}
            to={`/projects/${user.clientid}/${project.projectid}`}
          >
            /{project.title}
          </Link>
        </div>

        <div style={rowStyle}>
          <Link
            style={linkStyle}
            to={`/projects/${user.clientid}/${project.projectid}/invoices`}
          >
            /Invoices
          </Link>
        </div>

        <div style={rowStyle}>
          <Link
            style={linkStyle}
            to={`/projects/${user.clientid}/${project.projectid}/invoices/${invoiceid}`}
          >
            /{formatDate(invoice.dateinvoice)}
          </Link>
        </div>

        <div style={rowStyle}>
          <Link
            style={linkStyle}
            to={`/projects/${user.clientid}/${project.projectid}/invoices/${invoiceid}/payments`}
          >
            /Payments
          </Link>
        </div>

        {this.showMessage()}

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    myuser: state.myuser,
    projects: state.projects,
  }
}
export default connect(mapStateToProps, actions)(Payments)