import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { formatDate } from './functions'
import { gotoIcon } from './svg';


class Invoices extends Component {

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

    showInvoices() {
        const geotech = new Geotech();
        const { projectid } = this.props.match.params;

        const invoices = geotech.getInvoices.call(this, projectid) || [];

        return invoices.map(invoice => this.showFieldReport(invoice));
    }

    showFieldReport(invoice) {
        const styles = MyStylesheet();
        const geotech = new Geotech();

        const user = geotech.getUser.call(this);
        const { projectid } = this.props.match.params;
        const project = geotech.getProjectByID.call(this, projectid);

        if (!user || !project || !invoice) return null;

        const headerFont = geotech.getHeaderFont.call(this);
        const regularFont = geotech.getRegularFont.call(this);

        const gotoIconWidth = { width: '91px' };

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <Link
                    to={`/projects/${user.clientid}/${project.projectid}/invoices/${invoice.invoiceid}`}
                    style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}
                >
                    <span>
                        Invoice Date {formatDate(invoice.dateinvoice)}
                    </span>

                    <button style={{ ...styles.generalButton, ...gotoIconWidth }}>
                        {gotoIcon()}
                    </button>
                </Link>
            </div>
        );
    }




    render() {
        const styles = MyStylesheet();
        const geotech = new Geotech();

        const user = geotech.getUser.call(this);
        const { projectid } = this.props.match.params;

        const project = geotech.getProjectByID.call(this, projectid);


        if (!user || !project) {
            return <div style={styles.generalContainer}>Loading...</div>;
        }

        const headerFont = geotech.getHeaderFont.call(this);

        return (
            <div style={{ ...styles.generalContainer, ...styles.marginLeft15 }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                        to={`/projects/${user.clientid}`}>
                        /Projects
                    </Link>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                        to={`/projects/${user.clientid}/${project.projectid}`}>
                        /{project.title}
                    </Link>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                        to={`/projects/${user.clientid}/${project.projectid}/invoices`}>
                        /Invoices
                    </Link>
                </div>

                {this.showInvoices()}



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
export default connect(mapStateToProps, actions)(Invoices)