import React, { useState } from 'react'
import AuthForm from './components/AuthForm'
import BloodTestResults from './components/BloodTestResults'

function App() {
  const [message, setMessage] = useState('')
  const [testResults, setTestResults] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '')

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
      setResults([])
      setMessage('Bye!')
    } else {
      setMessage('Log in before logging out')
    }
  }

  const getResults = () => {
    fetch('/api/tests/:userId', {
      headers: token ? { 'Authorization': token } : {}
    })
      .then(res => res.json())
      .then(results => {
        if (Array.isArray(results)) {
          setResults(results)
        } else {
          setMessage(results.message)
          setResults([])
        }
      })
      .catch(handleError)
  }

  return (
    <div className='App'>
      <AuthForm onResponse={handleResponse} onError={handleError} token={token} />
      <button onClick={logout} disabled={!token}>Logout</button>
      <div id='message'>{message}</div>
      {token && (
        <>
          <BloodTestResults results={results} />
        </>
      )}
    </div>
  );
}

export default App;
