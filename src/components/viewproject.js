import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { SaveProject, LoadProject } from './actions/api';
import { Route, Switch } from 'react-router-dom';
import { saveProjectsIcon } from "./svg";
import Borings from './borings';
import ViewBoring from './viewboring'
import LabSummary from './labsummary'
import FieldReports from './fieldreports'
import ViewFieldReport from './viewfieldreport'
class ViewProject extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    async componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

        const { projects } = this.props;

        // If projects are already loaded (e.g., navigated from Projects page)
        if (projects && projects.length > 0) {
            await this.loadProjectData();
        }


    }
    async componentDidUpdate(prevProps) {

        const prevProjects = Array.isArray(prevProps.projects)
            ? prevProps.projects
            : prevProps.projects?.projects || [];

        const currentProjects = Array.isArray(this.props.projects)
            ? this.props.projects
            : this.props.projects?.projects || [];

        // Debug what’s really happening
        console.log("Prev projects:", prevProjects.length);
        console.log("Current projects:", currentProjects.length);

        // Run when projects just became available
        if (prevProjects.length === 0 && currentProjects.length > 0 && !this.state.project) {
            console.log("✅ Detected projects loaded — calling loadProjectData()");
            await this.loadProjectData();
        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async loadProjectData() {
        const { match, projects, reduxProjects } = this.props;
        const projectid = match.params.projectid;

        try {
            const result = await LoadProject(projectid);
            console.log(result)
            if (!result) return;

            // Normalize projects list in case it’s wrapped in an object
            const allProjects = Array.isArray(projects)
                ? [...projects]
                : projects?.projects
                    ? [...projects.projects]
                    : [];

            // Find the project to update
            const index = allProjects.findIndex(p => p.projectid === projectid);
            if (index === -1) {
                console.warn(`⚠️ Project ${projectid} not found in store`);
                return;
            }

            // Attach borings (already sorted)
            allProjects[index] = {
                ...allProjects[index],
                borings: result.borings,
                fieldreports: result.fieldreports,
                compactioncurves: result.compactioncurves,
                seismic: result.seismic,
                ptslab: result.ptslab,
                slope: result.slope,
                timesheet: result.timesheet
            };

            // Update Redux store or local state
            if (reduxProjects) {
                reduxProjects(allProjects);
            }

            this.setState({
                project: allProjects[index],
                render: 'render',
            });

        } catch (err) {
            console.error("❌ Error loading project:", err);
        }
    }


    getProjectValue(prop) {
        const geotech = new Geotech();
        const projectId = this.props.match.params.projectid;
        if (!projectId) return "";

        const project = geotech.getProjectByID.call(this, projectId);
        return project?.[prop] ?? "";
    }

    setProjectValue(prop, value) {
        const geotech = new Geotech();

        const projectId = this.props.match.params.projectid;

        const projects = geotech.getProjects.call(this) || [];

        let updatedProjects;


        // UPDATE EXISTING PROJECT
        updatedProjects = projects.map(project =>
            project.projectid === projectId
                ? { ...project, [prop]: value }
                : project
        );

        // update redux
        this.props.reduxProjects(updatedProjects);

        // force rerender (if needed)
        this.setState(prev => ({ ...prev }));
    }

    async saveProject() {
        const geotech = new Geotech();

        try {
            const projects = geotech.getProjects.call(this);
            if (!projects) return;

            const { projectid } = this.props.match.params;

            const project = geotech.getProjectByID.call(this, projectid);
            if (!project) throw new Error("Project not found");

            const index = geotech.getProjectKeyByID.call(this, projectid);
            if (index === null) throw new Error("Project index not found");

            const response = await SaveProject(projectid, {
                updatedProject: project
            });

            if (response?.updatedproject) {
                // avoid mutating original array
                const updatedProjects = [...projects];
                updatedProjects[index] = response.updatedproject;

                this.props.reduxProjects(updatedProjects);
            }

            if (response?.message) {
                this.setState({ message: response.message });
            }

        } catch (err) {
            console.error("Error saving project:", err);
            alert(`Error Saving Project: ${err.message || err}`);
        }
    }

    showViewProject() {

        const styles = MyStylesheet();

        const geotech = new Geotech();
        const user = geotech.getUser.call(this)
        const path = this.props.match.path;
        const headerFont = geotech.getHeaderFont.call(this)
        const regularFont = geotech.getRegularFont.call(this)
        const saveIconWidth = this.state.width > 768 ? { width: '200px' } : { width: '150px' }
        if (user) {
            const { projectid, clientid } = this.props.match.params;
            const project = geotech.getProjectByID.call(this, projectid)

            if (project) {
                return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.marginLeft15 }}>

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

                    <div style={{ ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Project Title</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getProjectValue("title")}
                            onChange={event => { this.setProjectValue("title", event.target.value) }} />

                    </div>

                    <div style={{ ...styles.generalFont, ...styles.bottomMargin15, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Project Summary</span>
                    </div>

                    <div style={{ ...styles.generalContainer }}>

                        <textarea

                            value={this.getProjectValue("sow")}
                            onChange={event => { this.setProjectValue("sow", event.target.value) }}
                            placeholder="Write a brief summary of your project..."
                            style={{
                                width: "100%",
                                minHeight: "120px", // ~6 lines
                                maxHeight: "300px", // optional limit
                                resize: "vertical",
                                padding: "8px",
                                fontSize: "18px",
                                lineHeight: 1.5,
                                fontFamily: "'InterVariable', sans-serif",
                            }}
                        />


                    </div>


                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                        <span style={{ ...regularFont }}><u>Location</u></span>
                    </div>


                    <div style={{ ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Address</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getProjectValue("projectaddress")}
                            onChange={event => { this.setProjectValue("projectaddress", event.target.value) }} />

                    </div>


                    <div style={{ ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>City</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getProjectValue("projectcity")}
                            onChange={event => { this.setProjectValue("projectcity", event.target.value) }} />

                    </div>


                    <div style={{ ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont }}>Parcel APN</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getProjectValue("projectapn")}
                            onChange={event => { this.setProjectValue("projectapn", event.target.value) }} />

                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveIconWidth }} onClick={() => { this.saveProject() }}>{saveProjectsIcon()}</button>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont }}>
                        <span style={{ ...regularFont }}>{this.state.message}</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...headerFont }}>Project Components</span>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/borings`}>/Soil Borings Logs</Link>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/geotechnical`}>/Geotechnical Report</Link>
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/technical`}>/Technical Reports</Link>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/labsummary`}>/Lab Summary</Link>
                        </div>
                    </div>

                     <div style={{ ...styles.generalFlex, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/maps`}>/Geologic Maps</Link>
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <Link style={{ ...styles.generalLink, ...headerFont }} to={`/projects/${clientid}/${projectid}/fieldreports`}>/Field Reports</Link>
                        </div>
                    </div>


                </div>

                )

            }

        }

    }


    render() {
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const { match } = this.props;
        const path = match.path;
        const projectid = this.props.match.params.projectid;
        const user = geotech.getUser.call(this)
        const project = geotech.getProjectByID.call(this, projectid);


        if (!user || !project) {
            return <div style={styles.generalContainer}>Loading...</div>;
        }
        return (<div style={{ ...styles.generalContainer }}>
            <Switch>
                <Route exact path={path} render={() => this.showViewProject()} />
                <Route exact path={`${path}/borings`} component={Borings} />
                <Route exact path={`${path}/labsummary`} component={LabSummary} />
                <Route exact path={`${path}/fieldreports`} component={FieldReports} />
                <Route exact path={`${path}/borings/:boringid`} component={ViewBoring} />
                <Route exact path={`${path}/fieldreports/:fieldid`} component={ViewFieldReport} />

            </Switch>
        </div>)


    }






}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects,
    }
}
export default connect(mapStateToProps, actions)(ViewProject)