import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { formatDate, formatTime, calculateHours, calculateCost, calculateLaborCost } from './functions'
import { gotoIcon, payNow } from './svg';


class ViewInvoice extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    async componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    showLineItems() {
        const { projectid, invoiceid } = this.props.match.params;

        const geotech = new Geotech();

        return (
            geotech.getInvoiceLineItems.call(this, projectid, invoiceid) ?? []
        ).map(item => {
            switch (item.type) {
                case 'labor':
                    return this.showlaborid(item);

                case 'cost':
                    return this.showcostid(item);

                default:
                    return null;
            }
        });
    }



    showlaborid(labor) {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const iconWidth = { width: '54px' }

        if (this.state.width > 768) {

            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>

                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}>
                        {formatDate(labor.timein)}
                    </span>

                </div>
                <div style={{ ...styles.flex3 }}>

                    <span style={{ ...regularFont }}>
                        {labor.description}
                    </span>

                </div>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}> {calculateHours(labor.timein, labor.timeout)} hr(s) @ ${labor.laborrate}/hr</span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}> ${calculateLaborCost(labor.timein, labor.timeout, labor.laborrate)}</span>

                </div>
            </div>)
        } else {
           return( <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>
                        {formatDate(labor.timein)}
                    </span>

                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>
                        {labor.description}
                    </span>

                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...regularFont }}> {calculateHours(labor.timein, labor.timeout)} hr(s) @ ${labor.laborrate}/hr</span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...regularFont }}> ${calculateLaborCost(labor.timein, labor.timeout, labor.laborrate)}</span>
                    </div>
                </div>

            </div>)

        }






    }

    showcostid(cost) {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)
        const iconWidth = { width: '54px' }

            if (this.state.width > 768) {

            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>

                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}>
                        {formatDate(cost.datein)}
                    </span>

                </div>
                <div style={{ ...styles.flex3 }}>

                    <span style={{ ...regularFont }}>
                       {cost.description}
                    </span>

                </div>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}>{cost.quantity} {cost.unit} @ ${cost.unitcost}/{cost.unit} </span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}> ${calculateCost(cost.quantity, cost.unitcost)} </span>

                </div>
            </div>)
        } else {
           return( <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>
                       {formatDate(cost.datein)}
                    </span>

                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>
                       {cost.description}
                    </span>

                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...regularFont }}>{cost.quantity} {cost.unit} @ ${cost.unitcost}/{cost.unit} </span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...regularFont }}>  ${calculateCost(cost.quantity, cost.unitcost)}</span>
                    </div>
                </div>

            </div>)

        }




    }

    getInvoiceTotal() {
        const geotech = new Geotech();
        const { projectid, invoiceid } = this.props.match.params;

        const lineitems =
            geotech.getInvoiceLineItems.call(this, projectid, invoiceid) ?? [];

        let total = 0;

        lineitems.forEach(item => {

            // 🔥 Labor
            if (item.type === 'labor') {
                total += calculateLaborCost(
                    item.timein,
                    item.timeout,
                    item.laborrate
                );
            }

            // 🔥 Cost
            if (item.type === 'cost') {
                total += calculateCost(
                    item.quantity,
                    item.unitcost
                );
            }

        });

        return Number(total.toFixed(2));
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

        const buttonWidth = { width: '180px' }

        return (
            <div style={{ ...styles.generalContainer, ...styles.marginLeft15 }}>

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

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>Invoice for Geotechnical Services</span>
                </div>

                {this.showLineItems()}

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>Please submit payment for the total amount of: ${this.getInvoiceTotal()}</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }}>{payNow()}</button>
                </div>

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
export default connect(mapStateToProps, actions)(ViewInvoice)