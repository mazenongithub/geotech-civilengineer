import React, { Component } from "react";
import { geotechLogo, hamburgerIcon } from "./svg";
import { MyStylesheet } from "./styles";
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
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
                <header className="app-header">
                    {/* Top Bar */}
                    <div className="top-bar">
                        {/* Right-aligned controls */}
                        <div className="top-controls">
                            <nav className="top-nav">
                                <a href="#logout">Logout</a>
                                <a href="#profile">Profile</a>
                                <a href="#clients">Clients</a>
                                <a href="#projects">Projects</a>
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
                        <a href="#projects" onClick={this.closeMenu}>Projects</a>
                        <a href="#clients" onClick={this.closeMenu}>Clients</a>
                        <a href="#profile" onClick={this.closeMenu}>Profile</a>
                        <a href="#logout" onClick={this.closeMenu}>Logout</a>
                    </nav>
                </aside>
            </>
        );
    }
}

export default Header;
