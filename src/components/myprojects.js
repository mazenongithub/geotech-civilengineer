import React, { Component } from "react";
import { MyStylesheet } from "./styles";
import Geotech from "./geotech";
import * as actions from './actions';
import { connect } from 'react-redux';
import MakeID from "./makeid";
import { SaveProjects } from "./actions/api";
import { gotoIcon, activeIcon, deleteIcon, saveProjectsIcon, saveProfileIcon } from "./svg";
import { Link } from "react-router-dom"
class MyProjects extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '', activeprojectid: null }
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

    getProjectValue(prop) {
        const geotech = new Geotech();
        const projectId = this.state.activeprojectid;
        if (!projectId) return "";

        const project = geotech.getProjectByID.call(this, projectId);
        return project?.[prop] ?? "";
    }

    showProjectIDs() {
        const geotech = new Geotech();
        const projects = geotech.getProjects.call(this);

        if (!projects) return [];

        return projects.map(project => this.showProjectID(project));
    }

    makeProjectActive(projectid) {
        this.setState(prevState => ({
            activeprojectid:
                prevState.activeprojectid === projectid
                    ? null
                    : projectid
        }));
    }

    showActiveProject() {
        const activeIconWidth = { width: '48px' }
        const geotech = new Geotech();
        const styles = MyStylesheet();

        const projectid = this.state.activeprojectid

        const regularFont = geotech.getRegularFont.call(this)
        if (projectid) {
            const project = geotech.getProjectByID.call(this, projectid)
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <button style={{ ...styles.generalButton, ...activeIconWidth }} onClick={() => { this.makeProjectActive('') }}>{activeIcon()}</button>
                <span style={{ ...regularFont }}>Active Project is {project.title} </span>
            </div>)

        }
    }

    showProjectID(project) {
        const geotech = new Geotech();
        const styles = MyStylesheet();
        const user = geotech.getUser.call(this)

        const regularFont = geotech.getRegularFont.call(this)
        const gotoIconWidth = { width: '91px' }
        const deleteIconWidth = { width: '30px' }

        const activeBackground = (project) => {
            return project.projectid === this.state.activeprojectid
                ? { backgroundColor: '#F2B1B6' }
                : {};
        };

        if (user) {

            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin30 }}>



                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont, ...activeBackground(project) }} onClick={() => { this.makeProjectActive(project.projectid) }}>{project.title} {project.projectaddress} {project.projectcity} {project.projectapn}</span>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                        <Link style={{ ...styles.generalLink }} to={`/projects/${user.clientid}/${project.projectid}`}> <span style={{ ...regularFont }}>Go to Project</span>
                            <button style={{ ...styles.generalButton, ...gotoIconWidth }}>
                                {gotoIcon()}
                            </button>
                        </Link>

                    </div>

                    <div style={{ ...styles.flex1 }}>

                        <span style={{ ...regularFont }}>Delete Project</span>
                        <button style={{ ...styles.generalButton, ...deleteIconWidth }} onClick={() => { this.deleteProject(project.projectid) }}>
                            {deleteIcon()}
                        </button>

                    </div>
                </div>


            </div>)

        }


    }

    setProjectValue(prop, value) {
        const geotech = new Geotech();
        const makeid = new MakeID()
        const projectId = this.state.activeprojectid;

        const projects = geotech.getProjects.call(this) || [];

        let updatedProjects;

        // CREATE NEW PROJECT
        if (!projectId) {
            const user = geotech.getUser.call(this);
            const newId = makeid.projectID.call(this);

            const newProject = {
                projectid: newId,
                projectnumber: "",
                series: "",
                title: "",
                sow: "",
                clientid: user?._id || "",
                engineerid: "",
                projectaddress: "",
                projectcity: "",
                projectapn: "",
                [prop]: value
            };

            updatedProjects = [...projects, newProject];

            // update redux
            this.props.reduxProjects(updatedProjects);

            // update state to trigger rerender
            this.setState({ activeprojectid: newId });

            return;
        }

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

    deleteProject(projectid) {
        const geotech = new Geotech();
        const projects = geotech.getProjects.call(this) || [];

        const index = geotech.getProjectKeyByID.call(this, projectid);
        if (index === null || index === -1) return;

        const updatedProjects = projects.filter(
            project => project.projectid !== projectid
        );

        this.props.reduxProjects(updatedProjects);

        this.setState({ activeprojectid: null });
    }

    async saveprojects() {
        const geotech = new Geotech();

        try {
            const projects = geotech.getProjects.call(this) || [];
            const user = geotech.getUser.call(this);

            if (!user?._id) {
                throw new Error("User not loaded");
            }

            const response = await SaveProjects(user._id, { projects });

            if (response?.projects) {
                this.props.reduxProjects(response.projects)
            }

            if (response?.message) {
                this.setState({ message: response.message });
            }

        } catch (err) {
            console.error("Error saving projects:", err);
            alert(`Error Saving Projects: ${err.message || err}`);
        }
    }

    getActiveMessage() {
        if (this.state.activeprojectid) {
            const geotech = new Geotech();
            const project = geotech.getProjectByID.call(this, this.state.activeprojectid)
            return (`Project ${project.title}, is active, when you are done editing, press save, touch again when finished.`)
        } else {
            return ('To edit a project, touch a projectID to make active. Touch again when finished.')
        }
    }

    render() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const headerFont = geotech.getHeaderFont.call(this)
        const regularFont = geotech.getRegularFont.call(this)
        const myuser = geotech.getUser.call(this)
        const saveIconWidth = this.state.width > 768 ? { width: '200px' } : { width: '150px' }
        if (myuser) {
            return (<div style={{ ...styles.generalContainer, ...styles.marginLeft15 }}>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link to={`/projects/${myuser.clientid}`} style={{ ...headerFont, ...styles.boldFont, ...styles.generalLink }}>/Projects</Link>
                </div>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont }}>To create a project simply begin typing in one of the fields</span>
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
                    <button style={{ ...styles.generalButton, ...saveIconWidth }} onClick={() => { this.saveprojects() }}>{saveProjectsIcon()}</button>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>{this.state.message}</span>
                </div>


                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}><u>My Projects</u></span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>{this.getActiveMessage()}</span>
                </div>

                {this.showActiveProject()}

                {this.showProjectIDs()}






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

export default connect(mapStateToProps, actions)(MyProjects);