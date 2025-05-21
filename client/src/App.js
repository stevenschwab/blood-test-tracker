import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import biomarkers from './constants/biomarkers';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

  const handleResponse = (data) => {
    setMessage(data.message)
    if (data.token) {
      setToken(data.token)
      localStorage.setItem('token', data.token);
    }
  };

  // Handle an error
  const handleError = (err) => {
    setMessage(err.message || 'An error occurred');
  };

  return (
    <div className='appContainer'>
      <Routes>
        <Route
          path="/"
          element={<HomePage
            token={token}
          />} 
        />
        <Route 
          path="/login"
          element={<AuthForm 
            isRegister={false}
            token={token}
            handleToken={setToken}
            onResponse={handleResponse}
          />}
        />
        <Route
          path="/register"
          element={<AuthForm
            isRegister={true}
            token={token}
            handleToken={setToken}
            onResponse={handleResponse}
          />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard
            token={token}
            handleMessage={setMessage}
            message={message}
            handleError={handleError}
            handleToken={setToken}
            biomarkers={biomarkers}
          />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
