import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                    <div className="container">
                        <div style={{ height: 50, paddingTop: 10, float: 'left' }}>
                            <img style={{ width: 200, display: 'block', margin: 'auto' }} src={logo} alt="spacexlogo" />
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul style={{ right: 0, position: 'absolute' }} className="navbar-nav">
                                <li className="nav-item active">
                                    <Link style={{ color: 'white' }} to="/"> Launches </Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{ color: 'white' }} to="/"> Rockets </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
