import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link } from 'react-router-dom';
import { formatDate } from './functions'
import { gotoIcon } from './svg';


class Borings extends Component {

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

    showBorings() {
        const geotech = new Geotech();
        const { projectid } = this.props.match.params;

        const borings = geotech.getBorings.call(this, projectid) || [];

        return borings.map(boring => this.showBoring(boring));
    }

    showBoring(boring) {
        const styles = MyStylesheet();
        const geotech = new Geotech();

        const user = geotech.getUser.call(this);
        const { projectid } = this.props.match.params;
        const project = geotech.getProjectByID.call(this, projectid);

        if (!user || !project || !boring) return null;

        const headerFont = geotech.getHeaderFont.call(this);
        const regularFont = geotech.getRegularFont.call(this);

        const gotoIconWidth = { width: '91px' };

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <Link
                    to={`/projects/${user.clientid}/${project.projectid}/borings/${boring.boringid}`}
                    style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}
                >
                    <span>
                        Boring Number {boring.boringnumber} Date Drilled {formatDate(boring.datedrilled)}
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
                        to={`/projects/${user.clientid}/${project.projectid}/borings`}>
                        /Borings
                    </Link>
                </div>

                {this.showBorings()}



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
export default connect(mapStateToProps, actions)(Borings)