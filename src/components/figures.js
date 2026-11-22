
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { GFK } from './actions/types';

class Figures extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, }
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

    // ----------------------------------------
    // GET PROJECT FIGURES
    // ----------------------------------------

    getProjectFigures() {
        const geotech = new Geotech();
        const { projectid } = this.props.match.params;

        return geotech.getFiguresByProjectID.call(
            this,
            projectid
        ) || [];
    }

    // ----------------------------------------
    // GET FIGURE DOCUMENT URL
    // ----------------------------------------

    getFigureURL(figureid) {
        const { projectid } = this.props.match.params;

        const geotech = new Geotech();
        const user = geotech.getUser.call(this);

        if (!user?.clientid || !projectid || !figureid) {
            return null;
        }

        return `/projects/${encodeURIComponent(user.clientid)}/${encodeURIComponent(projectid)}/figures/${encodeURIComponent(figureid)}`;
    }

    // ----------------------------------------
    // SHOW FIGURE IDS
    // ----------------------------------------

    showFigureIDs() {

        const styles = MyStylesheet();
        const geotech = new Geotech();

        const regularFont = geotech.getRegularFont.call(this);

        const figures = this.getProjectFigures();

        return (
            <div style={{
                ...styles.generalContainer,
                ...styles.bottomMargin15
            }}>

                <div style={{
                    ...styles.generalContainer,
                    ...styles.bottomMargin15
                }}>
                    <span style={{
                        ...regularFont,
                        ...styles.boldFont
                    }}>
                        Project Figures ({figures.length})
                    </span>
                </div>

                {figures.length === 0 ? (
                    <div style={regularFont}>
                        No figures available for this project.
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>

                        {figures.map((figure, index) => (

                            <Link
                                key={figure.figureid || index}
                                to={this.getFigureURL(figure.figureid)}
                        
                                rel="noopener noreferrer"
                                style={{
                                    ...regularFont,
                                    ...styles.generalLink,
                                    display: 'inline-block',
                                    padding: '8px 12px',
                                    border: '1px solid #aaa',
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {figure.figuretitle}
                            </Link>

                        ))}

                    </div>
                )}

            </div>
        );
    }

    // ----------------------------------------
    // RENDER
    // ----------------------------------------

    render() {

        const styles = MyStylesheet();
        const geotech = new Geotech();

        const regularFont = geotech.getRegularFont.call(this);
        const headerFont = geotech.getHeaderFont.call(this);

        const { projectid } = this.props.match.params;

        const user = geotech.getUser.call(this);

        if (!user) {
            return (
                <div style={{
                    ...styles.generalContainer,
                    ...styles.alignCenter,
                    ...styles.generalFont
                }}>
                    <span style={regularFont}>
                        User Not Found
                    </span>
                </div>
            );
        }

        const project = geotech.getProjectByID.call(
            this,
            projectid
        );

        if (!project) {
            return (
                <div style={{
                    ...styles.generalContainer,
                    ...styles.alignCenter,
                    ...styles.generalFont
                }}>
                    <span style={regularFont}>
                        Project Not Found
                    </span>
                </div>
            );
        }

        return (
            <div style={{
                ...styles.generalContainer,
                ...styles.generalFont
            }}>

                <div style={{
                    ...styles.generalContainer,
                    ...styles.alignCenter
                }}>
                    <Link
                        style={{
                            ...styles.generalFont,
                            ...headerFont,
                            ...styles.generalLink,
                            ...styles.boldFont
                        }}
                        to={`/projects/${user.clientid}`}
                    >
                        /Projects
                    </Link>
              
                    <Link
                        style={{
                            ...styles.generalFont,
                            ...headerFont,
                            ...styles.generalLink,
                            ...styles.boldFont
                        }}
                        to={`/projects/${user.clientid}/${project.projectid}`}
                    >
                        /{project.title}
                    </Link>
               
                    <Link
                        style={{
                            ...styles.generalFont,
                            ...headerFont,
                            ...styles.generalLink,
                            ...styles.boldFont
                        }}
                        to={`/projects/${user.clientid}/${project.projectid}/figures`}
                    >
                        /Figures
                    </Link>
                </div>

                {this.showFigureIDs()}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects,
        company: state.company
    };
}

export default connect(
    mapStateToProps,
    actions
)(Figures);
