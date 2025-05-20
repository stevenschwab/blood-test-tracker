// The form for registration and login.
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ onResponse, onError, token, isRegister = false }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
            return;
        }
    }, [token])

    const handleSubmit = (action) => (e) => {
        e.preventDefault()
        if (!username || !password || (isRegister && !email)) {
            setError('Please fill in all fields');
            return;
        }
        if (isRegister && !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }
        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        if (password.length < 4) {
            setError('Password must be at least 6 characters');
            return;
        }
        setError('');
        
        const credentials = {
            username,
            password,
            ...(isRegister && { email })
        }

        // Authentication logic
        fetch(`/api/auth/${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(data => {
                onResponse(data);
                if (data.token) {
                    setUsername('');
                    setPassword('');
                    if (isRegister) setEmail('');
                    navigate('/dashboard');
                }
            })
            .catch(onError)
    }

    return (
        <div className="authFormContainer">
            <h2 className="authFormHeader">
                {isRegister ? 'Register for Biomarker Access' : 'Login to View Biomarkers'}
            </h2>
            <form>
                <div className="labelInputColumn">
                    <label htmlFor="username" className="inputLabel">
                        Username
                    </label>
                    <input
                        type='type'
                        id='username'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="inputField"
                    />
                </div>
                {isRegister && (
                    <div className="labelInputColumn">
                        <label htmlFor="email" className="inputLabel">
                            Email
                        </label>
                        <input
                            type='type'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
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
                    />
                </div>
                {error && (
                    <p className="errorPara">{error}</p>
                )}
                <button
                    onClick={isRegister ? handleSubmit('register') : handleSubmit('login')}
                    disabled={!!token}
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
        </div>
    )
}

export default AuthForm;