// src/Login.js
import React, { useState } from 'react';

function Login({ onLoginSuccess, onSwitchToRegister, onShowNotification }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 3) {
            newErrors.password = 'Password must be at least 3 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // No alert - automatically redirects through onLoginSuccess
                onLoginSuccess(username);
            } else {
                const errorText = await response.text();
                if (response.status === 401) {
                    onShowNotification('Invalid username or password. Please try again.', 'error');
                } else {
                    onShowNotification('Login failed. Please try again later.', 'error');
                }
            }
        } catch (error) {
            onShowNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    type="text" 
                    value={username} 
                    onChange={(e) => {
                        setUsername(e.target.value);
                        clearErrors();
                    }}
                    placeholder="Enter your username"
                    required
                    className={errors.username ? 'error' : ''}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors();
                    }}
                    placeholder="Enter your password"
                    required
                    className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="loading-spinner"></span>
                        Logging in...
                    </>
                ) : (
                    'Login'
                )}
            </button>
            
            <div className="auth-switch">
                <p>Don't have an account? 
                    <span className="switch-link" onClick={onSwitchToRegister}>
                        Register here
                    </span>
                </p>
            </div>
        </form>
    );
}

export default Login;