// src/Register.js
import React, { useState } from 'react';

function Register({ onRegisterSuccess, onSwitchToLogin, onShowNotification }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
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
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // No alert - automatically shows success notification and switches to login
                onRegisterSuccess();
                setUsername('');
                setPassword('');
            } else {
                if (response.status === 400) {
                    onShowNotification('Username already exists. Please choose a different one.', 'error');
                } else {
                    onShowNotification('Registration failed. Please try again.', 'error');
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
                <label htmlFor="reg-username">Username</label>
                <input 
                    id="reg-username"
                    type="text" 
                    value={username} 
                    onChange={(e) => {
                        setUsername(e.target.value);
                        clearErrors();
                    }}
                    placeholder="Choose a username (min. 3 characters)"
                    required
                    className={errors.username ? 'error' : ''}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input 
                    id="reg-password"
                    type="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors();
                    }}
                    placeholder="Choose a password (min. 3 characters)"
                    required
                    className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className="loading-spinner"></span>
                        Registering...
                    </>
                ) : (
                    'Register'
                )}
            </button>
            
            <div className="auth-switch">
                <p>Already have an account? 
                    <span className="switch-link" onClick={onSwitchToLogin}>
                        Login here
                    </span>
                </p>
            </div>
        </form>
    );
}

export default Register;