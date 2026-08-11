import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import Geotech from './geotech';
import { Link, useParams } from 'react-router-dom';
import { formatDate, formatTime, calculateHours, calculateCost, calculateLaborCost, formatDateTime } from './functions'
import { authorize, clickToDownload } from './svg';
import { UpdateProposal, DownloadProposal } from './actions/api';


class ViewProposal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, message: '',
            clientSecret: null,
            loading: true,
        };

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
        const { projectid, proposalid } = this.props.match.params;

        const geotech = new Geotech();

        return (
            geotech.getProposalLineItems.call(this, projectid, proposalid) ?? []
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
            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
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
            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
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

    getProposalTotal() {
        const geotech = new Geotech();
        const { projectid, proposalid } = this.props.match.params;

        const lineitems =
            geotech.getProposalLineItems.call(this, projectid, proposalid) ?? [];

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



    showTotal() {
        const styles = MyStylesheet();
        const geotech = new Geotech();
        const regularFont = geotech.getRegularFont.call(this);

        const total = this.getProposalTotal();

        if (total <= 0) {
            return null;
        }

        return (
            <div
                style={{
                    ...styles.generalContainer,
                    ...styles.bottomMargin15,
                    ...styles.generalFont
                }}
            >
                <span style={regularFont}>
                    Please submit payment for the total amount of: $
                    {total.toFixed(2)}
                </span>
            </div>
        );
    }

    async updateProposal() {

        const geotech = new Geotech();

        const { projectid, proposalid } = this.props.match.params;

        const user = geotech.getUser.call(this);
        const client_id = user._id;

        // Get the proposal
        const proposal = geotech.getProposalByID.call(this, projectid, proposalid);

        if (!proposal) {
            alert("Proposal not found.");
            return;
        }

        // Create an updated copy
        const updatedProposal = {
            ...proposal,
            approvedby: client_id,
            status: "Approved",
            dateapproved: new Date()
        };

        try {

            const response = await UpdateProposal(
                projectid,
                proposalid,
                updatedProposal
            );

            const projects = [...this.props.projects];

            const projectIndex = geotech.getProjectKeyByID.call(this, projectid);
            const proposalIndex = geotech.getProposalIndexByID.call(this, projectid, proposalid);

            if (projectIndex !== null && proposalIndex !== null) {

                projects[projectIndex].schedule.proposals[proposalIndex] = response.proposal;

                this.props.reduxProjects(projects);

                this.setState({
                    render: "render"
                });

            }

        } catch (err) {

            alert(`Could not update proposal: ${err.message}`);

        }

    }

    getProposalValue(field) {
        const geotech = new Geotech();
        const { projectid, proposalid } = this.props.match.params;
        const proposals = geotech.getProposals.call(this, projectid) ?? [];

        const proposal = proposals.find(
            proposal => proposal.proposalid === proposalid
        );

        return proposal ? proposal[field] : null;
    }

    setProposalValue(field, value) {
        const geotech = new Geotech();
        const { projectid, proposalid } = this.props.match.params;

        const projects = [...this.props.projects];
        const projectIndex = projects.findIndex(
            project => project.projectid === projectid
        );

        if (projectIndex === -1) return false;

        const project = { ...projects[projectIndex] };
        const schedule = { ...(project.schedule || {}) };

        if (!Array.isArray(schedule.proposals)) {
            schedule.proposals = [];
        }

        const proposalIndex = schedule.proposals.findIndex(
            proposal => proposal.proposalid === proposalid
        );

        if (proposalIndex === -1) return false;

        schedule.proposals[proposalIndex] = {
            ...schedule.proposals[proposalIndex],
            [field]: value
        };

        project.schedule = schedule;
        projects[projectIndex] = project;

        this.props.reduxProjects(projects);

        this.setState({ render: 'render' })
    }

    getDateApproved() {
        const dateapproved = this.getProposalValue("dateapproved");

        return dateapproved ? `Approved on: ${formatDateTime(dateapproved)}` : "";
    }

    getApprovedBy() {
        const geotech = new Geotech();

        const approvedby = this.getProposalValue("approvedby");

        if (!approvedby) {
            return "";
        }

        const user = geotech.getUser.call(this);

        if (user && user._id === approvedby) {
            return `Approved By: ${user.firstname} ${user.lastname}`;
        }

        return approvedby;
    }

    async downloadProposal() {
        try {
            const { projectid, proposalid } = this.props.match.params;

            // Fetch PDF Blob
            const pdfBlob = await DownloadProposal(projectid, proposalid);

            // Create a blob URL
            const url = URL.createObjectURL(pdfBlob);

            // Create a temporary download link
            const link = document.createElement("a");
            link.href = url;
            link.download = `Proposal-${proposalid}.pdf`; // Choose any filename you like

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the blob URL
            URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error downloading proposal:", err);
            alert(err.message || "Failed to download proposal.");
        }
    }




    render() {
        const styles = MyStylesheet();
        const geotech = new Geotech();

        const { projectid, proposalid } = this.props.match.params;

        const user = geotech.getUser.call(this);
        const project = geotech.getProjectByID.call(this, projectid);
        const proposal = geotech.getProposalByID.call(this, projectid, proposalid);

        const headerFont = geotech.getHeaderFont.call(this);
        const regularFont = geotech.getRegularFont.call(this);
        const iconWidth = { width: '5em' }




        // 🔥 Prevent crashes on refresh/loading
        if (!user || !project) {
            return (
                <div style={styles.generalContainer}>
                    Loading...
                </div>
            );
        }

        // 🔥 Proposal guard
        if (!proposal) {
            return (
                <div style={styles.generalContainer}>
                    <span style={styles.generalFont}>
                        Proposal Not Found
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
                        to={`/projects/${user.clientid}/${project.projectid}/proposals`}
                    >
                        /Proposals
                    </Link>
                </div>

                <div style={rowStyle}>
                    <Link
                        style={linkStyle}
                        to={`/projects/${user.clientid}/${project.projectid}/proposals/${proposalid}`}
                    >
                        /{formatDate(proposal.dateproposal)}
                    </Link>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>Proposal for Geotechnical Services</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <button  className={`generalButton`} style={{  ...iconWidth }} onClick={() => { this.downloadProposal() }}>{clickToDownload()}  </button> <span style={{ ...regularFont, ...styles.generalFont }}>Click to Download</span>
                </div>

                {this.showLineItems()}

                {this.showTotal()}

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <button className="generalButton authButton" style={{  ...buttonWidth }} onClick={() => { this.updateProposal() }}>{authorize()}</button>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...regularFont }}>{this.getDateApproved()}</span>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...regularFont }}>{this.getApprovedBy()}</span>

                    </div>
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
export default connect(mapStateToProps, actions)(ViewProposal)