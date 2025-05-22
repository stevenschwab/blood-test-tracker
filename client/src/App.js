import { useState } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './components/HomePage/HomePage';
import AuthForm from './components/AuthForm/AuthForm';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

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
          path="login"
          element={<AuthForm 
            isRegister={false}
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          path="register"
          element={<AuthForm
            isRegister={true}
            token={token}
            setToken={setToken}
          />}
        />
        <Route
          path="dashboard"
          element={<Dashboard
            token={token}
            setToken={setToken}
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
