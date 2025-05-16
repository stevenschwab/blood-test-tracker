// The form for registration and login.
import React, { useState } from 'react'

function AuthForm({ onResponse, onError, token, isRegister = false }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
        if (password.length < 6) {
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
                onResponse(data)
                if (data.token) {
                    setUsername('')
                    setPassword('')
                    if (isRegister) setEmail('')
                }
            })
            .catch(onError)
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {isRegister ? 'Register for Biomarker Access' : 'Login to View Biomarkers'}
            </h2>
            <form>
                <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type='type'
                    id='username'
                    placeholder='Enter your username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                {isRegister && (
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type='type'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <button
                    onClick={isRegister ? handleSubmit('register') : handleSubmit('login')}
                    disabled={!!token}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isRegister ? 'Register' : 'Sign In'}
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                <a
                    href={isRegister ? '/login' : '/register'}
                    className="text-blue-600 hover:underline"
                >
                    {isRegister ? 'Sign in' : 'Sign up'}
                </a>
            </p>
        </div>
    )
}

export default AuthForm;