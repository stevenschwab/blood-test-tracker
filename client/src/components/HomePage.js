import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

function HomePage() {
    const navigate = useNavigate();

    const handleCTAClick = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                        <Link to="/">
                            <h1 className="text-2xl font-bold text-blue-600">NexuHealth</h1>
                        </Link>
                        </div>
                        {/* Navigation Links */}
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-blue-600">
                                Home
                            </Link>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600">
                                About
                            </Link>
                        </nav>
                        {/* CTAs */}
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Sign In
                            </Link>
                            <button
                                onClick={handleCTAClick}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Get Started
                            </button>
                        </div>
                        {/* Mobile Menu Button (Hamburger) */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-blue-600 focus:outline-none"
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
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gray-50 py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Track Your Health with Confidence
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                NexuHealth empowers you to monitor and understand your blood test biomarkers across historic lab tests, giving you clear insights into your health journey.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={handleCTAClick}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700"
                                    >
                                    Start Tracking Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-12">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Why Monitor Your Biomarkers?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Understanding your blood test results is key to taking control of your health. NexuHealth simplifies this process by providing a user-friendly platform to view and analyze your biomarkers, such as cholesterol, glucose, and more. Our intuitive dashboard helps you spot trends, set health goals, and share insights with your healthcare provider.
                        </p>
                        <p className="text-gray-600 mb-4">
                            With NexuHealth, you get:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            <li>Secure storage of your blood test results</li>
                            <li>Easy-to-read charts and trends</li>
                            <li>Personalized health insights based on your data</li>
                        </ul>
                        <p className="text-gray-600">
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