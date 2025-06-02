import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import InputForm from '../InputForm/InputForm';
import BloodTestResults from '../BloodTestResults/BloodTestResults';
import Footer from '../Footer/Footer';
import './Dashboard.css';

function Dashboard({ token, setToken }) {
    const { user, setUser, setBiomarkers, biomarkers, loading } = useContext(AuthContext);
    const [testResults, setTestResults] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isClosing, setIsClosing] = useState(false);
    const navigate = useNavigate();

    function getTestResults() {
        setIsLoading(true);
        axios.get('/api/tests', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const results = res.data;
                if (Array.isArray(results)) {
                    setTestResults(results);
                    setMessage({ text: 'Test results loaded successfully', type: 'success' });
                } else {
                    setMessage({ text: res.message || 'No test results found', type: 'error' });
                    setTestResults([]);
                }
            })
            .catch(err => {
                setMessage({ text: err.response?.data.message || 'Failed to fetch test results', type: 'error' });
                setTestResults([]);
            })
            .finally(() => setIsLoading(false));
    };

    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        getTestResults();
    }, [token, navigate]);

    const onError = (err) => {
        setMessage({ text: err.message || 'An error occurred', type: 'error' });
    };

    // Handle logout
    const handleLogout = () => {
        if (token) {
          setToken('');
          setUser(null);
          setBiomarkers({});
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('biomarkers');
          setTestResults([]);
          setMessage({ text: 'Logged out successfully', type: 'success' });
          navigate('/login');
        }
    };

    const handleCloseMessage = () => {
        setIsClosing(true);
        setTimeout(() => {
            setMessage({ text: '', type: '' });
            setIsClosing(false);
        }, 300);
    }

    if (loading || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboardContainer">
            {/* Navigation Header */}
            <header className="navHeader">
                <div className="navHeaderContainer">
                    <div className="navHeaderRow">
                        <div className="navLogoContainer">
                            <Link to="/">
                                <h1 className="navLogoHeader">NexuHealth</h1>
                            </Link>
                        </div>
                        <div className="logoutButtonContainer">
                            {token && (
                                <button
                                    onClick={handleLogout}
                                    className="logoutButton"
                                >
                                    Log out
                                </button>
                            )}
                        </div>
                        <div className="menuToggleContainer">
                            <button
                                type="button"
                                className="menuToggleButton"
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

            {/* Main Content (Article Section) */}
            <main className="mainContentContainer">
                <h1>Welcome, {user ? `${user.first_name} ${user.last_name}` : 'User'} </h1>
                <h2 className="mainContentHeader">Your NexuHealth Dashboard</h2>
                {message.text && (
                    <div className={`mainContentMessagePrefix ${isClosing ? 'opacity-0' : 'opacity-100'} ${message.type === 'success' ? 'mainContentSuccessMessage' : 'mainContentErrorMessage'}`} role="alert">
                        <span>{message.text}</span>
                        <button className="messageCloseButton" onClick={handleCloseMessage} aria-label="Close message">
                            x
                        </button>
                    </div>
                )}

                {/* New Blood Test Form */}
                <InputForm
                    handleShowForm={setShowForm}
                    showForm={showForm}
                    token={token}
                    testResults={testResults}
                    setTestResults={setTestResults}
                    handleMessage={setMessage}
                    handleError={onError}
                    biomarkers={biomarkers}
                />

                {/* Historic Test results */}
                <section className="historyContainer">
                    <h3 className="historyContainerHeader">Your Test History</h3>
                    {isLoading ? (
                        <div className="historyMessage">Loading test results...</div>
                    ) : testResults.length > 0 && biomarkers ? (
                        <BloodTestResults results={testResults} biomarkers={biomarkers} />
                    ) : (
                        <div className="historyMessage">No test results found. Add a new test above.</div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Dashboard;