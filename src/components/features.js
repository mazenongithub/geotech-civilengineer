
import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { Link } from 'react-router-dom';

class Features extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.updateWindowDimensions =
            this.updateWindowDimensions.bind(this);

        this.theme = {
            sand: '#c0a87b',
            darkSand: '#8b744e',
            cream: '#f4f0e8',
            background: '#faf9f6',
            white: '#ffffff',
            charcoal: '#383a37',
            text: '#565852',
            muted: '#73756f',
            border: '#e8e2d8'
        };
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

    // --------------------------------------------------
    // FONTS
    // --------------------------------------------------

    getFonts() {
        const geotech = new Geotech();

        return {
            regularFont: geotech.getRegularFont.call(this),
            headerFont: geotech.getHeaderFont.call(this)
        };
    }

    // --------------------------------------------------
    // RESPONSIVE LAYOUT
    // --------------------------------------------------

    getLayout() {

        const { width } = this.state;

        const isMobile = width > 0 && width <= 600;
        const isTablet = width > 600 && width <= 950;

        return {
            isMobile,
            isTablet,
            padding: isMobile ? '20px' : '35px',
            sectionPadding: isMobile ? '45px 0' : '65px 0',
            columns: isMobile
                ? '1fr'
                : isTablet
                    ? 'repeat(2, minmax(0, 1fr))'
                    : 'repeat(3, minmax(0, 1fr))'
        };
    }

    // --------------------------------------------------
    // FEATURE DATA
    // --------------------------------------------------

    getFeatures() {

        return [
            {
                number: '01',
                title: 'Project Management',
                description:
                    'Keep your geotechnical projects organized from initial investigation through construction and final reporting.',
                items: [
                    'Create and manage projects with site details',
                    'Review project status and activities',
                    'Access centralized project documentation',
                    'Maintain project information in one location'
                ]
            },
            {
                number: '02',
                title: 'Proposals & Approvals',
                description:
                    'Simplify the review and acceptance of engineering proposals while maintaining organized project records.',
                items: [
                    'Review engineering proposals online',
                    'Approve proposals and service agreements',
                    'Maintain proposal versions and records',
                    'Reduce unnecessary email correspondence'
                ]
            },
            {
                number: '03',
                title: 'Project Schedules',
                description:
                    'Stay informed about planned engineering activities and important project milestones.',
                items: [
                    'Review proposed project schedules',
                    'Coordinate engineering activities',
                    'Review schedule revisions',
                    'Track important project milestones'
                ]
            },
            {
                number: '04',
                title: 'Engineering Reports',
                description:
                    'Access engineering reports and technical documents associated with your project.',
                items: [
                    'Geotechnical investigation reports',
                    'Engineering calculations and evaluations',
                    'Construction testing reports',
                    'Approval and recommendation letters',
                    'Download available PDF documents'
                ]
            },
            {
                number: '05',
                title: 'Soil Laboratory & Boring Logs',
                description:
                    'Review subsurface exploration information and laboratory testing results used in engineering evaluations.',
                items: [
                    'Subsurface exploration and boring logs',
                    'Laboratory soil testing results',
                    'Soil descriptions and classifications',
                    'Compaction curves and testing data',
                    'Project-specific geotechnical records'
                ]
            },
            {
                number: '06',
                title: 'Construction Inspections',
                description:
                    'Monitor geotechnical field observations and testing performed during construction.',
                items: [
                    'Field inspection documentation',
                    'Soil compaction testing records',
                    'Site preparation and grading observations',
                    'Construction quality-control information',
                    'Review available field reports'
                ]
            },
            {
                number: '07',
                title: 'Invoicing & Payments',
                description:
                    'Keep project billing organized with centralized access to invoices and payment information.',
                items: [
                    'Review project invoices',
                    'Track project billing records',
                    'Access available payment information',
                    'Maintain organized financial documentation'
                ]
            },
            {
                number: '08',
                title: 'Notifications & Updates',
                description:
                    'Stay informed when important project information and documents become available.',
                items: [
                    'Project activity updates',
                    'Notifications for available documents',
                    'Updates regarding engineering reports',
                    'Improved communication and coordination'
                ]
            }
        ];
    }

    // --------------------------------------------------
    // FEATURE CARD
    // --------------------------------------------------

    featureCard(feature) {

        const theme = this.theme;
        const { regularFont, headerFont } = this.getFonts();

        return (
            <article
                key={feature.number}
                style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '9px',
                    padding: '28px',
                    boxShadow:
                        '0 4px 14px rgba(70,60,45,0.045)',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0
                }}
            >

                {/* CARD NUMBER */}

                <div
                    style={{
                        color: theme.darkSand,
                        fontSize: '25px',
                        fontWeight: 700,
                        marginBottom: '10px'
                    }}
                >
                    {feature.number}
                </div>

                <div
                    style={{
                        width: '38px',
                        height: '3px',
                        backgroundColor: theme.sand,
                        borderRadius: '3px',
                        marginBottom: '18px'
                    }}
                />

                {/* TITLE */}

                <h2
                    style={{
                        ...headerFont,
                        color: theme.charcoal,
                        fontSize: '19px',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        margin: '0 0 14px'
                    }}
                >
                    {feature.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                    style={{
                        ...regularFont,
                        color: theme.text,
                        fontSize: '14px',
                        lineHeight: 1.8,
                        margin: '0 0 20px'
                    }}
                >
                    {feature.description}
                </p>

                {/* FEATURE LIST */}

                <ul
                    style={{
                        paddingLeft: '19px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '11px'
                    }}
                >
                    {feature.items.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                ...regularFont,
                                color: theme.text,
                                fontSize: '14px',
                                lineHeight: 1.6,
                                paddingLeft: '3px'
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>

            </article>
        );
    }

    // --------------------------------------------------
    // PAGE INTRODUCTION
    // --------------------------------------------------

    renderIntroduction() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        return (
            <section
                style={{
                    backgroundColor: theme.background,
                    padding: layout.isMobile
                        ? '50px 20px'
                        : '75px 35px',
                    borderBottom: `1px solid ${theme.border}`
                }}
            >
                <div
                    style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}
                >

                    <div
                        style={{
                            color: theme.darkSand,
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            marginBottom: '20px'
                        }}
                    >
                        GEOTECHNICAL PROJECT PORTAL
                    </div>

                    <h1
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: layout.isMobile
                                ? '31px'
                                : '43px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            margin: '0 0 23px'
                        }}
                    >
                        Platform Features
                    </h1>

                    <div
                        style={{
                            width: '60px',
                            height: '3px',
                            backgroundColor: theme.sand,
                            borderRadius: '3px',
                            margin: '0 auto 25px'
                        }}
                    />

                    <p
                        style={{
                            ...regularFont,
                            color: theme.text,
                            fontSize: layout.isMobile
                                ? '15px'
                                : '18px',
                            lineHeight: 1.8,
                            margin: '0 auto 18px',
                            maxWidth: '780px'
                        }}
                    >
                        Everything you need to manage your
                        geotechnical engineering project
                        in one convenient location.
                    </p>

                    <p
                        style={{
                            ...regularFont,
                            color: theme.muted,
                            fontSize: '15px',
                            lineHeight: 1.8,
                            maxWidth: '750px',
                            margin: '0 auto'
                        }}
                    >
                        From project coordination and proposals
                        to field inspections, soil laboratory
                        testing, and engineering reports,
                        the Geotech portal provides organized
                        access to important project information.
                    </p>

                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // WHY USE GEOTECH
    // --------------------------------------------------

    renderBenefits() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        const benefits = [
            {
                title: 'Centralized Information',
                description:
                    'Keep project records, engineering reports, and testing documentation organized in one location.'
            },
            {
                title: 'Better Coordination',
                description:
                    'Improve communication between clients, contractors, and engineering professionals.'
            },
            {
                title: 'Convenient Access',
                description:
                    'Review available project information and documents whenever you need them.'
            },
            {
                title: 'Organized Records',
                description:
                    'Maintain a consistent record of project documentation and engineering activities.'
            }
        ];

        return (
            <section
                style={{
                    backgroundColor: theme.cream,
                    padding: layout.sectionPadding
                }}
            >
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        padding: `0 ${layout.padding}`
                    }}
                >

                    <h2
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: layout.isMobile
                                ? '24px'
                                : '29px',
                            fontWeight: 700,
                            textAlign: 'center',
                            margin: '0 0 35px'
                        }}
                    >
                        Why Use the Geotech Portal?
                    </h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: layout.isMobile
                                ? '1fr'
                                : 'repeat(2, minmax(0, 1fr))',
                            gap: '20px'
                        }}
                    >
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: theme.white,
                                    border: `1px solid ${theme.border}`,
                                    borderRadius: '8px',
                                    padding: '25px'
                                }}
                            >
                                <h3
                                    style={{
                                        ...headerFont,
                                        color: theme.charcoal,
                                        fontSize: '17px',
                                        fontWeight: 700,
                                        margin: '0 0 12px'
                                    }}
                                >
                                    {benefit.title}
                                </h3>

                                <p
                                    style={{
                                        ...regularFont,
                                        color: theme.text,
                                        fontSize: '14px',
                                        lineHeight: 1.8,
                                        margin: 0
                                    }}
                                >
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // CALL TO ACTION
    // --------------------------------------------------

    renderCallToAction() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        return (
            <section
                style={{
                    backgroundColor: theme.white,
                    padding: layout.sectionPadding,
                    textAlign: 'center'
                }}
            >
                <div
                    style={{
                        maxWidth: '750px',
                        margin: '0 auto',
                        padding: `0 ${layout.padding}`
                    }}
                >

                    <h2
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: layout.isMobile
                                ? '24px'
                                : '29px',
                            fontWeight: 700,
                            margin: '0 0 16px'
                        }}
                    >
                        Access Your Geotechnical Projects
                    </h2>

                    <p
                        style={{
                            ...regularFont,
                            color: theme.text,
                            fontSize: '15px',
                            lineHeight: 1.8,
                            margin: '0 auto 28px'
                        }}
                    >
                        Sign in to review your projects,
                        engineering documents, inspections,
                        and available project information.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '13px',
                            justifyContent: 'center'
                        }}
                    >
                        <Link
                            to="/login"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '13px 28px',
                                backgroundColor: theme.darkSand,
                                color: '#ffffff',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: 600
                            }}
                        >
                            Client Login →
                        </Link>

                        <Link
                            to="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '13px 28px',
                                backgroundColor: '#ffffff',
                                color: theme.darkSand,
                                textDecoration: 'none',
                                borderRadius: '6px',
                                border: `1px solid ${theme.darkSand}`,
                                fontSize: '14px',
                                fontWeight: 600
                            }}
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // MAIN RENDER
    // --------------------------------------------------

    render() {

        const styles = MyStylesheet();
        const layout = this.getLayout();
        const features = this.getFeatures();

        return (
            <div
                style={{
                    ...styles.generalContainer,
                    backgroundColor: this.theme.background,
                    width: '100%',
                    minHeight: '100vh',
                    boxSizing: 'border-box',
                    overflowX: 'hidden'
                }}
            >

                {this.renderIntroduction()}

                {/* FEATURES GRID */}

                <section
                    style={{
                        backgroundColor: this.theme.white,
                        padding: layout.sectionPadding
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1150px',
                            margin: '0 auto',
                            padding: `0 ${layout.padding}`
                        }}
                    >

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: layout.columns,
                                gap: '22px'
                            }}
                        >
                            {features.map(feature =>
                                this.featureCard(feature)
                            )}
                        </div>

                    </div>
                </section>

                {this.renderBenefits()}

                {this.renderCallToAction()}

            </div>
        );
    }
}

export default Features;
