import React, { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import BloodTestResults from './components/BloodTestResults'

function App() {
  const [message, setMessage] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [manualData, setManualData] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Fetch tests from backend
  useEffect(() => {
    fetch('/api/tests/:userId', {
      headers: token ? { 'Authorization': token } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestResults(data)
        } else {
          setMessage(data.message)
          setTestResults([])
        }
      })
      .catch(handleError)
  })

  const handleResponse = (data) => {
    setMessage(data.message)
    if (data.token) {
      setToken(data.token)
      localStorage.setItem('token', data.token)
    }
  }

  const handleError = (err) => {
    setMessage(err.message)
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
      <button onClick={logout} disabled={!token}>Logout</button>
      <div id='message'>{message}</div>
      {token && (
        <>
          <BloodTestResults results={testResults} />
        </>
      )}
    </div>
  );
}

export default App;
