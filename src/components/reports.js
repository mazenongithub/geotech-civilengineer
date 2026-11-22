import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import { Link } from 'react-router-dom';
import { formatDate } from './functions'
import { gotoIcon} from './svg';
import Geotech from './geotech';


class Reports extends Component {

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

  

    showReports() {
        const geotech = new Geotech();
        const { projectid } = this.props.match.params;

        const reports = geotech.getReportsByProject.call(this, projectid) || [];

        return reports.map(report => this.showReport(report));
    }

    toggleStateActive(reportid) {
        this.setState(prevState => ({
            activereportid:
                prevState.activereportid === reportid
                    ? null
                    : reportid
        }));
    }

 

    showReport(report) {
        const styles = MyStylesheet();
        const geotech = new Geotech();;

        const user = geotech.getUser.call(this)
        const { projectid } = this.props.match.params;
        const project = geotech.getProjectByID.call(this, projectid);




        if (!user || !project || !report) return null;

        const headerFont = geotech.getHeaderFont.call(this);
        const regularFont = geotech.getRegularFont.call(this);

        const gotoIconWidth = { width: '91px' };
    

        return (
        

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <Link
                        to={`/projects/${user.clientid}/${project.projectid}/reports/${report.reportid}`}
                        style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}
                    >
                        <span>
                            {formatDate(report.datereport)}
                        </span>

                        <span style={{ ...styles.marginLeft15}}>{report.reporttitle}</span>

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
        const saveIconWidth = this.state.width > 900 ? { width: '120px' } : { width: '90px' }

        if (!user || !project) {
            return <div style={styles.generalContainer}>Loading...</div>;
        }

        const headerFont = geotech.getHeaderFont.call(this);
        const regularFont = geotech.getRegularFont.call(this)

        return (
            <div style={{ ...styles.generalContainer, ...styles.marginLeft15 }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                        to={`/projects/${user.clientid}`}>
                        /Projects
                    </Link>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter}}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                        to={`/projects/${user.clientid}/${project.projectid}`}>
                        /{project.title}
                    </Link>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link
                        style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.bottomMargin15 }}
                        to={`/projects/${user.clientid}/${project.projectid}/reports`}>
                        /Reports
                    </Link>
                </div>

             

            

                {this.showReports()}



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects
    }
}
export default connect(mapStateToProps, actions)(Reports)