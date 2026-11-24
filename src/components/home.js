
import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import { Link, Redirect } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';

class Home extends Component {

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
    // USER AND THEME
    // --------------------------------------------------

    getUser() {
        const geotech = new Geotech();
        return geotech.getUser.call(this);
    }

    getFonts() {
        const geotech = new Geotech();

        return {
            regularFont: geotech.getRegularFont.call(this),
            headerFont: geotech.getHeaderFont.call(this)
        };
    }

    getLayout() {
        const { width } = this.state;

        const isMobile = width > 0 && width <= 600;
        const isTablet = width > 600 && width <= 950;

        return {
            isMobile,
            isTablet,
            padding: isMobile ? '20px' : '35px',
            sectionPadding: isMobile ? '45px 0' : '65px 0',
            heroPadding: isMobile ? '55px 20px' : '85px 35px',
            columns: isMobile
                ? '1fr'
                : isTablet
                    ? 'repeat(2, minmax(0, 1fr))'
                    : 'repeat(4, minmax(0, 1fr))'
        };
    }

    // --------------------------------------------------
    // BUTTON
    // --------------------------------------------------

    actionButton(label, to, filled = true) {

        const theme = this.theme;

        return (
            <Link
                to={to}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    minHeight: '46px',
                    padding: '12px 25px',
                    boxSizing: 'border-box',
                    borderRadius: '6px',
                    backgroundColor: filled
                        ? theme.darkSand
                        : theme.white,
                    color: filled
                        ? theme.white
                        : theme.darkSand,
                    border: `1px solid ${theme.darkSand}`,
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
            >
                {label}
                <span aria-hidden="true">→</span>
            </Link>
        );
    }

    // --------------------------------------------------
    // SECTION HEADING
    // --------------------------------------------------

    sectionHeading(title, subtitle) {

        const theme = this.theme;
        const { regularFont, headerFont } = this.getFonts();
        const { isMobile } = this.getLayout();

        return (
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '30px' : '40px'
                }}
            >
                <h2
                    style={{
                        ...headerFont,
                        color: theme.charcoal,
                        fontSize: isMobile ? '24px' : '30px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        margin: '0 0 15px'
                    }}
                >
                    {title}
                </h2>

                <div
                    style={{
                        width: '55px',
                        height: '3px',
                        backgroundColor: theme.sand,
                        borderRadius: '3px',
                        margin: '0 auto 20px'
                    }}
                />

                <p
                    style={{
                        ...regularFont,
                        color: theme.text,
                        fontSize: '15px',
                        lineHeight: 1.8,
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}
                >
                    {subtitle}
                </p>
            </div>
        );
    }

    // --------------------------------------------------
    // FEATURE CARD
    // --------------------------------------------------

    featureCard(number, title, description) {

        const theme = this.theme;
        const { regularFont, headerFont } = this.getFonts();

        return (
            <div
                style={{
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    boxShadow:
                        '0 4px 15px rgba(70,60,45,0.045)',
                    minWidth: 0
                }}
            >
                <div
                    style={{
                        color: theme.darkSand,
                        fontSize: '27px',
                        fontWeight: 700,
                        letterSpacing: '-1px'
                    }}
                >
                    {number}
                </div>

                <div
                    style={{
                        width: '35px',
                        height: '2px',
                        backgroundColor: theme.sand
                    }}
                />

                <h3
                    style={{
                        ...headerFont,
                        color: theme.charcoal,
                        fontSize: '18px',
                        fontWeight: 700,
                        margin: 0
                    }}
                >
                    {title}
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
                    {description}
                </p>
            </div>
        );
    }

    // --------------------------------------------------
    // HOW IT WORKS
    // --------------------------------------------------

    stepCard(number, title, description) {

        const theme = this.theme;
        const { regularFont, headerFont } = this.getFonts();

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    padding: '25px',
                    backgroundColor: theme.white,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    minWidth: 0
                }}
            >
                <div
                    style={{
                        width: '42px',
                        height: '42px',
                        minWidth: '42px',
                        borderRadius: '50%',
                        backgroundColor: theme.cream,
                        color: theme.darkSand,
                        border: `1px solid ${theme.sand}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '15px',
                        fontWeight: 700
                    }}
                >
                    {number}
                </div>

                <div>
                    <h3
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: '17px',
                            fontWeight: 700,
                            margin: '0 0 10px'
                        }}
                    >
                        {title}
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
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // HERO
    // --------------------------------------------------

    renderHero() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        return (
            <section
                style={{
                    backgroundColor: theme.background,
                    padding: layout.heroPadding,
                    borderBottom: `1px solid ${theme.border}`
                }}
            >
                <div
                    style={{
                        maxWidth: '950px',
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
                            marginBottom: '22px'
                        }}
                    >
                        CIVILENGINEER.IO
                    </div>

                    <h1
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: layout.isMobile
                                ? '32px'
                                : '46px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            margin: '0 0 25px'
                        }}
                    >
                        Geotechnical Engineering
                        <br />
                        Project Portal
                    </h1>

                    <div
                        style={{
                            width: '70px',
                            height: '3px',
                            backgroundColor: theme.sand,
                            borderRadius: '3px',
                            margin: '0 auto 28px'
                        }}
                    />

                    <p
                        style={{
                            ...regularFont,
                            color: theme.text,
                            fontSize: layout.isMobile
                                ? '16px'
                                : '19px',
                            lineHeight: 1.8,
                            maxWidth: '760px',
                            margin: '0 auto 18px'
                        }}
                    >
                        Your projects, inspections, laboratory
                        testing, and engineering reports —
                        organized in one convenient location.
                    </p>

                    <p
                        style={{
                            ...regularFont,
                            color: theme.muted,
                            fontSize: '15px',
                            lineHeight: 1.8,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}
                    >
                        A secure client portal connecting property
                        owners, contractors, and developers with
                        their geotechnical engineering team.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '13px',
                            marginTop: '32px'
                        }}
                    >
                        {this.actionButton(
                            'Client Login',
                            '/login'
                        )}

                        {this.actionButton(
                            'Contact Us',
                            '/contact',
                            false
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // FEATURES
    // --------------------------------------------------

    renderFeatures() {

        const theme = this.theme;
        const layout = this.getLayout();

        return (
            <section
                style={{
                    backgroundColor: theme.white,
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
                    {this.sectionHeading(
                        'Your Project, Simplified',
                        'Everything you need to stay informed and connected throughout your geotechnical project.'
                    )}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: layout.columns,
                            gap: '20px'
                        }}
                    >
                        {this.featureCard(
                            '01',
                            'Project Management',
                            'Access project details, site information, engineering activities, and important project documentation.'
                        )}

                        {this.featureCard(
                            '02',
                            'Field Inspections',
                            'Review construction inspections, field observations, soil compaction testing, and site investigation records.'
                        )}

                        {this.featureCard(
                            '03',
                            'Engineering Reports',
                            'Access geotechnical investigation reports, laboratory test results, boring logs, and construction documentation.'
                        )}

                        {this.featureCard(
                            '04',
                            'Collaboration',
                            'Keep property owners, contractors, developers, and engineering professionals connected through shared project information.'
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // PROCESS
    // --------------------------------------------------

    renderHowItWorks() {

        const theme = this.theme;
        const layout = this.getLayout();

        return (
            <section
                style={{
                    backgroundColor: theme.cream,
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
                    {this.sectionHeading(
                        'How It Works',
                        'Access your project information in three simple steps.'
                    )}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: layout.isMobile
                                ? '1fr'
                                : layout.isTablet
                                    ? 'repeat(2, minmax(0, 1fr))'
                                    : 'repeat(3, minmax(0, 1fr))',
                            gap: '20px'
                        }}
                    >
                        {this.stepCard(
                            '1',
                            'Sign In',
                            'Log in to your account to access assigned projects and available engineering information.'
                        )}

                        {this.stepCard(
                            '2',
                            'Monitor Your Project',
                            'Review field inspections, laboratory testing, construction activities, and project updates.'
                        )}

                        {this.stepCard(
                            '3',
                            'Review Reports',
                            'Access completed engineering reports, test results, and project records when available.'
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // PORTAL ACCESS
    // --------------------------------------------------

    renderPortalAccess() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        return (
            <section
                style={{
                    backgroundColor: theme.white,
                    padding: layout.sectionPadding
                }}
            >
                <div
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: `0 ${layout.padding}`,
                        textAlign: 'center'
                    }}
                >
                    <h2
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: layout.isMobile
                                ? '24px'
                                : '30px',
                            fontWeight: 700,
                            margin: '0 0 18px'
                        }}
                    >
                        Access Your Project Dashboard
                    </h2>

                    <p
                        style={{
                            ...regularFont,
                            color: theme.text,
                            fontSize: '15px',
                            lineHeight: 1.8,
                            maxWidth: '650px',
                            margin: '0 auto 28px'
                        }}
                    >
                        Log in to view your geotechnical projects,
                        monitor inspection activities, and access
                        engineering reports and project records.
                    </p>

                    {this.actionButton(
                        'Client Login',
                        '/login'
                    )}
                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // CONTACT
    // --------------------------------------------------

    renderContact() {

        const theme = this.theme;
        const layout = this.getLayout();
        const { regularFont, headerFont } = this.getFonts();

        return (
            <section
                style={{
                    backgroundColor: theme.background,
                    borderTop: `1px solid ${theme.border}`,
                    padding: layout.sectionPadding
                }}
            >
                <div
                    style={{
                        maxWidth: '750px',
                        margin: '0 auto',
                        padding: `0 ${layout.padding}`,
                        textAlign: 'center'
                    }}
                >
                    <h2
                        style={{
                            ...headerFont,
                            color: theme.charcoal,
                            fontSize: '26px',
                            fontWeight: 700,
                            margin: '0 0 16px'
                        }}
                    >
                        Need Assistance?
                    </h2>

                    <p
                        style={{
                            ...regularFont,
                            color: theme.text,
                            fontSize: '15px',
                            lineHeight: 1.8,
                            margin: '0 auto 27px'
                        }}
                    >
                        Have questions about your geotechnical
                        project, inspection records, or
                        engineering reports?

                        {' '}Contact your engineering team
                        for assistance.
                    </p>

                    {this.actionButton(
                        'Contact Us',
                        '/contact'
                    )}
                </div>
            </section>
        );
    }

    // --------------------------------------------------
    // MAIN RENDER
    // --------------------------------------------------

    render() {

        const user = this.getUser();

        // Logged-in users go directly to their projects.
        if (user?.clientid) {
            return (
                <Redirect
                    to={`/projects/${user.clientid}`}
                />
            );
        }

        const styles = MyStylesheet();

        return (
            <div
                style={{
                    ...styles.generalContainer,
                    backgroundColor: this.theme.background,
                    minHeight: '100vh',
                    width: '100%',
                    boxSizing: 'border-box',
                    overflowX: 'hidden'
                }}
            >
                {this.renderHero()}

                {this.renderFeatures()}

                {this.renderHowItWorks()}

                {this.renderPortalAccess()}

                {this.renderContact()}
            </div>
        );
    }
}

// --------------------------------------------------
// REDUX
// --------------------------------------------------

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects
    };
}

export default connect(mapStateToProps, actions)(Home);
