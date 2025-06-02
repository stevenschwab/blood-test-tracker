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
    const [message, setMessage] = useState('');
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
                    setMessage('Test results loaded successfully');
                } else {
                    setMessage(res.message || 'No test results found');
                    setTestResults([]);
                }
            })
            .catch(err => {
                setMessage(err.response?.data.message || 'Failed to fetch test results');
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
        setMessage(err.message || 'An error occurred');
    };

    // Handle logout
    const logout = () => {
        if (token) {
          setToken('');
          setUser(null);
          setBiomarkers({});
          localStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('biomarkers');
          setTestResults([]);
          setMessage('Logged out successfully');
          navigate('/login');
        }
    };

    if (loading) {
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
                                    onClick={logout}
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
                {message && (
                    <div className={`mainContentSuccessMessagePrefix ${message.includes('successfully') ? 'mainContentSuccess' : 'mainContentError'}`}>
                        {message}
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
                    ) : testResults.length > 0 && Object.keys(biomarkers).length > 0 ? (
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