import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { SaveProject } from './actions/api';
import { Route, Switch } from 'react-router-dom';
import { saveProjectsIcon } from "./svg";

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
            console.log("loadproject data")
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

        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
        const headerFont = geotech.getHeaderFont.call(this)
        const regularFont = geotech.getRegularFont.call(this)
        const saveIconWidth = this.state.width > 768 ? { width: '200px' } : { width: '150px' }
        if (user) {
            const { projectid } = this.props.match.params;
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

        return (<div style={{ ...styles.generalContainer }}>
            <Switch>
                <Route exact path={path} render={() => this.showViewProject()} />
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