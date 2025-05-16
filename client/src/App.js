import React, { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import BloodTestResults from './components/BloodTestResults'

function App() {
  const [message, setMessage] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [manualData, setManualData] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  // Fetch tests from backend
  useEffect(() => {
    if (!token) return; // Skip fetch if no token

    const fetchTestResults = async () => {
      setIsLoading(true); // Set loading state
      try {
        const response = await fetch('/api/tests', {
          headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer prefix
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();

        if (Array.isArray(data)) {
          setTestResults(data);
          setMessage('Test results loaded successfully');
        } else {
          setMessage(data.message || 'No test results found');
          setTestResults([]);
        }
      } catch (error) {
        setMessage(error.message || 'Failed to fetch test results');
        setTestResults([]);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
    
    fetchTestResults(); // Run when token changes (e.g., after login or logout)
  }, [token]);

  const handleResponse = (data) => {
    setMessage(data.message)
    if (data.token) {
      setToken(data.token)
      localStorage.setItem('token', data.token);
    }
  }

  const handleError = (err) => {
    setMessage(err.message || 'An error occurred');
  }

  const logout = () => {
    if (token) {
      setToken('')
      localStorage.removeItem('token')
      setTestResults([])
      setMessage('Bye!')
    } else {
      setMessage('Log in before logging out')
    }
  }

  return (
    <div className='App'>
      <AuthForm onResponse={handleResponse} onError={handleError} token={token} />
      <button onClick={logout} disabled={!token}>
        Logout
      </button>
      <div id='message'>{message}</div>
      {isLoading && <div>Loading test results...</div>}
      {token && !isLoading && (
        <>
          <BloodTestResults results={testResults} />
        </>
      )}
    </div>
  );
}

export default App;
