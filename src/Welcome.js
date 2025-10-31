// src/Welcome.js
import React from 'react';

function Welcome({ username, onLogout }) {
    return (
        <div className="welcome-container">
            <div className="welcome-header">
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
            
            <div className="welcome-content">
                <div className="welcome-card">
                    <div className="welcome-icon">🎉</div>
                    <h1>Welcome to Event Planner, {username}!</h1>
                    <p className="welcome-subtitle">
                        Your ultimate solution for managing events and gatherings
                    </p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Create Events</h3>
                            <p>Plan and organize your events with ease</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3>Manage Guests</h3>
                            <p>Keep track of your invitees and attendees</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Budget Tracking</h3>
                            <p>Monitor expenses and stay within budget</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🔔</div>
                            <h3>Get Reminders</h3>
                            <p>Never miss important event details</p>
                        </div>
                    </div>
                    
                    <div className="welcome-actions">
                        <button className="primary-button">
                            Create Your First Event
                        </button>
                        <button className="secondary-button">
                            Explore Templates
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;