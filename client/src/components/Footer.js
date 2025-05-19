import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About NexuHealth</h4>
                        <p className="text-gray-400">
                            NexuHealth is your trusted partner in health, offering a secure platform to track and understand your blood test biomarkers.
                        </p>
                    </div>
                    {/* Navigation */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                            <Link to="/" className="text-gray-400 hover:text-white">
                                Home
                            </Link>
                            </li>
                            <li>
                            <Link to="/dashboard" className="text-gray-400 hover:text-white">
                                Dashboard
                            </Link>
                            </li>
                            <li>
                            <Link to="/about" className="text-gray-400 hover:text-white">
                                About
                            </Link>
                            </li>
                            <li>
                            <Link to="/login" className="text-gray-400 hover:text-white">
                                Sign In
                            </Link>
                            </li>
                            <li>
                            <Link to="/register" className="text-gray-400 hover:text-white">
                                Sign Up
                            </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-400">Email: steven.schwab1@gmail.com</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400">
                    &copy; 2025 NexuHealth. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;