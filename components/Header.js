import React, {useState} from 'react';
import {useRouter} from "next/router";
import cookie from "js-cookie";

// Header
const Header = props => {
    const router = useRouter();

    return (
        <header className="header">
            <div className="bg-header">
                <nav className="navbar navbar-expand navbar-dark">
                    <a className="navbar-brand" href="#"><img src="../img/common/logo.png" alt="MyUI"/></a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Documentation</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
