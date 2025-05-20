import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from './InputForm';
import BloodTestResults from './BloodTestResults';
import Footer from './Footer';
import './Dashboard.css';

const initialManualData = {
    completeBloodCount: {},
    automatedDifferential: {},
    generalChemistry: {},
    hepaticFunctionPanel: {},
    lipidPanel: {},
    ironAndTIBC: {},
    thyroidTesting: {},
    tumorMarkers: {},
    endocrineEvaluation: {},
}

function Dashboard({ token, handleToken, handleMessage, message, handleError, biomarkers }) {
    const navigate = useNavigate();
    const [testResults, setTestResults] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [manualData, setManualData] = useState(initialManualData);
    const [testDate, setTestDate] = useState('');

    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch test results
        const fetchTestResults = async () => {
            setIsLoading(true);
            try {
              const response = await fetch('/api/tests', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
        
              const data = await response.json();
      
              if (Array.isArray(data)) {
                setTestResults(data);
                handleMessage('Test results loaded successfully');
              } else {
                handleMessage(data.message || 'No test results found');
                setTestResults([]);
              }
            } catch (error) {
              handleMessage(error.message || 'Failed to fetch test results');
              setTestResults([]);
            } finally {
              setIsLoading(false);
            }
        };

        fetchTestResults();
    }, [token, navigate]);

    // Handle input change for biomarkers
    const handleInputChange = (section, key, value) => {
        setManualData({
            ...manualData,
            [section]: {
                ...manualData[section],
                [key]: value,
            }
        });
    };

    // Submit data to backend
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(manualData).length === 0) {
          alert("Please enter or upload some data.");
          return;
        }
    
        fetch('/api/tests', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...manualData, testDate }),
        })
          .then(res => res.json())
          .then(data => {
            setTestResults([...testResults, data]);
            setManualData(initialManualData);
            setTestDate('');
            setShowForm(false);
            handleMessage('Test data saved successfully');
          })
          .catch(handleError)
    };

    // Handle logout
    const logout = () => {
        if (token) {
          handleToken('');
          localStorage.removeItem('token');
          setTestResults([]);
          handleMessage('Logged out successfully');
          navigate('/login');
        } else {
          handleMessage('Log in before logging out');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <h1 className="text-2xl font-bold text-blue-600">NexuHealth</h1>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {token && (
                                <button
                                    onClick={logout}
                                    className="text-blue-600 hover:underline"
                                >
                                    Log out
                                </button>
                            )}
                        </div>
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

            {/* Main Content (Article Section) */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your NexuHealth Dashboard</h2>
                {message && (
                    <div className={`mb-4 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                {/* New Blood Test Form */}
                <InputForm
                    handleShowForm={setShowForm}
                    handleInputChange={handleInputChange}
                    showForm={showForm}
                    handleSubmit={handleSubmit}
                    testDate={testDate}
                    handleTestDate={setTestDate}
                    handleManualData={setManualData}
                    biomarkers={biomarkers}
                />

                {/* Historic Test results */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Test History</h3>
                    {isLoading ? (
                        <div className="text-center text-gray-600">Loading test results...</div>
                    ) : testResults.length > 0 ? (
                        <BloodTestResults results={testResults} biomarkers={biomarkers} />
                    ) : (
                        <div className="text-center text-gray-600">No test results found. Add a new test above.</div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Dashboard;