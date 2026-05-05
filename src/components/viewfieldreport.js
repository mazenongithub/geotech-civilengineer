import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import { Link } from 'react-router-dom';
import Geotech from './geotech';
import { formatDate, milestoneformatdatestring } from './functions'
import CompactionTable from './compactiontable';
class ViewFieldReport extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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
   getFieldReport() {
    const geotech = new Geotech();
    const { projectid, fieldid } = this.props.match.params;

    return geotech.getFieldReportById.call(this, projectid, fieldid) ?? null;
}

    compactionReport() {
        const geotech = new Geotech();
        const { projectid, fieldid } = this.props.match.params;

        const fieldReport = geotech.getFieldReportById.call(this, projectid, fieldid);

        return Array.isArray(fieldReport?.compactiontests)
            ? fieldReport
            : false;
    }

    showcompactioncurves() {
        let curves = this.getCompactionCurves();
        let showcurves = [];
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const regularFont = geotech.getRegularFont.call(this)
        const compactiontests = this.getCompactionTests()
        const title = () => {
            return (
                <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                        <span style={{ ...regularFont }}>
                            Curve No.
                        </span>
                    </div>
                    <div style={{ ...styles.flex3, ...styles.alignCenter, ...styles.showBorder }}>
                        <span style={{ ...regularFont }}>
                            Description
                        </span>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                        <span style={{ ...regularFont }}>
                            Max. Density (p.c.f)
                        </span>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                        <span style={{ ...regularFont }}>
                            Moisture %
                        </span>
                    </div>

                </div>
            )

        }
        if (compactiontests.length > 0) {
            showcurves.push(title())
            // eslint-disable-next-line
            curves.map(curve => {
                showcurves.push(

                    <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span style={{ ...regularFont }}>
                                {curve.curvenumber}
                            </span>
                        </div>
                        <div style={{ ...styles.flex3, ...styles.alignCenter, ...styles.showBorder }}>
                            <span style={{ ...regularFont }}>
                                {curve.description}
                            </span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span style={{ ...regularFont }}>
                                {curve.maxden}
                            </span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.showBorder }}>
                            <span style={{ ...regularFont }}>
                                {curve.moist}%
                            </span>
                        </div>

                    </div>

                )
            })


        }
        return showcurves;

    }

    getCompactionCurves() {
        const geotech = new Geotech();
        const { projectid } = this.props.match.params;

        const project = geotech.getProjectByID.call(this, projectid);
        if (!project || !this.compactionReport()) return [];

        const allCurves = geotech.getcurves.call(this, projectid);

        // Ensure we have a valid array before doing anything
        if (!Array.isArray(allCurves)) return [];

        return allCurves
            .sort((a, b) => Number(a.curvenumber) - Number(b.curvenumber));
    }




    getCompactionTests() {
        const geotech = new Geotech();
        const { projectid, fieldid } = this.props.match.params;

        const compactiontests = geotech.getcompactiontestsbyfieldid.call(this, projectid, fieldid)
      
        if (compactiontests) {
            compactiontests.sort((a, b) => {
                if (Number(a.testnum) >= Number(b.testnum)) {
                    return 1;
                } else {
                    return -1
                }
            })

        }

        return compactiontests;
    }

    getcurvenumber(curveid) {
        const geotech = new Geotech();
        let curvenumber = '';
        const { projectid } = this.props.match.params;
        let curve = geotech.getcurvebyid.call(this, projectid, curveid)
        if (curve) {
            curvenumber = curve.curvenumber;
        }
        return curvenumber;

    }

    showCompactionTests() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        let table = [];
        const regularFont = geotech.getRegularFont.call(this)
        const title = () => {
            return (
                <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Test No.
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        El.
                    </div>
                    <div style={{ ...styles.flex3, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Location
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Wet Den. (p.c.f)
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Moisture (p.c.f)
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Dry Den. (p.c.f)
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Moisture %
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Max Den. (p.c.f)
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Relative %
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                        Curve No.
                    </div>
                </div>
            )


        }
        const tests = this.getCompactionTests();
        if (tests.length > 0) {

            table.push(title())
            // eslint-disable-next-line
            tests.map(test => {

                table.push(


                    <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.testnum}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.elevation}
                        </div>
                        <div style={{ ...styles.flex3, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.location}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.wetpcf}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.moistpcf}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.dryden}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.moist}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.maxden}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {test.relative}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.showBorder }}>
                            {this.getcurvenumber(test.curveid)}
                        </div>
                    </div>

                )
            })

        }
        return table;
    }

    getReport() {
        const geotech = new Geotech();
        const { projectid, fieldid } = this.props.match.params;
        let report = false;
        report = geotech.getFieldReportById.call(this, projectid, fieldid);
        return report;
    }

    getfieldimages() {
        const { projectid, fieldid } = this.props.match.params;
        const geotech = new Geotech();
        const fieldimages = geotech.getimagesbyfieldid.call(this, projectid, fieldid);

        return fieldimages;

    }

    showfieldimages() {
        const fieldimages = this.getfieldimages()
        let images = [];
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this)

        if (fieldimages.length > 0) {

            // eslint-disable-next-line
            fieldimages.map(fieldimage => {
                images.push(
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} key={fieldimage.imageid}>
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <img style={{...styles.width33}} src={`${process.env.REACT_APP_SERVER_API}${fieldimage.image}`} alt={fieldimage.caption} />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <span style={{ ...regularFont }}>{fieldimage.caption}</span>
                        </div>
                    </div>


                )
            })
        }
        return images;

    }

    render() {
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const projectid = this.props.match.params.projectid;
        const project = geotech.getProjectByID.call(this, projectid)
        const engineerid = this.props.match.params.engineerid;
        const headerFont = geotech.getHeaderFont.call(this)
        const regularFont = geotech.getRegularFont.call(this);
        const fieldid = this.props.match.params.fieldid;
        const report = this.getFieldReport();
        const compactiontable = new CompactionTable();

        if (project) {

            if (report) {

                const datereport = milestoneformatdatestring(report.datereport)

                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link
                            style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                            to={`/${engineerid}/profile`}>
                            /{engineerid}
                        </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link
                            style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                            to={`/${engineerid}/projects`}>
                            /projects
                        </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link
                            style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                            to={`/${engineerid}/projects/${projectid}`}>
                            /{project.projectnumber} - {project.title} {project.address} {project.city}
                        </Link>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link
                            style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                            to={`/${engineerid}/projects/${projectid}/fieldreports`}>
                            /fieldreports
                        </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <Link
                            style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont }}
                            to={`/${engineerid}/projects/${projectid}/fieldreports/${fieldid}`}>
                            /{formatDate(datereport)}
                        </Link>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            {report.content}
                        </span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        {this.showcompactioncurves()}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        {compactiontable.showCompactionTable.call(this)}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        {this.showfieldimages()}
                    </div>

                </div>)

            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Report Not Found</span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found</span>
            </div>)
        }
    }


}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects,
    }
}
export default connect(mapStateToProps, actions)(ViewFieldReport)