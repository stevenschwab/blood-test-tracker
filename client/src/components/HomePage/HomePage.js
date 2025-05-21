import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './HomePage.css';

function HomePage({ token }) {
    const navigate = useNavigate();

    const handleCTAClick = () => {
        navigate('/register');
    };

    return (
        <div className="homePage-container">
            {/* Navigation Header */}
            <header className="headerContainer">
                <div className="headerSubContainer">
                    <div className="headerRow">
                        {/* Logo */}
                        <div className="logoContainer">
                            <Link to="/">
                                <h1 className="logoH1">NexuHealth</h1>
                            </Link>
                        </div>
                        {/* Navigation Links */}
                        <nav className="navigationContainer">
                            <Link to="/" className="navLink">
                                Home
                            </Link>
                            <Link to="/dashboard" className="navLink">
                                Dashboard
                            </Link>
                        </nav>
                        {/* CTAs */}
                        <div className="ctaContainer">
                            {!token && (
                                <Link
                                    to="/login"
                                    className="signInLink"
                                >
                                    Sign In
                                </Link>
                            )}
                            {!token && (
                                <button
                                    onClick={handleCTAClick}
                                    className="getStartedLink"
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                        {/* Mobile Menu Button (Hamburger) */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="mobileMenuButton"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Section */}
            <main className="mainContainer">
                {/* Hero Section */}
                <section className="heroSectionContainer">
                    <div className="heroBlock">
                        <div className="heroColumn">
                            <h2 className="heroHeader">
                                Track Your Health with Confidence
                            </h2>
                            <p className="heroPara">
                                NexuHealth empowers you to monitor and understand your blood test biomarkers across historic lab tests, giving you clear insights into your health journey.
                            </p>
                            <div className="heroButtonContainer">
                                <button
                                    onClick={handleCTAClick}
                                    className="heroButton"
                                    >
                                    Start Tracking Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="articleContentContainer">
                    <div className="articleContentColumn">
                        <h3 className="articleContentHeader">
                            Why Monitor Your Biomarkers?
                        </h3>
                        <p className="articleContentPara">
                            Understanding your blood test results is key to taking control of your health. NexuHealth simplifies this process by providing a user-friendly platform to view and analyze your biomarkers, such as cholesterol, glucose, and more. Our intuitive dashboard helps you spot trends, set health goals, and share insights with your healthcare provider.
                        </p>
                        <p className="articleContentPara">
                            With NexuHealth, you get:
                        </p>
                        <ul className="articleContentUL">
                            <li>Secure storage of your blood test results</li>
                            <li>Easy-to-read charts and trends</li>
                            <li>Personalized health insights based on your data</li>
                        </ul>
                        <p className="articleContentPara">
                            Stay informed and be proactive about your health. Sign up today to start your journey toward better health management.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomePage;