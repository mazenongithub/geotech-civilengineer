import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Geotech from './geotech';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { SaveContactUs } from './actions/api';

const COLORS = {
    sand: '#c0a87b', darkSand: '#78613e', cream: '#f4f0e8',
    background: '#faf9f6', white: '#ffffff', charcoal: '#383a37',
    text: '#565852', muted: '#73756f', border: '#e8e2d8'
};

const PROJECT_TYPES = [
    ['residential', 'Residential'], ['commercial', 'Commercial'],
    ['mixeduse', 'Mixed Use'], ['publicagency', 'Public Agency']
];

const SERVICES = [
    ['investigation', 'Geotechnical Investigation'],
    ['planreview', 'Plan Review / Consulting'],
    ['compactiontesting', 'Field Compaction Testing'],
    ['foundationdesign', 'Foundation Design'],
    ['pavementdesign', 'Pavement Design'],
    ['specialinspection', 'Special Inspection'],
    ['retainingwall', 'Retaining Wall'],
    ['foundationinspection', 'Foundation Inspection']
];

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0, datein: new Date(),
            fullname: '', company: '', emailaddress: '', phonenumber: '',
            projectaddress: '', projectcity: '', message: '',
            projectinquiry: false, residential: false, commercial: false,
            mixeduse: false, publicagency: false, investigation: false,
            planreview: false, compactiontesting: false,
            foundationdesign: false, pavementdesign: false,
            specialinspection: false, retainingwall: false,
            foundationinspection: false, preferredContact: 'email',
            captchaToken: null, submitting: false, messagecreated: '',
            submitError: ''
        };
        this.turnstileRendered = false;
        this.turnstileWidgetId = null;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.saveContactUs = this.saveContactUs.bind(this);
    }

  componentDidMount() {

    window.addEventListener(
        'resize',
        this.updateWindowDimensions
    );

    this.updateWindowDimensions();

    window.onTurnstileSuccess = (token) => {
        this.setState({ captchaToken: token });
    };

    window.onTurnstileExpired = () => {
        this.setState({ captchaToken: null });
    };

    // Wait for the React render to complete.
    this.turnstileTimeout = setTimeout(() => {

     

    

        this.renderTurnstile();

        

    }, 500);
}

    componentWillUnmount() {
        window.removeEventListener(
            'resize',
            this.updateWindowDimensions
        );

        if (this.turnstileInterval) {
            clearInterval(this.turnstileInterval);
        }

        if (
            window.turnstile &&
            this.turnstileWidgetId != null
        ) {
            window.turnstile.remove(this.turnstileWidgetId);
        }

        delete window.onTurnstileSuccess;
        delete window.onTurnstileExpired;
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setField(field, value) {
        this.setState({ [field]: value });
    }

    getField(field) {
        return this.state[field];
    }

    toggleField(field) {
        this.setState((previous) => ({ [field]: !previous[field] }));
    }

    setPreferredContact(method) {
        this.setState({ preferredContact: method });
    }

    getTypography() {
        const geotech = new Geotech();
        return {
            regular: geotech.getRegularFont.call(this),
            heading: geotech.getHeaderFont.call(this)
        };
    }

    getLayout() {
        return { mobile: this.state.width > 0 && this.state.width < 768 };
    }

    sectionHeading(number, heading, detail) {
        const { heading: headerFont, regular } = this.getTypography();
        return (
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ color: COLORS.darkSand, fontWeight: 700, fontSize: 13 }}>{number}</span>
                    <h2 style={{ ...headerFont, color: COLORS.charcoal, fontSize: 21, margin: 0 }}>{heading}</h2>
                </div>
                {detail && <p style={{ ...regular, color: COLORS.muted, fontSize: 14, lineHeight: 1.7, margin: '8px 0 0' }}>{detail}</p>}
            </div>
        );
    }

    field(label, name, type = 'text', required = false) {
        const { regular } = this.getTypography();
        return (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                <span style={{ ...regular, color: COLORS.charcoal, fontSize: 14, fontWeight: 600 }}>
                    {label}{required && <span style={{ color: COLORS.darkSand }}> *</span>}
                </span>
                <input
                    type={type}
                    required={required}
                    autoComplete={name === 'fullname' ? 'name' : name === 'emailaddress' ? 'email' : name === 'phonenumber' ? 'tel' : 'off'}
                    value={this.getField(name)}
                    onChange={(event) => this.setField(name, event.target.value)}
                    style={{
                        ...regular, width: '100%', boxSizing: 'border-box', minHeight: 45,
                        padding: '11px 13px', fontSize: 15, background: COLORS.white,
                        color: COLORS.charcoal, border: `1px solid ${COLORS.border}`, borderRadius: 6
                    }}
                />
            </label>
        );
    }

    selection(field, label, radio = false) {
        const { regular } = this.getTypography();
        const checked = radio
            ? this.state.preferredContact === field
            : Boolean(this.state[field]);
        return (
            <label key={field} style={{
                ...regular, display: 'flex', gap: 11, alignItems: 'center',
                minHeight: 44, padding: '10px 13px', boxSizing: 'border-box', cursor: 'pointer',
                border: `1px solid ${checked ? COLORS.sand : COLORS.border}`,
                borderRadius: 7, backgroundColor: checked ? COLORS.cream : COLORS.white,
                color: COLORS.charcoal, fontSize: 14
            }}>
                <input
                    type={radio ? 'radio' : 'checkbox'}
                    name={radio ? 'preferredContact' : field}
                    checked={checked}
                    onChange={() => radio ? this.setPreferredContact(field) : this.toggleField(field)}
                    style={{ width: 17, height: 17, accentColor: COLORS.darkSand, flexShrink: 0 }}
                />
                <span>{label}</span>
            </label>
        );
    }

    showTextFields() {
        const { mobile } = this.getLayout();
        return (
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
                {this.field('Full Name', 'fullname', 'text', true)}
                {this.field('Company', 'company')}
                {this.field('Email Address', 'emailaddress', 'email', true)}
                {this.field('Phone Number', 'phonenumber', 'tel')}
            </div>
        );
    }

    showProjectLocation() {
        const { mobile } = this.getLayout();
        return (
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr', gap: 20, marginBottom: 25 }}>
                {this.field('Project Address', 'projectaddress')}
                {this.field('Project City', 'projectcity')}
            </div>
        );
    }

   renderTurnstile() {
    if (!window.turnstile || this.turnstileRendered) {
        return;
    }

    const container = document.getElementById(
        'turnstile-container'
    );

    if (!container) {
        return;
    }

    const sitekey = process.env.REACT_APP_TURNSTILE_SITE_KEY;

    if (!sitekey) {
        console.error('Cloudflare Turnstile site key is missing.');
        return;
    }

    try {
        this.turnstileWidgetId = window.turnstile.render(
            container,
            {
                sitekey,

                theme: 'light',

                appearance: 'always',

                callback: (token) => {
                    this.setState({
                        captchaToken: token
                    });
                },

                'expired-callback': () => {
                    this.setState({
                        captchaToken: null
                    });
                },

                'error-callback': (error) => {
                    console.error(
                        'Cloudflare Turnstile error:',
                        error
                    );

                    this.setState({
                        captchaToken: null
                    });
                }
            }
        );

        this.turnstileRendered = true;

    } catch (error) {
        console.error(
            'Unable to initialize Cloudflare Turnstile:',
            error
        );

        this.turnstileRendered = false;
    }
}

    showProjectForm() {
        if (!this.state.projectinquiry) return null;
        const { mobile } = this.getLayout();
        const { regular } = this.getTypography();
        const grid = { display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 11 };
        return (
            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 27, marginTop: 25 }}>
                {this.sectionHeading('03', 'Project Information', 'Tell us where the work is located and which services you need.')}
                {this.showProjectLocation()}
                <p style={{ ...regular, fontSize: 14, color: COLORS.charcoal, fontWeight: 700, margin: '0 0 13px' }}>Project Type</p>
                <div style={{ ...grid, marginBottom: 26 }}>
                    {PROJECT_TYPES.map(([key, label]) => this.selection(key, label))}
                </div>
                <p style={{ ...regular, fontSize: 14, color: COLORS.charcoal, fontWeight: 700, margin: '0 0 13px' }}>Services Needed</p>
                <div style={{ ...grid, marginBottom: 26 }}>
                    {SERVICES.map(([key, label]) => this.selection(key, label))}
                </div>
                <label style={{ ...regular, display: 'block', fontSize: 14, fontWeight: 700, color: COLORS.charcoal, marginBottom: 10 }}>
                    Service Needed By
                </label>
                <div style={{ maxWidth: 250 }}>
                    <Datetime
                        value={this.getField('datein') ? moment(this.getField('datein')) : null}
                        onChange={(date) => this.setField('datein', date)}
                        timeFormat={false}
                        dateFormat="MM/DD/YYYY"
                        inputProps={{
                            'aria-label': 'Service needed by date', style: {
                                ...regular, boxSizing: 'border-box', width: '100%', padding: '11px 13px',
                                minHeight: 45, borderRadius: 6, background: COLORS.white,
                                color: COLORS.charcoal, border: `1px solid ${COLORS.border}`
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    async saveContactUs() {
        if (!this.state.captchaToken || this.state.submitting) return;
        this.setState({ submitting: true, submitError: '', messagecreated: '' });
        try {
            const {
                datein, fullname, company, emailaddress, phonenumber,
                projectaddress, projectcity, projectinquiry, residential,
                commercial, mixeduse, publicagency, investigation, planreview,
                compactiontesting, foundationdesign, pavementdesign,
                specialinspection, retainingwall, foundationinspection,
                preferredContact, message, captchaToken
            } = this.state;

            // Preserve the existing API payload field names and structure.
            const values = {
                datein, fullname, company, emailaddress, phonenumber,
                projectaddress, projectcity, projectinquiry,
                clienttype: { residential, commercial, mixeduse, publicagency },
                services: {
                    investigation, planreview, compactiontesting,
                    foundationdesign, pavementdesign, specialinspection,
                    retainingwall, foundationinspection
                },
                preferredContact, message, captchaToken
            };

            const response = await SaveContactUs(values);
            const created = response && response.created
                ? ` ${new Date(response.created).toLocaleTimeString()}` : '';
            this.setState({ messagecreated: `${response?.message || 'Message sent successfully.'}${created}` });
        } catch (err) {
            console.error('save contact us error:', err);
            this.setState({ submitError: 'Unable to send your message. Please try again.' });
        } finally {
            this.setState({ submitting: false });
        }
    }

    render() {
        const styles = MyStylesheet();
        const { regular, heading } = this.getTypography();
        const { mobile } = this.getLayout();

        return (
            <div style={{
                ...styles.generalContainer, backgroundColor: COLORS.background,
                minHeight: '100vh', padding: mobile ? '35px 16px' : '55px 28px', boxSizing: 'border-box'
            }}>
                <div style={{ maxWidth: 920, margin: '0 auto' }}>
                    <header style={{ marginBottom: 30 }}>
                        <div style={{
                            color: COLORS.darkSand, fontSize: 12, letterSpacing: 2,
                            fontWeight: 700, marginBottom: 12
                        }}>GEOTECHNICAL ENGINEERING</div>
                        <h1 style={{
                            ...heading, color: COLORS.charcoal, fontSize: mobile ? 30 : 40,
                            lineHeight: 1.2, margin: '0 0 14px'
                        }}>Contact Us</h1>
                        <div style={{
                            width: 55, height: 3, borderRadius: 3,
                            background: COLORS.sand, marginBottom: 17
                        }} />
                        <p style={{
                            ...regular, color: COLORS.text, fontSize: 16,
                            lineHeight: 1.8, margin: 0
                        }}>
                            Tell us about your project or ask a question. Our team will follow up with you.
                        </p>
                    </header>

                    <form onSubmit={(event) => { event.preventDefault(); this.saveContactUs(); }}>
                        <div style={{
                            background: COLORS.white, border: `1px solid ${COLORS.border}`,
                            borderRadius: 10, padding: mobile ? 20 : 34,
                            boxShadow: '0 4px 18px rgba(70,60,45,0.045)'
                        }}>
                            {this.sectionHeading('01', 'Your Contact Information')}
                            {this.showTextFields()}

                            <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 28, paddingTop: 27 }}>
                                {this.sectionHeading('02', 'How Should We Reach You?')}
                                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 11 }}>
                                    {this.selection('email', 'By Email', true)}
                                    {this.selection('phonenumber', 'By Phone', true)}
                                </div>
                            </div>

                            <div style={{ marginTop: 25 }}>
                                {this.selection('projectinquiry', 'Create New Project Inquiry')}
                            </div>
                            {this.showProjectForm()}

                            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 27, marginTop: 28 }}>
                                {this.sectionHeading(this.state.projectinquiry ? '04' : '03', 'Your Message')}
                                <label htmlFor="contact-message" style={{
                                    ...regular, color: COLORS.charcoal,
                                    fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 10
                                }}>How can we help?</label>
                                <textarea id="contact-message" value={this.state.message}
                                    onChange={(event) => this.setField('message', event.target.value)}
                                    rows={mobile ? 7 : 6}
                                    style={{
                                        ...regular, width: '100%', boxSizing: 'border-box', resize: 'vertical',
                                        padding: 13, borderRadius: 7, border: `1px solid ${COLORS.border}`,
                                        color: COLORS.charcoal, background: COLORS.white, fontSize: 15, lineHeight: 1.7
                                    }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: mobile ? 'center' : 'flex-start', margin: '26px 0' }}>
                                <div id="turnstile-container" />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" disabled={!this.state.captchaToken || this.state.submitting}
                                    style={{
                                        background: COLORS.darkSand, color: COLORS.white,
                                        border: 'none', borderRadius: 7, padding: '14px 29px',
                                        fontSize: 15, fontWeight: 700,
                                        opacity: !this.state.captchaToken || this.state.submitting ? 0.5 : 1,
                                        cursor: !this.state.captchaToken || this.state.submitting ? 'not-allowed' : 'pointer'
                                    }}>
                                    {this.state.submitting ? 'Sending...' : 'Send Message →'}
                                </button>
                            </div>
                            <div aria-live="polite" role="status" style={{
                                ...regular, textAlign: 'center',
                                color: this.state.submitError ? '#9b3b2e' : COLORS.darkSand,
                                marginTop: 16, fontSize: 14
                            }}>
                                {this.state.submitError || this.state.messagecreated}
                            </div>
                        </div>
                    </form>

                    <div style={{
                        marginTop: 24, background: COLORS.cream, padding: mobile ? 22 : 28,
                        border: `1px solid ${COLORS.border}`, borderRadius: 9
                    }}>
                        <h2 style={{ ...heading, color: COLORS.charcoal, fontSize: 19, margin: '0 0 12px' }}>
                            Prefer Email?
                        </h2>
                        <p style={{ ...regular, color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: '0 0 10px' }}>
                            You can also reach our engineering team directly.
                        </p>
                        <a href="mailto:support@civilengineer.io" style={{
                            ...regular, color: COLORS.darkSand,
                            fontSize: 15, fontWeight: 700
                        }}>support@civilengineer.io</a>
                        <p style={{
                            ...regular, color: COLORS.muted, fontSize: 13,
                            lineHeight: 1.6, margin: '12px 0 0'
                        }}>Phone consultations available upon request.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
