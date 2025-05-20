import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
    return (
        <footer className="footerContainer">
            <div className="footerInsideContainer">
                <div className="footerRow">
                    {/* About */}
                    <div>
                        <h4 className="footerHeader">About NexuHealth</h4>
                        <p className="footerPara">
                            NexuHealth is your trusted partner in health, offering a secure platform to track and understand your blood test biomarkers.
                        </p>
                    </div>
                    {/* Navigation */}
                    <div>
                        <h4 className="footerHeader">Quick Links</h4>
                        <ul className="navUl">
                            <li>
                                <Link to="/" className="navLink">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="navLink">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="navLink">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="navLink">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="footerHeader">Contact Us</h4>
                        <p className="footerPara">Email: steven.schwab1@gmail.com</p>
                    </div>
                </div>
                <div className="copyrightContainer">
                    <p className="footerPara">
                        &copy; 2025 NexuHealth. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;