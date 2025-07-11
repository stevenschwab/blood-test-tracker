import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import './AuthForm.css';

function AuthForm({ token, setToken, isRegister }) {
    const { setUser, setBiomarkers } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(!!token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
            return;
        }
    }, [token, navigate]);

    const onError = (err) => {
        setMessage(err.message || 'An error occurred');
    };

    const onResponse = async (data) => {
        setMessage(data.message)
        if (data.token) {
          setToken(data.token)
          localStorage.setItem('token', data.token);
          const userResponse = await axios.get('/api/users/user', {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          setUser(userResponse.data);
          sessionStorage.setItem('user', JSON.stringify(userResponse.data))
          sessionStorage.setItem('token', data.token)
          const biomarkerResponse = await axios.get('/api/biomarkers', {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          const biomarkerData = biomarkerResponse.data;
          setBiomarkers(biomarkerData);
          sessionStorage.setItem('biomarkers', JSON.stringify(biomarkerData))
          setUsername('');
          setPassword('');
          if (isRegister) setEmail('');
          navigate('/dashboard');
        }
    };

    const authenticateUser = (action, credentials) => {
        setDisabled(true);
        setIsLoading(true);
        axios.post(`/api/auth/${action}`, credentials)
            .then(res => {
                onResponse(res.data);
            })
            .catch(onError)
            .finally(() => {
                setIsLoading(false);
                setDisabled(false);
            })
    }

    const handleSubmit = (action) => (e) => {
        e.preventDefault()
        if (!username || !password || (isRegister && !email)) {
            setMessage('Please fill in all fields');
            return;
        }
        if (isRegister && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Please enter a valid email');
            return;
        }
        if (username.length < 3) {
            setMessage('Username must be at least 3 characters');
            return;
        }
        if (password.length < 4) {
            setMessage('Password must be at least 4 characters');
            return;
        }
        setMessage('');
        
        const credentials = {
            username,
            password,
            ...(isRegister && { email })
        }

        authenticateUser(action, credentials);
    };

    return (
        <div className="authFormContainer">
            <h2 className="authFormHeader" data-testid="authFormHeader">
                {isRegister ? 'Register for Biomarker Access' : 'Login to View Biomarkers'}
            </h2>
            <form>
                <div className="labelInputColumn">
                    <label htmlFor="username" className="inputLabel">
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="inputField"
                        required
                        autoComplete="username"
                    />
                </div>
                {isRegister && (
                    <div className="labelInputColumn">
                        <label htmlFor="email" className="inputLabel">
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
                            required
                            autoComplete="email"
                        />
                    </div>
                )}
                <div className="labelInputColumn">
                    <label htmlFor="password" className="inputLabel">
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputField"
                        required
                        autocomplete="current-password"
                    />
                </div>
                {message && (
                    <p className="errorPara">{message}</p>
                )}
                <button
                    onClick={isRegister ? handleSubmit('register') : handleSubmit('login')}
                    disabled={disabled}
                    className="actionButton"
                >
                    {isRegister ? 'Register' : 'Sign In'}
                </button>
            </form>
            <p className="paraRow">
                {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                <Link
                    to={isRegister ? '/login' : '/register'}
                    className="paraLink"
                >
                    {isRegister ? 'Sign in' : 'Sign up'}
                </Link>
            </p>
            {isLoading && (
                <div className="authLoadingMessage">{isRegister ? 'Registering' : 'Logging in'}...</div>
            )}
        </div>
    )
}

export default AuthForm;