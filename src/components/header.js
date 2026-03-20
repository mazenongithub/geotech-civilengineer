import React, { Component } from "react";
import { geotechLogo, hamburgerIcon } from "./svg";
import { MyStylesheet } from "./styles";
import { Link } from 'react-router-dom';
import Geotech from "./geotech";
import * as actions from './actions';
import { connect } from 'react-redux';
import { LogoutUser } from "./actions/api";
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileMenuOpen: false, width: 0, height: 0
        };

        this.toggleMenu = () => {
            this.setState((prev) => ({ mobileMenuOpen: !prev.mobileMenuOpen }));
        };



        this.closeMenu = () => {
            this.setState({ mobileMenuOpen: false });
        };

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
        const MOBILE_BREAKPOINT = '768'
        this.setState({ width: window.innerWidth, height: window.innerHeight });

        if (window.innerWidth >= MOBILE_BREAKPOINT && this.state.mobileMenuOpen) {
            this.setState({ mobileMenuOpen: false });
        }
    }

    getProfileLink() {
        const geotech = new Geotech();
        const myuser = geotech.getUser.call(this)
        if (myuser) {
            return (<Link onClick={() => { this.closeMenu() }} to={`/profile/${myuser.clientid}`}>
                Profile
            </Link>)

        }
    }

    getMyProjectsLink() {
        const geotech = new Geotech();
        const myuser = geotech.getUser.call(this)
        if (myuser) {
            return (<Link onClick={() => { this.closeMenu() }} to={`/projects/${myuser.clientid}`}>
                Projects
            </Link>)

        }
    }

    async logoutUser(clientid) {
        try {
            const response = await LogoutUser(clientid);

            if (response?.message) {
                this.props.reduxUser(null);
            }

        } catch (err) {
            alert(`Could not logout user: ${err.message}`);
        }
    }

    getLoginLink() {
        const geotech = new Geotech();

        const myuser = geotech.getUser.call(this)

        return myuser ? (
            <a onClick={() => { this.logoutUser(myuser.clientid) }}>Logout</a>
        ) : (
            <Link onClick={() => { this.closeMenu() }} to="/login">
                Login
            </Link>
        );
    }

    render() {
        const { mobileMenuOpen } = this.state;
        const logoWidth = () => {

            if (this.state.width > 768) {
                return ({ width: '33%' })
            } else {
                return ({ width: '50%' })
            }

        }
        const styles = MyStylesheet();
        const hamburgerWidth = { width: '50px' }

        return (
            <>
                <header className="app-header" style={{ ...styles.bottomMargin15 }}>
                    {/* Top Bar */}
                    <div className="top-bar">
                        {/* Right-aligned controls */}
                        <div className="top-controls">
                            <nav className="top-nav">
                                {this.getLoginLink()}
                                {this.getMyProjectsLink()}
                                {this.getProfileLink()}
                                <Link onClick={() => { this.closeMenu() }} to="/contact">Contact</Link>
                                <Link onClick={() => { this.closeMenu() }} to="/features">Features</Link>
                                <Link onClick={() => { this.closeMenu() }} to="/">Home</Link>

                            </nav>

                            {/* Hamburger on FAR RIGHT */}
                            <button style={{ ...hamburgerWidth }}
                                className="hamburger"
                                onClick={this.toggleMenu}

                            >
                                {hamburgerIcon()}
                            </button>
                        </div>
                    </div>

                    {/* Title Logo */}

                    <div style={{ ...logoWidth(), ...styles.marginAuto }}>
                        {geotechLogo()}
                    </div>

                </header>

                {/* Overlay */}
                <div
                    className={`overlay ${mobileMenuOpen ? "show" : ""}`}
                    onClick={this.closeMenu}
                />

                {/* Right-to-left sliding drawer */}
                <aside className={`side-drawer ${mobileMenuOpen ? "open" : ""}`}>
                    <nav>
                        <Link onClick={() => { this.closeMenu() }} to="/">Home</Link>
                        <Link onClick={() => { this.closeMenu() }} to="/features">Features</Link>
                        <Link onClick={() => { this.closeMenu() }} to="/contact">Contact</Link>
                        {this.getMyProjectsLink()}
                        {this.getProfileLink()}
                        {this.getLoginLink()}
                    </nav>
                </aside>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects,
    }
}

export default connect(mapStateToProps, actions)(Header);
